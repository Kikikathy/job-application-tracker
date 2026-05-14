# Job Application Tracker - Browser Extension

A Chrome/Edge browser extension that automatically detects job applications and helps you track them effortlessly.

## Features

- 🎯 **Auto-Detection**: Automatically detects when you're viewing job postings on popular sites
- 📝 **Smart Extraction**: Extracts company name, position title, and job details from the page
- 💾 **One-Click Save**: Save job applications directly to your tracker with one click
- 🔔 **Application Alerts**: Get notified when you submit a job application
- 🌐 **Multi-Platform Support**: Works on LinkedIn, Indeed, Glassdoor, and many more job sites
- 🔄 **Sync with Dashboard**: Seamlessly integrates with your Job Application Tracker dashboard

## Installation

### From Source (Development)

1. Clone or download this repository
2. Open Chrome/Edge and navigate to `chrome://extensions/` (or `edge://extensions/`)
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the `browser-extension` folder
6. The extension icon should appear in your browser toolbar

### Setup

1. Click the extension icon in your toolbar
2. You'll be prompted to sign in to your Job Application Tracker account
3. Once signed in, the extension will automatically detect job postings

## Usage

### Automatic Detection

When you visit a job posting page on supported sites, the extension will:
- Show a badge notification on the extension icon
- Display a floating "Job Detected" badge on the page
- Extract relevant job information automatically

### Saving Applications

**Method 1: Click the Badge**
- When you see the "Job Detected" badge, click "Track This Job"
- Review the auto-filled information
- Click "Save Application"

**Method 2: Use the Extension Popup**
- Click the extension icon in your toolbar
- The form will be pre-filled with detected information
- Edit if needed and click "Save Application"

**Method 3: Right-Click Context Menu**
- Right-click anywhere on a job posting page
- Select "Save as Job Application"
- The popup will open with pre-filled data

### Supported Job Sites

The extension works on:
- LinkedIn Jobs
- Indeed
- Glassdoor
- Monster
- ZipRecruiter
- Greenhouse
- Lever
- Workday
- SmartRecruiters
- iCIMS
- Any company career page with `/jobs/`, `/careers/`, or `/apply/` in the URL

## How It Works

1. **Content Script**: Runs on job posting pages to detect and extract information
2. **Background Worker**: Manages extension state and handles communication
3. **Popup Interface**: Provides a user-friendly form to review and save applications
4. **Supabase Integration**: Securely saves data to your Job Application Tracker database

## Privacy & Security

- ✅ Your data is stored securely in your own Supabase database
- ✅ No data is sent to third parties
- ✅ Authentication tokens are stored locally in your browser
- ✅ The extension only activates on job-related pages
- ✅ Open source - you can review all the code

## Troubleshooting

### Extension Not Detecting Jobs

1. Make sure you're on a supported job site
2. Refresh the page after installing the extension
3. Check that the extension is enabled in `chrome://extensions/`

### Can't Save Applications

1. Verify you're signed in (click the extension icon)
2. Check your internet connection
3. Make sure your Job Application Tracker dashboard is accessible

### Data Not Syncing

1. Sign out and sign back in through the extension
2. Clear the extension's storage: Right-click extension icon → Options → Clear Data
3. Reload the extension from `chrome://extensions/`

## Development

### File Structure

```
browser-extension/
├── manifest.json          # Extension configuration
├── background.js          # Background service worker
├── content.js            # Content script for job detection
├── content.css           # Styles for on-page elements
├── popup.html            # Extension popup UI
├── popup.js              # Popup logic and API integration
├── icons/                # Extension icons
└── README.md            # This file
```

### Building for Production

1. Update the version in `manifest.json`
2. Replace placeholder URLs with your actual dashboard URL
3. Add your Supabase credentials handling
4. Test thoroughly on all supported sites
5. Package the extension:
   ```bash
   zip -r job-tracker-extension.zip browser-extension/ -x "*.git*" "*.DS_Store"
   ```

### Testing

1. Load the extension in developer mode
2. Visit various job sites (LinkedIn, Indeed, etc.)
3. Test the detection and extraction features
4. Verify data saves correctly to your dashboard
5. Test on different browsers (Chrome, Edge, Brave)

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
- Check the troubleshooting section above
- Review the main Job Application Tracker documentation
- Open an issue on GitHub

---

Made with ❤️ by Bob