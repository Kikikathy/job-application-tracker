// Job Application Tracker - Background Service Worker

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Open welcome page on first install
    chrome.tabs.create({
      url: 'https://job-application-tracker-two-xi.vercel.app/auth'
    });
  }
});

// Listen for messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openTrackerTab') {
    // Open the Job Application Tracker in a new tab
    chrome.tabs.create({ url: request.url }, (tab) => {
      sendResponse({ success: true, tabId: tab.id });
    });
    return true; // Keep the message channel open for async response
  }
  
  if (request.action === 'saveCredentials') {
    // Save Supabase credentials
    chrome.storage.sync.set({
      supabaseUrl: request.supabaseUrl,
      supabaseKey: request.supabaseKey,
      session: request.session
    }, () => {
      sendResponse({ success: true });
    });
    return true; // Keep the message channel open for async response
  }
  
  if (request.action === 'getCredentials') {
    // Get stored credentials
    chrome.storage.sync.get(['supabaseUrl', 'supabaseKey', 'session'], (result) => {
      sendResponse({
        success: true,
        data: result
      });
    });
    return true;
  }
});

// Context menu for quick save
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'save-job-application',
    title: 'Save as Job Application',
    contexts: ['page', 'selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'save-job-application') {
    // Send message to content script to extract job data
    chrome.tabs.sendMessage(tab.id, { action: 'getJobData' }, (response) => {
      if (response && response.success) {
        // Store the data and open popup
        chrome.storage.local.set({
          pendingApplication: {
            ...response.data,
            timestamp: Date.now()
          }
        });
        chrome.action.openPopup();
      }
    });
  }
});

// Badge to show when on a job page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const url = tab.url.toLowerCase();
    const isJobPage = url.includes('/job') || 
                      url.includes('/career') || 
                      url.includes('/apply') ||
                      url.includes('/position') ||
                      url.includes('/opening') ||
                      url.includes('linkedin.com/jobs') ||
                      url.includes('indeed.com') ||
                      url.includes('glassdoor.com');
    
    if (isJobPage) {
      chrome.action.setBadgeText({ text: '!', tabId: tabId });
      chrome.action.setBadgeBackgroundColor({ color: '#667eea', tabId: tabId });
    } else {
      chrome.action.setBadgeText({ text: '', tabId: tabId });
    }
  }
});

// Clean up old pending applications (older than 24 hours)
chrome.alarms.create('cleanup', { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'cleanup') {
    chrome.storage.local.get(['pendingApplication'], (result) => {
      if (result.pendingApplication) {
        const age = Date.now() - result.pendingApplication.timestamp;
        const oneDayInMs = 24 * 60 * 60 * 1000;
        
        if (age > oneDayInMs) {
          chrome.storage.local.remove('pendingApplication');
        }
      }
    });
  }
});

// Made with Bob
