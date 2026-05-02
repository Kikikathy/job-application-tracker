# Gmail Integration Troubleshooting

## "Failed to Connect to Gmail" Error

This error occurs when the Google Cloud OAuth configuration is incomplete. Follow these steps:

### Step 1: Verify Google Cloud Project Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: "Job Application Tracker"
3. Verify Gmail API is enabled:
   - Go to "APIs & Services" → "Library"
   - Search "Gmail API"
   - Should show "API enabled" (green checkmark)

### Step 2: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Verify these settings:
   - **User Type:** External
   - **App name:** Job Application Tracker
   - **User support email:** Your email
   - **Scopes:** Should include Gmail scopes
   - **Test users:** Your Gmail address must be added

**IMPORTANT:** If you see "Publishing status: Testing", that's correct. You don't need to publish the app.

### Step 3: Check OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Find your OAuth 2.0 Client ID
3. Click the edit icon (pencil)
4. Verify these settings:

**Authorized JavaScript origins:**
```
http://localhost:5173
```

**Authorized redirect URIs:**
```
http://localhost:5173
http://localhost:5173/auth/callback
```

**CRITICAL:** The URIs must match EXACTLY (no trailing slashes, correct port)

### Step 4: Add Your Email as Test User

1. Go to "OAuth consent screen"
2. Scroll to "Test users"
3. Click "Add Users"
4. Add your Gmail address
5. Click "Save"

### Step 5: Verify Environment Variables

Check your `.env` file has:
```env
VITE_GMAIL_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
VITE_GMAIL_CLIENT_SECRET=your_client_secret_here
VITE_GMAIL_REDIRECT_URI=http://localhost:5173/auth/callback
```

**Note:** Replace with your actual credentials from Google Cloud Console.

### Step 6: Restart Development Server

After making any changes:
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 7: Clear Browser Cache

1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Clear all site data
4. Refresh the page

### Common Issues:

#### Issue: "Access Blocked: This app's request is invalid"
**Solution:** 
- Verify redirect URIs match exactly
- Make sure you added your email as a test user
- Check OAuth consent screen is configured

#### Issue: "Error 400: redirect_uri_mismatch"
**Solution:**
- The redirect URI in Google Cloud Console must match exactly
- Add both:
  - `http://localhost:5173`
  - `http://localhost:5173/auth/callback`

#### Issue: "This app isn't verified"
**Solution:**
- This is normal for apps in testing mode
- Click "Advanced" → "Go to Job Application Tracker (unsafe)"
- This only appears for test users

#### Issue: "Access Denied"
**Solution:**
- Make sure your email is added as a test user
- Check that Gmail API is enabled
- Verify scopes are correct in OAuth consent screen

### Step 8: Test Connection

1. Open http://localhost:5173/
2. Sign in to your account
3. Look for the Email Integration card
4. Click "Connect Gmail"
5. You should see Google sign-in popup
6. Select your account
7. Review permissions
8. Click "Allow"

### Expected Permissions Request:

The app will ask for:
- ✅ Read your email messages and settings
- ✅ Manage labels on your email

**Note:** We only READ emails, we don't send or delete them.

### Debugging Steps:

1. **Check Browser Console:**
   - Press F12
   - Go to Console tab
   - Look for error messages
   - Share the error for help

2. **Check Network Tab:**
   - Press F12
   - Go to Network tab
   - Try connecting again
   - Look for failed requests
   - Check the error response

3. **Verify API Key:**
   - Make sure Client ID starts with your project number
   - Verify no extra spaces in .env file
   - Check no quotes around values

### Alternative: Create New OAuth Credentials

If nothing works, create fresh credentials:

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: "Web application"
4. Name: "Job Tracker Web Client v2"
5. Authorized JavaScript origins:
   - `http://localhost:5173`
6. Authorized redirect URIs:
   - `http://localhost:5173`
   - `http://localhost:5173/auth/callback`
7. Click "Create"
8. Copy new Client ID and Secret
9. Update `.env` file
10. Restart server

### Still Not Working?

If you've tried everything:

1. **Verify Gmail API Quota:**
   - Go to "APIs & Services" → "Dashboard"
   - Click "Gmail API"
   - Check if you have quota remaining

2. **Check Google Account Settings:**
   - Go to https://myaccount.google.com/permissions
   - Remove "Job Application Tracker" if it exists
   - Try connecting again

3. **Try Different Browser:**
   - Sometimes browser extensions block OAuth
   - Try in Incognito/Private mode
   - Try a different browser

### Contact Support:

If still having issues, provide:
- Error message from browser console
- Screenshot of OAuth consent screen
- Screenshot of OAuth credentials page
- Browser and version you're using

## Success Indicators:

When working correctly, you should see:
- ✅ "Connect Gmail" button
- ✅ Google sign-in popup appears
- ✅ Permission request screen
- ✅ After allowing: "Gmail connected successfully!"
- ✅ "Scan Last 30 Days" button appears

Made with Bob