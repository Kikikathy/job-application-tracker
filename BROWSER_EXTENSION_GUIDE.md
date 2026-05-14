# Browser Extension Integration Guide

## Overview

The Job Application Tracker browser extension seamlessly integrates with your dashboard to automatically detect and track job applications as you browse job sites. This guide explains how the extension works and how to set it up.

## Architecture

### Components

1. **Content Script** (`content.js`)
   - Runs on job posting pages
   - Detects job applications
   - Extracts company name, position, and details
   - Shows on-page notifications

2. **Background Worker** (`background.js`)
   - Manages extension state
   - Handles communication between components
   - Monitors tab changes
   - Cleans up old data

3. **Popup Interface** (`popup.html` + `popup.js`)
   - User-friendly form for reviewing job details
   - Connects to Supabase API
   - Saves applications to database

4. **Styling** (`content.css`)
   - Beautiful on-page notifications
   - Responsive design
   - Smooth animations

## How It Works

### 1. Job Detection

The extension monitors URLs and page content for job-related patterns:

```javascript
// Detects job pages by URL patterns
const isJobPage = url.includes('/job') || 
                  url.includes('/career') || 
                  url.includes('/apply');
```

### 2. Data Extraction

Smart selectors extract information from various job sites:

```javascript
// Platform-specific selectors for company names
const selectors = [
  '.jobs-unified-top-card__company-name',  // LinkedIn
  '[data-company-name]',                    // Indeed
  '.employer-name',                         // Glassdoor
  // ... and many more
];
```

### 3. User Notification

When a job is detected:
- Badge appears on extension icon
- Floating notification on the page
- Pre-filled form in popup

### 4. Data Synchronization

Applications are saved directly to your Supabase database:

```javascript
// POST to Supabase REST API
fetch(`${supabaseUrl}/rest/v1/applications`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'apikey': supabaseKey
  },
  body: JSON.stringify(applicationData)
});
```

## Setup Instructions

### For Users

1. **Install the Extension**
   - Follow instructions in `browser-extension/INSTALLATION.md`
   - Load the unpacked extension in Chrome/Edge

2. **Connect to Dashboard**
   - Click the extension icon
   - Sign in to your Job Tracker account
   - Extension will automatically sync

3. **Start Tracking**
   - Browse job sites as usual
   - Click "Track This Job" when prompted
   - Review and save applications

### For Developers

#### 1. Configure Supabase Connection

Update `popup.js` with your dashboard URL:

```javascript
// Replace with your actual dashboard URL
const DASHBOARD_URL = 'https://your-app.vercel.app';
```

#### 2. Enable CORS for Extension

Add to your Supabase project settings:

```javascript
// Allow extension origin
const allowedOrigins = [
  'chrome-extension://*',
  'moz-extension://*'
];
```

#### 3. Create Extension Authentication Flow

Option A: Use existing session (recommended)
```javascript
// Extension reads session from dashboard
chrome.storage.sync.set({
  session: currentSession,
  supabaseUrl: SUPABASE_URL,
  supabaseKey: SUPABASE_ANON_KEY
});
```

Option B: Separate OAuth flow
```javascript
// Implement OAuth in extension
chrome.identity.launchWebAuthFlow({
  url: authUrl,
  interactive: true
}, (redirectUrl) => {
  // Handle authentication
});
```

## Dashboard Integration

### Add Extension Support to Dashboard

Add a settings page for extension configuration:

```jsx
// src/pages/ExtensionSettings.jsx
export default function ExtensionSettings() {
  const handleConnectExtension = async () => {
    const session = await supabase.auth.getSession();
    
    // Send credentials to extension
    chrome.runtime.sendMessage(
      EXTENSION_ID,
      {
        action: 'saveCredentials',
        supabaseUrl: SUPABASE_URL,
        supabaseKey: SUPABASE_ANON_KEY,
        session: session.data.session
      }
    );
  };
  
  return (
    <div>
      <h2>Browser Extension</h2>
      <button onClick={handleConnectExtension}>
        Connect Extension
      </button>
    </div>
  );
}
```

### Add Extension Download Link

Update your dashboard header:

```jsx
<a 
  href="/extension/download" 
  className="btn-secondary"
>
  📥 Get Browser Extension
</a>
```

## API Endpoints

The extension uses these Supabase REST API endpoints:

### Save Application
```
POST /rest/v1/applications
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "company_name": "Google",
  "position_title": "Software Engineer",
  "application_date": "2024-01-15",
  "application_method": "LinkedIn",
  "job_posting_url": "https://...",
  "notes": "...",
  "response_status": "pending",
  "final_outcome": "in_progress",
  "user_id": "uuid"
}
```

### Get User Applications
```
GET /rest/v1/applications?user_id=eq.{user_id}
Authorization: Bearer {access_token}
```

### Verify Session
```
GET /auth/v1/user
Authorization: Bearer {access_token}
```

## Security Considerations

### 1. Token Storage
- Tokens stored in `chrome.storage.sync` (encrypted)
- Automatically synced across devices
- Cleared on sign out

### 2. API Key Protection
- Use Supabase anon key (safe for client-side)
- Row Level Security (RLS) enforces access control
- No sensitive data in extension code

### 3. Content Security Policy
```json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

## Testing

### Manual Testing Checklist

- [ ] Extension loads without errors
- [ ] Job detection works on LinkedIn
- [ ] Job detection works on Indeed
- [ ] Job detection works on Glassdoor
- [ ] Data extraction is accurate
- [ ] Form pre-fills correctly
- [ ] Save to database works
- [ ] Data appears in dashboard
- [ ] Authentication flow works
- [ ] Badge notifications appear
- [ ] Context menu works
- [ ] Multiple applications can be saved
- [ ] Extension works after browser restart

### Automated Testing

```javascript
// Test job detection
describe('Job Detection', () => {
  it('should detect LinkedIn job pages', () => {
    const url = 'https://linkedin.com/jobs/view/123';
    expect(isJobPage(url)).toBe(true);
  });
  
  it('should extract company name', () => {
    const html = '<div class="company-name">Google</div>';
    expect(extractCompanyName(html)).toBe('Google');
  });
});
```

## Troubleshooting

### Common Issues

**Issue**: Extension not detecting jobs
- **Solution**: Refresh the page after installing
- **Solution**: Check URL matches patterns in manifest

**Issue**: Can't save applications
- **Solution**: Verify Supabase credentials
- **Solution**: Check browser console for errors
- **Solution**: Ensure RLS policies allow inserts

**Issue**: Data not syncing
- **Solution**: Sign out and back in
- **Solution**: Clear extension storage
- **Solution**: Check network tab for API errors

## Performance Optimization

### 1. Lazy Loading
```javascript
// Only extract data when needed
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'getJobData') {
    extractJobData(); // Extract on demand
  }
});
```

### 2. Debouncing
```javascript
// Debounce form submissions
const debouncedSubmit = debounce(handleSubmit, 500);
```

### 3. Caching
```javascript
// Cache extracted data
const cache = new Map();
if (cache.has(url)) {
  return cache.get(url);
}
```

## Future Enhancements

- [ ] AI-powered job matching
- [ ] Salary range detection
- [ ] Application deadline tracking
- [ ] Interview scheduling integration
- [ ] Email notification integration
- [ ] Mobile app companion
- [ ] Analytics dashboard
- [ ] Team collaboration features

## Support

For issues or questions:
- Check the troubleshooting section
- Review browser console logs
- Open an issue on GitHub
- Contact support

---

Made with ❤️ by Bob