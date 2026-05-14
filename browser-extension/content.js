// Job Application Tracker - Content Script
// Detects job application forms and extracts relevant information

class JobApplicationDetector {
  constructor() {
    this.jobData = {
      company_name: '',
      position_title: '',
      job_posting_url: window.location.href,
      application_method: this.detectPlatform(),
      application_date: new Date().toISOString().split('T')[0],
      notes: ''
    };
    this.init();
  }

  init() {
    // Wait for page to fully load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.detectJobApplication());
    } else {
      this.detectJobApplication();
    }

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'getJobData') {
        this.extractJobData();
        sendResponse({ success: true, data: this.jobData });
      } else if (request.action === 'saveApplication') {
        this.saveToTracker(request.data);
        sendResponse({ success: true });
      }
      return true;
    });
  }

  detectPlatform() {
    const hostname = window.location.hostname;
    if (hostname.includes('linkedin.com')) return 'LinkedIn';
    if (hostname.includes('indeed.com')) return 'Indeed';
    if (hostname.includes('glassdoor.com')) return 'Glassdoor';
    if (hostname.includes('monster.com')) return 'Monster';
    if (hostname.includes('ziprecruiter.com')) return 'ZipRecruiter';
    if (hostname.includes('greenhouse.io')) return 'Greenhouse';
    if (hostname.includes('lever.co')) return 'Lever';
    if (hostname.includes('workday.com')) return 'Workday';
    if (hostname.includes('smartrecruiters.com')) return 'SmartRecruiters';
    if (hostname.includes('icims.com')) return 'iCIMS';
    return 'Company Website';
  }

  detectJobApplication() {
    // Check if this is a job posting or application page
    const url = window.location.href.toLowerCase();
    const isJobPage = url.includes('/job') || 
                      url.includes('/career') || 
                      url.includes('/apply') ||
                      url.includes('/position') ||
                      url.includes('/opening');

    if (isJobPage) {
      this.extractJobData();
      this.showDetectionBadge();
    }

    // Monitor for form submissions
    this.monitorFormSubmissions();
  }

  extractJobData() {
    // Extract company name
    this.jobData.company_name = this.extractCompanyName();
    
    // Extract position title
    this.jobData.position_title = this.extractPositionTitle();
    
    // Extract additional details
    this.jobData.notes = this.extractJobDescription();
  }

  extractCompanyName() {
    const selectors = [
      // LinkedIn (updated 2024+ selectors)
      '.job-details-jobs-unified-top-card__company-name',
      '.jobs-unified-top-card__company-name',
      '.job-details-jobs-unified-top-card__primary-description a',
      '.jobs-unified-top-card__subtitle-primary-grouping a',
      'a.app-aware-link[href*="/company/"]',
      '.top-card-layout__entity-info-container .app-aware-link',
      '.topcard__org-name-link',
      // Indeed
      '[data-company-name]',
      '.jobsearch-InlineCompanyRating-companyHeader',
      '.icl-u-lg-mr--sm',
      '[data-testid="inlineHeader-companyName"]',
      // Glassdoor
      '.employer-name',
      '[data-test="employer-name"]',
      // Generic
      '[itemprop="hiringOrganization"]',
      '.company-name',
      '.employer',
      'meta[property="og:site_name"]'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.getAttribute('content') || element.textContent;
        if (text && text.trim() && !text.includes('http')) {
          return text.trim();
        }
      }
    }

    // Try to extract from page title
    const title = document.title;
    const match = title.match(/at\s+([^|•\-]+)/i);
    if (match) return match[1].trim();

    return '';
  }

  extractPositionTitle() {
    const selectors = [
      // LinkedIn (updated 2024+ selectors)
      '.job-details-jobs-unified-top-card__job-title',
      '.jobs-unified-top-card__job-title',
      '.job-details-jobs-unified-top-card__job-title h1',
      '.jobs-unified-top-card__job-title h1',
      'h1.t-24.t-bold',
      '.top-card-layout__title',
      '.topcard__title',
      'h1.t-24',
      // Indeed
      '.jobsearch-JobInfoHeader-title',
      'h1[class*="jobTitle"]',
      '[data-testid="jobsearch-JobInfoHeader-title"]',
      'h1.jobsearch-JobInfoHeader-title',
      // Glassdoor
      '[data-test="job-title"]',
      '.job-title',
      // Generic
      '[itemprop="title"]',
      'h1.job-title',
      'h1.position-title',
      'h1',
      'meta[property="og:title"]'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.getAttribute('content') || element.textContent;
        if (text && text.trim() && text.length < 200 && text.length > 3) {
          return text.trim();
        }
      }
    }

    // Try to extract from page title
    const title = document.title;
    const match = title.match(/^([^|•\-]+)/);
    if (match && match[1].trim().length > 3) return match[1].trim();

    return '';
  }

  extractJobDescription() {
    const selectors = [
      // LinkedIn (updated 2024+ selectors)
      '.jobs-description-content__text',
      '.jobs-description__content',
      '.show-more-less-html__markup',
      'article.jobs-description__container',
      // Indeed
      '#jobDescriptionText',
      '.jobsearch-jobDescriptionText',
      // Glassdoor
      '.desc',
      '[class*="description"]',
      // Generic
      '[itemprop="description"]',
      '.job-description',
      '.description'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent.trim();
        if (text && text.length > 50) {
          // Return first 500 characters
          return text.substring(0, 500) + (text.length > 500 ? '...' : '');
        }
      }
    }

    return '';
  }

  showDetectionBadge() {
    // Check if badge already exists
    if (document.getElementById('job-tracker-badge')) return;

    const badge = document.createElement('div');
    badge.id = 'job-tracker-badge';
    badge.className = 'job-tracker-badge';
    badge.innerHTML = `
      <div class="badge-content">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
        <span>Job Detected</span>
        <button id="track-job-btn" class="track-btn">Track This Job</button>
      </div>
    `;
    document.body.appendChild(badge);

    // Add click handler
    document.getElementById('track-job-btn').addEventListener('click', () => {
      this.openTrackerPopup();
    });

    // Auto-hide after 10 seconds
    setTimeout(() => {
      badge.classList.add('fade-out');
      setTimeout(() => badge.remove(), 500);
    }, 10000);
  }

  openTrackerPopup() {
    // Store the job data for the popup to access
    chrome.storage.local.set({
      pendingApplication: {
        ...this.jobData,
        timestamp: Date.now()
      }
    }, () => {
      // Show notification to click extension icon
      this.showClickExtensionNotification();
    });
  }

  showClickExtensionNotification() {
    // Remove any existing notification
    const existing = document.getElementById('job-tracker-click-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.id = 'job-tracker-click-notification';
    notification.className = 'job-tracker-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <div>
          <strong>Job Data Saved!</strong>
          <p>Click the extension icon 🎯 in your toolbar to complete tracking</p>
        </div>
        <button class="close-btn">✕</button>
      </div>
    `;
    document.body.appendChild(notification);

    // Close button handler
    notification.querySelector('.close-btn').addEventListener('click', () => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    });

    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
      }
    }, 10000);
  }

  monitorFormSubmissions() {
    // Monitor all forms on the page
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        // Check if this looks like a job application form
        const formData = new FormData(form);
        const hasResumeField = Array.from(formData.keys()).some(key => 
          key.toLowerCase().includes('resume') || 
          key.toLowerCase().includes('cv') ||
          key.toLowerCase().includes('file')
        );

        if (hasResumeField) {
          // This is likely a job application submission
          this.handleApplicationSubmission();
        }
      });
    });

    // Monitor for file uploads (resume/CV)
    document.addEventListener('change', (e) => {
      if (e.target.type === 'file') {
        const name = e.target.name?.toLowerCase() || '';
        const id = e.target.id?.toLowerCase() || '';
        
        if (name.includes('resume') || name.includes('cv') || 
            id.includes('resume') || id.includes('cv')) {
          // Resume uploaded - likely applying
          this.showApplicationDetectedNotification();
        }
      }
    });
  }

  handleApplicationSubmission() {
    // Show notification that application was detected
    this.showApplicationDetectedNotification();
    
    // Store the application data
    chrome.storage.local.set({
      pendingApplication: {
        ...this.jobData,
        timestamp: Date.now()
      }
    });
  }

  showApplicationDetectedNotification() {
    const notification = document.createElement('div');
    notification.className = 'job-tracker-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <div>
          <strong>Application Detected!</strong>
          <p>Click to save to your tracker</p>
        </div>
        <button id="save-application-btn" class="save-btn">Save</button>
      </div>
    `;
    document.body.appendChild(notification);

    document.getElementById('save-application-btn').addEventListener('click', () => {
      this.openTrackerPopup();
      notification.remove();
    });

    // Auto-hide after 15 seconds
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 500);
    }, 15000);
  }

  saveToTracker(applicationData) {
    // Store in local storage for the popup to access
    chrome.storage.local.set({
      lastApplication: {
        ...applicationData,
        timestamp: Date.now()
      }
    });
  }
}

// Initialize the detector
const detector = new JobApplicationDetector();

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = JobApplicationDetector;
}

// Made with Bob
