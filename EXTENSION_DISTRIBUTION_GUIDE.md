# Browser Extension Distribution Guide

## 🚀 Quick Distribution Link

Share this link with users to download and install the extension:

**GitHub Repository**: `https://github.com/YOUR_USERNAME/job-application-tracker`

Or create a direct download link:
**Direct Download**: `https://github.com/YOUR_USERNAME/job-application-tracker/archive/refs/heads/main.zip`

---

## 📦 For Users: How to Install

### Step 1: Download the Extension

1. **Option A - Direct Download**:
   - Click this link: [Download Extension](https://github.com/YOUR_USERNAME/job-application-tracker/archive/refs/heads/main.zip)
   - Extract the ZIP file to a folder on your computer

2. **Option B - Clone Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/job-application-tracker.git
   ```

### Step 2: Install in Browser

#### For Chrome/Edge/Brave:

1. Open your browser and navigate to:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`

2. **Enable Developer Mode**:
   - Look for the toggle switch in the top-right corner
   - Turn it ON

3. **Load the Extension**:
   - Click the **"Load unpacked"** button
   - Navigate to the extracted folder
   - Select the `browser-extension` folder (NOT the root folder)
   - Click "Select Folder"

4. **Pin the Extension**:
   - Click the puzzle piece icon (🧩) in your browser toolbar
   - Find "Job Application Tracker"
   - Click the pin icon to keep it visible

### Step 3: Connect to Your Account

1. **Sign Up/Sign In**:
   - Visit: https://job-application-tracker-two-xi.vercel.app
   - Create an account or sign in

2. **Connect Extension**:
   - Click the extension icon in your browser
   - Click "Open Dashboard →"
   - The extension will automatically connect to your account

3. **Start Tracking**:
   - Visit any job posting on LinkedIn, Indeed, Glassdoor, etc.
   - The extension will automatically detect the job
   - Click "Track This Job" to save it

---

## 🎯 For Developers: Distribution Options

### Option 1: GitHub Releases (Recommended)

1. **Create a Release**:
   ```bash
   # Tag your version
   git tag -a v1.0.0 -m "Initial release"
   git push origin v1.0.0
   ```

2. **Package the Extension**:
   ```bash
   # Create a ZIP file of just the extension
   cd browser-extension
   zip -r ../job-tracker-extension-v1.0.0.zip . -x "*.git*" "*.DS_Store" "*.md"
   ```

3. **Create GitHub Release**:
   - Go to your repository on GitHub
   - Click "Releases" → "Create a new release"
   - Choose the tag (v1.0.0)
   - Upload the ZIP file
   - Add release notes
   - Publish release

4. **Share the Link**:
   ```
   https://github.com/YOUR_USERNAME/job-application-tracker/releases/latest/download/job-tracker-extension-v1.0.0.zip
   ```

### Option 2: Chrome Web Store (Official Distribution)

**Note**: This requires a one-time $5 developer fee and review process.

1. **Prepare for Submission**:
   - Ensure all placeholder URLs are replaced with production URLs
   - Create promotional images (128x128, 440x280, 1400x560)
   - Write a detailed description
   - Add screenshots

2. **Create Developer Account**:
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Pay the $5 registration fee
   - Complete your developer profile

3. **Package Extension**:
   ```bash
   cd browser-extension
   zip -r extension.zip . -x "*.git*" "*.DS_Store" "*.md" "*GUIDE.md"
   ```

4. **Submit for Review**:
   - Upload the ZIP file
   - Fill in all required information
   - Submit for review (usually takes 1-3 days)

5. **Share Store Link**:
   ```
   https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID
   ```

### Option 3: Self-Hosted Distribution

1. **Host on Your Server**:
   ```bash
   # Package the extension
   cd browser-extension
   zip -r job-tracker-extension.zip .
   
   # Upload to your server
   scp job-tracker-extension.zip user@yourserver.com:/var/www/downloads/
   ```

2. **Create Download Page**:
   - Add a download link on your website
   - Include installation instructions
   - Provide support contact

3. **Share the Link**:
   ```
   https://yourwebsite.com/downloads/job-tracker-extension.zip
   ```

---

## 📝 Update Your Application

### Update the Download Link in ExtensionSettings.jsx

Replace the GitHub link in `src/components/ExtensionSettings.jsx`:

```jsx
// Line 105
<a
  href="https://github.com/YOUR_USERNAME/job-application-tracker/releases/latest/download/job-tracker-extension-v1.0.0.zip"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
>
  <Download className="w-4 h-4" />
  Download Extension
  <ExternalLink className="w-4 h-4" />
</a>
```

### Update Dashboard URL in popup.js

Replace the dashboard URL in `browser-extension/popup.js`:

```javascript
// Line 95
chrome.tabs.create({ url: 'https://job-application-tracker-two-xi.vercel.app' });
```

---

## 🔄 Version Management

### Updating the Extension

1. **Update Version Number**:
   - Edit `browser-extension/manifest.json`
   - Increment the version (e.g., 1.0.0 → 1.0.1)

2. **Create New Release**:
   ```bash
   git tag -a v1.0.1 -m "Bug fixes and improvements"
   git push origin v1.0.1
   ```

3. **Package and Upload**:
   ```bash
   cd browser-extension
   zip -r ../job-tracker-extension-v1.0.1.zip .
   ```

4. **Notify Users**:
   - Users with "Load unpacked" will need to manually update
   - Chrome Web Store users get automatic updates

---

## 📊 Distribution Checklist

Before distributing, ensure:

- [ ] All placeholder URLs are replaced with production URLs
- [ ] Supabase credentials are properly configured
- [ ] Extension manifest version is correct
- [ ] Icons are properly sized and formatted
- [ ] All features are tested on multiple job sites
- [ ] Documentation is complete and accurate
- [ ] Privacy policy is included (if required)
- [ ] Support contact information is provided
- [ ] README includes clear installation instructions
- [ ] Screenshots and promotional images are ready (for Web Store)

---

## 🎨 Marketing Materials

### Promotional Text

**Short Description** (132 characters max):
```
Automatically detect and track job applications from LinkedIn, Indeed, Glassdoor, and more. Never lose track of your job search!
```

**Full Description**:
```
Job Application Tracker is a powerful browser extension that helps you manage your job search effortlessly.

✨ KEY FEATURES:
• Auto-detect job postings on popular sites
• Extract company name, position, and details automatically
• One-click save to your personal dashboard
• Track application status and responses
• Upload resumes, cover letters, and portfolios
• Get insights and analytics on your job search

🌐 SUPPORTED SITES:
• LinkedIn Jobs
• Indeed
• Glassdoor
• Monster
• ZipRecruiter
• Company career pages
• And many more!

🔒 PRIVACY & SECURITY:
• Your data is stored in your own secure database
• No data shared with third parties
• Open source - review the code yourself
• Local authentication tokens

📊 DASHBOARD FEATURES:
• Visual analytics and statistics
• Application timeline tracking
• Response rate monitoring
• Document management
• Notes and reminders

Perfect for job seekers who want to stay organized and never miss an opportunity!
```

### Screenshots Needed (for Chrome Web Store)

1. **Main popup** - Extension interface with form
2. **Job detection** - Badge on a job posting page
3. **Dashboard view** - Main application dashboard
4. **Analytics** - Statistics and insights
5. **Document upload** - File management interface

---

## 🆘 Support & Troubleshooting

### Common User Issues

**"Extension not detecting jobs"**
- Refresh the page after installing
- Check that Developer Mode is enabled
- Verify the URL contains /jobs/, /careers/, or /apply/

**"Can't save applications"**
- Ensure user is signed in to dashboard
- Check internet connection
- Verify Supabase project is active

**"Extension icon not showing"**
- Click puzzle piece icon (🧩)
- Find and pin the extension

### Support Channels

Provide users with:
- GitHub Issues: `https://github.com/YOUR_USERNAME/job-application-tracker/issues`
- Email: your-email@example.com
- Documentation: Link to README and guides

---

## 📈 Analytics & Feedback

### Track Usage (Optional)

Consider adding:
- Installation count tracking
- Feature usage analytics
- Error reporting
- User feedback collection

### Gather Feedback

- Create a feedback form
- Monitor GitHub issues
- Respond to user reviews
- Iterate based on feedback

---

## 🎉 Launch Checklist

- [ ] Extension is fully tested
- [ ] All documentation is complete
- [ ] Download links are working
- [ ] Dashboard is deployed and accessible
- [ ] Support channels are set up
- [ ] Marketing materials are ready
- [ ] Privacy policy is published
- [ ] Announcement is prepared
- [ ] Social media posts are scheduled
- [ ] Community is notified

---

## 🔗 Quick Links for Users

**Download Extension**: [GitHub Releases](https://github.com/YOUR_USERNAME/job-application-tracker/releases)

**Dashboard**: https://job-application-tracker-two-xi.vercel.app

**Documentation**: [Installation Guide](./browser-extension/INSTALLATION.md)

**Support**: [GitHub Issues](https://github.com/YOUR_USERNAME/job-application-tracker/issues)

---

Made with ❤️ by Bob

**Ready to launch!** Share the download link with your users and help them streamline their job search.