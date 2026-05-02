# Email Integration Guide - Gmail API

This guide will help you set up Gmail API integration for automatic job application tracking.

## Overview

The email integration will:
- 🔍 Scan your Gmail for job application confirmations
- 📧 Detect responses from companies
- 🔔 Automatically update application status
- 📊 Track interview invitations
- ⚡ Real-time email monitoring

## Prerequisites

- Google Cloud Platform account
- Gmail account
- Job Application Tracker app running

## Step 1: Set Up Google Cloud Project

### 1.1 Create a New Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Project name: `Job Application Tracker`
4. Click "Create"

### 1.2 Enable Gmail API
1. In your project, go to "APIs & Services" → "Library"
2. Search for "Gmail API"
3. Click "Gmail API"
4. Click "Enable"

## Step 2: Configure OAuth Consent Screen

### 2.1 Set Up Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" (unless you have Google Workspace)
3. Click "Create"

### 2.2 Fill in App Information
- **App name:** Job Application Tracker
- **User support email:** Your email
- **Developer contact:** Your email
- Click "Save and Continue"

### 2.3 Add Scopes
1. Click "Add or Remove Scopes"
2. Add these scopes:
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `https://www.googleapis.com/auth/gmail.modify`
3. Click "Update" → "Save and Continue"

### 2.4 Add Test Users
1. Click "Add Users"
2. Add your Gmail address
3. Click "Save and Continue"

## Step 3: Create OAuth 2.0 Credentials

### 3.1 Create Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: "Web application"
4. Name: "Job Application Tracker Web Client"

### 3.2 Configure Authorized Origins
Add these URLs:
- `http://localhost:5173`
- `https://your-app-domain.vercel.app` (if deployed)

### 3.3 Configure Redirect URIs
Add these URLs:
- `http://localhost:5173/auth/callback`
- `https://your-app-domain.vercel.app/auth/callback` (if deployed)

### 3.4 Save Credentials
1. Click "Create"
2. Copy the **Client ID** and **Client Secret**
3. Keep these safe!

## Step 4: Configure Environment Variables

Add to your `.env` file:

```env
# Gmail API Configuration
VITE_GMAIL_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
VITE_GMAIL_CLIENT_SECRET=your_client_secret_here
VITE_GMAIL_REDIRECT_URI=http://localhost:5173/auth/callback
```

## Step 5: Email Detection Patterns

The system will automatically detect:

### Application Confirmations
- Subject keywords: "application received", "thank you for applying"
- Sender domains: company email addresses
- Auto-creates application entry

### Interview Invitations
- Subject keywords: "interview", "schedule", "meeting"
- Updates status to "interview"
- Extracts date/time if available

### Rejections
- Subject keywords: "unfortunately", "not moving forward", "other candidates"
- Updates status to "rejected"

### Offers
- Subject keywords: "offer", "congratulations", "we're pleased"
- Updates status to "successful"

## Step 6: Using Email Integration

### 6.1 Connect Gmail
1. In the app, go to Settings
2. Click "Connect Gmail"
3. Sign in with your Google account
4. Grant permissions
5. Click "Allow"

### 6.2 Initial Scan
- The app will scan your last 30 days of emails
- Detected applications will appear in your dashboard
- Review and confirm auto-detected applications

### 6.3 Ongoing Monitoring
- New emails are checked every 5 minutes
- Status updates happen automatically
- You'll get notifications for important updates

## Step 7: Privacy & Security

### What We Access
- ✅ Read emails to detect job applications
- ✅ Modify labels (mark as read/processed)
- ❌ We DO NOT send emails
- ❌ We DO NOT delete emails
- ❌ We DO NOT access other Google services

### Data Storage
- Email content is NOT stored
- Only metadata is saved:
  - Company name
  - Position title
  - Application date
  - Status updates
- All data stored in your Supabase database

### Revoke Access
To revoke access anytime:
1. Go to [Google Account Permissions](https://myaccount.google.com/permissions)
2. Find "Job Application Tracker"
3. Click "Remove Access"

## Troubleshooting

### "Access Blocked" Error
- Make sure you added your email as a test user
- Verify OAuth consent screen is configured
- Check that Gmail API is enabled

### "Invalid Redirect URI" Error
- Verify redirect URIs match exactly in Google Cloud Console
- Include both http://localhost:5173 and your production URL

### No Emails Detected
- Check that you granted all required permissions
- Verify emails are in your inbox (not spam)
- Try manual refresh in the app

### Rate Limits
- Gmail API has quotas (250 quota units per user per second)
- The app respects these limits automatically
- If you hit limits, wait a few minutes

## Advanced Configuration

### Custom Email Patterns
Edit `src/lib/emailPatterns.js` to add custom detection rules:

```javascript
export const patterns = {
  application: [
    /application.*received/i,
    /thank you for applying/i,
    // Add your patterns
  ],
  interview: [
    /interview/i,
    /schedule.*meeting/i,
    // Add your patterns
  ]
}
```

### Notification Settings
Configure in `src/lib/notifications.js`:
- Email notification frequency
- Desktop notifications
- Sound alerts

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify all environment variables are set
3. Ensure Gmail API is enabled
4. Review OAuth consent screen configuration

## Next Steps

Once email integration is working:
1. ✅ Test with a few applications
2. ✅ Verify auto-detection accuracy
3. ✅ Adjust patterns if needed
4. ✅ Enable notifications
5. ✅ Deploy to production

---

**Note:** Email integration is optional. The app works perfectly without it for manual tracking.

Made with Bob