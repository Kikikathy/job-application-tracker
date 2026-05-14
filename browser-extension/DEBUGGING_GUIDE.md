# Job Tracker Extension - Debugging Guide

## How to Debug the Extension

### Step 1: Load the Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `browser-extension` folder
5. Note the extension ID

### Step 2: Check Console Logs

#### Content Script Logs (Job Pages)
1. Visit a job posting page (e.g., LinkedIn job, Indeed job)
2. Right-click on the page → "Inspect" → "Console" tab
3. Look for messages starting with `🎯 Job Tracker:`

**Expected logs:**
```
🎯 Job Tracker Extension: Content script loaded
🎯 Job Tracker: Initializing detector
🎯 Job Tracker: Initial job data: {company_name: "", position_title: "", ...}
🎯 Job Tracker: Init called, readyState: complete
🎯 Job Tracker: Document already loaded, detecting immediately
🎯 Job Tracker: detectJobApplication called
🎯 Job Tracker: Current URL: https://...
🎯 Job Tracker: Is job page? true
🎯 Job Tracker: Extracting job data...
🎯 Job Tracker: Company name: [extracted name]
🎯 Job Tracker: Position title: [extracted title]
🎯 Job Tracker: showDetectionBadge called
🎯 Job Tracker: Badge added to page
```

#### Background Script Logs
1. Go to `chrome://extensions/`
2. Find "Job Application Tracker"
3. Click "service worker" link (or "Inspect views: service worker")
4. Check Console tab

**Expected logs when button is clicked:**
```
🎯 Job Tracker Background: Message received {action: "openTrackerTab", url: "..."}
🎯 Job Tracker Background: Opening tracker tab with URL: https://...
🎯 Job Tracker Background: Tab created [tab-id]
```

#### Dashboard Logs
1. When the tracker web app opens, open DevTools (F12)
2. Check Console tab

**Expected logs:**
```
🎯 Dashboard: Component mounted
🎯 Dashboard: URL search params: ?company=...&position=...
🎯 Dashboard: Source param: extension
🎯 Dashboard: Extension source detected!
🎯 Dashboard: Extension data: {company_name: "...", ...}
🎯 Dashboard: Modal should be opening...
```

### Step 3: Test the Complete Flow

1. **Visit a job page** (LinkedIn, Indeed, etc.)
   - Check console for content script logs
   - Look for the "Job Detected" badge in top-right corner

2. **Click "Track This Job" button**
   - Check console for "Track button clicked!"
   - Check background script console for tab creation
   - New tab should open with the tracker app

3. **Check the tracker app**
   - Modal should auto-open
   - Form should be pre-filled with job data
   - Check console for dashboard logs

### Common Issues & Solutions

#### Issue: Badge doesn't appear
**Possible causes:**
- Content script not loaded
- URL doesn't match patterns in manifest.json
- Page doesn't contain job keywords

**Debug:**
- Check console for "Content script loaded"
- Verify URL contains /job, /career, /apply, etc.
- Check if `isJobPage` is true in logs

#### Issue: Button click doesn't work
**Possible causes:**
- Click handler not attached
- Background script not responding

**Debug:**
- Check for "Track button clicked!" in console
- Check background script console for message
- Verify chrome.runtime.sendMessage is working

#### Issue: Tracker app doesn't open
**Possible causes:**
- Background script error
- Tab creation blocked

**Debug:**
- Check background script console for errors
- Verify URL is being constructed correctly
- Check browser popup blocker settings

#### Issue: Form not pre-filled
**Possible causes:**
- URL parameters not passed correctly
- Dashboard not reading parameters
- React routing issue

**Debug:**
- Check the URL in address bar for parameters
- Check dashboard console logs
- Verify `source=extension` parameter exists

### Manual Testing URLs

Test the dashboard with manual URL parameters:
```
https://job-application-tracker-two-xi.vercel.app/?source=extension&company=TestCorp&position=Software%20Engineer&url=https://example.com&method=LinkedIn&date=2024-01-15
```

### Supported Job Sites

The extension should work on:
- LinkedIn (*.linkedin.com/*)
- Indeed (*.indeed.com/*)
- Glassdoor (*.glassdoor.com/*)
- Monster (*.monster.com/*)
- ZipRecruiter (*.ziprecruiter.com/*)
- Greenhouse (*.greenhouse.io/*)
- Lever (*.lever.co/*)
- Workday (*.workday.com/*)
- Any site with /jobs/, /careers/, or /apply/ in URL

### Quick Test

1. Go to: https://www.linkedin.com/jobs/
2. Click any job posting
3. Badge should appear within 2-3 seconds
4. Click "Track This Job"
5. Tracker should open with pre-filled data

## Need Help?

If issues persist after following this guide:
1. Check all console logs (content, background, dashboard)
2. Verify extension permissions in manifest.json
3. Try reloading the extension
4. Clear browser cache and reload
5. Check if the tracker web app is accessible

## Made with Bob