# Browser Extension Connection Guide

This guide will help you connect the browser extension to your Job Application Tracker dashboard.

## Prerequisites

- Job Application Tracker dashboard running (locally or deployed)
- Chrome, Edge, or Brave browser
- Active account on the dashboard

## Step-by-Step Connection Process

### Step 1: Start Your Dashboard

1. **If running locally:**
   ```bash
   cd job-application-tracker
   npm run dev
   ```
   Your dashboard should be running at `http://localhost:5173`

2. **If deployed:**
   - Your dashboard is already accessible at your deployment URL (e.g., Vercel)

### Step 2: Install the Browser Extension

1. Open your browser and navigate to:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`

2. Enable **"Developer mode"** (toggle in the top-right corner)

3. Click **"Load unpacked"**

4. Navigate to your project folder and select:
   ```
   job-application-tracker/browser-extension
   ```

5. The extension should now appear in your extensions list

6. **Pin the extension** to your toolbar:
   - Click the puzzle piece icon (🧩) in your browser toolbar
   - Find "Job Application Tracker"
   - Click the pin icon to keep it visible

### Step 3: Configure the Extension

The extension needs to connect to your dashboard's Supabase backend.

#### Option A: Automatic Configuration (Recommended)

1. **Sign in to your dashboard** at `http://localhost:5173` (or your deployment URL)

2. **Navigate to Extension Settings**:
   - Click on "Extension" in the navigation menu
   - Or go directly to `http://localhost:5173/extension`

3. **Click "Connect Extension"** button

4. The extension will automatically receive your credentials

#### Option B: Manual Configuration

If automatic configuration doesn't work, follow these steps:

1. **Get your Supabase credentials** from your `.env` file:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

2. **Open the extension popup** by clicking the extension icon

3. **Sign in** when prompted

4. The extension will store your session automatically

### Step 4: Test the Connection

1. **Visit a job posting** on any of these sites:
   - LinkedIn Jobs: `https://www.linkedin.com/jobs/`
   - Indeed: `https://www.indeed.com/`
   - Glassdoor: `https://www.glassdoor.com/`
   - Or any company career page

2. **Look for indicators**:
   - Badge (!) on the extension icon
   - "Job Detected" notification on the page

3. **Click the extension icon** to see:
   - Pre-filled company name
   - Pre-filled position title
   - Current page URL

4. **Click "Save Application"** to test saving

5. **Check your dashboard** to verify the application was saved

## Troubleshooting

### Extension Not Loading

**Problem**: Extension doesn't appear after loading

**Solutions**:
1. Make sure you selected the `browser-extension` folder, not the parent folder
2. Check for errors in the extensions page
3. Click the "Reload" button on the extension card
4. Try removing and re-adding the extension

### Jobs Not Being Detected

**Problem**: No badge or notification appears on job pages

**Solutions**:
1. Refresh the job posting page
2. Make sure the URL contains `/jobs/`, `/careers/`, or `/apply/`
3. Check browser console for errors (F12 → Console tab)
4. Verify the extension is enabled

### Can't Save Applications

**Problem**: "Error saving application" message

**Solutions**:
1. **Check your Supabase connection**:
   - Verify your `.env` file has correct credentials
   - Make sure your Supabase project is active
   - Check Supabase dashboard for any issues

2. **Verify authentication**:
   - Sign out and sign back in to your dashboard
   - Click the extension icon to check if you're signed in
   - Look for "Please sign in" message

3. **Check browser console**:
   - Open developer tools (F12)
   - Go to Console tab
   - Look for error messages
   - Common errors:
     - CORS errors → Need to configure Supabase
     - 401 Unauthorized → Session expired, sign in again
     - Network errors → Check internet connection

4. **Clear extension storage**:
   - Go to `chrome://extensions/`
   - Find Job Application Tracker
   - Click "Details"
   - Scroll down and click "Clear storage"
   - Reconnect the extension

### Data Not Syncing

**Problem**: Applications saved in extension don't appear in dashboard

**Solutions**:
1. Refresh your dashboard page
2. Check that you're using the same account
3. Verify the application was actually saved (check for success message)
4. Check browser network tab for failed requests

### Extension Popup Won't Open

**Problem**: Clicking extension icon does nothing

**Solutions**:
1. Check browser console for errors
2. Reload the extension
3. Try restarting your browser
4. Check if popup.html exists in the extension folder

## Advanced Configuration

### Updating the Dashboard URL

If your dashboard URL changes (e.g., after deployment), update it in the extension:

1. Open `browser-extension/popup.js`

2. Find this line:
   ```javascript
   const DASHBOARD_URL = 'https://your-app-url.vercel.app';
   ```

3. Replace with your actual dashboard URL

4. Reload the extension in `chrome://extensions/`

### Configuring CORS for Supabase

If you get CORS errors, you may need to configure Supabase:

1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Add your extension origin to allowed origins (if needed)

Note: The Supabase anon key is safe to use in the extension as it's protected by Row Level Security (RLS).

## Verifying Everything Works

Complete this checklist to ensure proper setup:

- [ ] Extension appears in browser toolbar
- [ ] Extension icon is pinned and visible
- [ ] Dashboard is accessible and you're signed in
- [ ] Extension settings page shows "Extension Connected"
- [ ] Visiting a job page shows badge on extension icon
- [ ] "Job Detected" notification appears on job pages
- [ ] Clicking extension icon shows pre-filled form
- [ ] Saving an application shows success message
- [ ] Application appears in dashboard immediately
- [ ] All job details are captured correctly

## Getting Help

If you're still having issues:

1. **Check the documentation**:
   - `browser-extension/README.md` - Extension features
   - `browser-extension/INSTALLATION.md` - Detailed installation
   - `BROWSER_EXTENSION_GUIDE.md` - Technical integration

2. **Review browser console**:
   - Press F12 to open developer tools
   - Check Console tab for errors
   - Check Network tab for failed requests

3. **Test with a simple job page**:
   - Try LinkedIn first (best detection)
   - Then try Indeed
   - Finally try company career pages

4. **Verify your setup**:
   - Dashboard is running
   - Supabase credentials are correct
   - You're signed in to both dashboard and extension

## Success!

Once everything is working, you should be able to:

✅ Browse job sites normally
✅ See automatic detection of job postings
✅ Save applications with one click
✅ Have all data sync to your dashboard
✅ Track your job search effortlessly

Happy job hunting! 🎯

---

Made with ❤️ by Bob