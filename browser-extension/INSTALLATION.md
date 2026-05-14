# Browser Extension Installation Guide

## Quick Start

### Step 1: Install the Extension

#### For Chrome/Edge/Brave:

1. Download or clone the Job Application Tracker repository
2. Open your browser and navigate to:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`

3. Enable **Developer mode** (toggle in the top right corner)

4. Click **"Load unpacked"**

5. Navigate to and select the `job-application-tracker/browser-extension` folder

6. The extension should now appear in your extensions list with a briefcase icon

### Step 2: Pin the Extension

1. Click the puzzle piece icon (🧩) in your browser toolbar
2. Find "Job Application Tracker" in the list
3. Click the pin icon to keep it visible in your toolbar

### Step 3: Connect to Your Dashboard

#### First Time Setup:

1. Click the extension icon in your toolbar
2. You'll see a message: "Please sign in to your Job Tracker account"
3. Click **"Open Dashboard →"**
4. Sign in to your Job Application Tracker dashboard
5. The extension will automatically connect to your account

#### Manual Configuration (Advanced):

If you need to manually configure the extension:

1. Right-click the extension icon
2. Select "Options" or "Manage Extension"
3. Enter your Supabase credentials:
   - **Supabase URL**: Your project URL (e.g., `https://xxxxx.supabase.co`)
   - **Supabase Anon Key**: Your public anon key
4. Click "Save"

## Using the Extension

### Automatic Job Detection

The extension automatically detects job postings on:
- LinkedIn Jobs
- Indeed
- Glassdoor
- Monster
- ZipRecruiter
- Company career pages
- And many more!

When a job is detected:
1. A badge (!) appears on the extension icon
2. A floating "Job Detected" notification appears on the page
3. Click "Track This Job" to save it

### Manual Entry

You can also manually add jobs:
1. Click the extension icon
2. Fill in the job details
3. Click "Save Application"

### Quick Save

Right-click anywhere on a job posting page and select:
**"Save as Job Application"**

## Verification

To verify the extension is working:

1. Visit a job posting on LinkedIn or Indeed
2. Look for:
   - A badge (!) on the extension icon
   - A "Job Detected" notification on the page
3. Click the extension icon to see auto-filled job details

## Troubleshooting

### Extension Not Loading

**Problem**: Extension doesn't appear after installation

**Solution**:
1. Make sure you selected the correct folder (`browser-extension`)
2. Check for errors in the extensions page
3. Try reloading the extension (click the refresh icon)

### Jobs Not Being Detected

**Problem**: No detection on job sites

**Solution**:
1. Refresh the job posting page
2. Make sure the URL contains `/jobs/`, `/careers/`, or `/apply/`
3. Check that the extension is enabled
4. Try disabling and re-enabling the extension

### Can't Save Applications

**Problem**: "Error saving application" message

**Solution**:
1. Verify you're signed in to your dashboard
2. Check your internet connection
3. Make sure your Supabase project is active
4. Try signing out and back in

### Extension Icon Not Showing

**Problem**: Can't find the extension icon

**Solution**:
1. Click the puzzle piece icon (🧩) in your toolbar
2. Find "Job Application Tracker"
3. Click the pin icon to make it visible

### Data Not Syncing

**Problem**: Applications not appearing in dashboard

**Solution**:
1. Refresh your dashboard
2. Check that you're using the same account
3. Clear extension storage:
   - Right-click extension icon → Options
   - Click "Clear Data"
   - Sign in again

## Updating the Extension

When a new version is available:

1. Download the latest version
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Or remove and reinstall the extension

## Uninstalling

To remove the extension:

1. Go to `chrome://extensions/`
2. Find "Job Application Tracker"
3. Click "Remove"
4. Confirm the removal

Your data in the dashboard will remain intact.

## Privacy & Permissions

The extension requires these permissions:

- **activeTab**: To detect job postings on the current page
- **storage**: To save your preferences and temporary data
- **scripting**: To extract job information from pages

**Your data is secure**:
- Stored in your own Supabase database
- No data sent to third parties
- Authentication tokens stored locally
- Open source code you can review

## Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Review the main README.md
3. Check browser console for errors (F12 → Console)
4. Open an issue on GitHub with:
   - Browser version
   - Extension version
   - Steps to reproduce the issue
   - Any error messages

## Tips for Best Results

1. **Keep the extension updated** for the latest features
2. **Pin the extension** to your toolbar for quick access
3. **Use on supported sites** for automatic detection
4. **Review auto-filled data** before saving
5. **Add notes** to remember important details

---

Need more help? Check the main documentation or open an issue on GitHub.

Made with ❤️ by Bob