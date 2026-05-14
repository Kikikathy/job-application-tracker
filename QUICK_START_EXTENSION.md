# Quick Start: Browser Extension Setup

Follow these simple steps to get your browser extension working with your Job Application Tracker.

## 🚀 Quick Setup (5 minutes)

### 1. Start Your Dashboard

```bash
cd job-application-tracker
npm run dev
```

Your dashboard will open at `http://localhost:5173`

### 2. Load the Extension

1. Open Chrome/Edge and go to: `chrome://extensions/`
2. Turn ON "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select the folder: `job-application-tracker/browser-extension`
5. Pin the extension (click puzzle icon 🧩, then pin)

### 3. Connect to Dashboard

1. Sign in to your dashboard at `http://localhost:5173`
2. Click "Extension" in the navigation menu
3. Click "Connect Extension" button
4. Done! ✅

### 4. Test It Out

1. Visit any job posting on:
   - [LinkedIn Jobs](https://www.linkedin.com/jobs/)
   - [Indeed](https://www.indeed.com/)
   - [Glassdoor](https://www.glassdoor.com/)

2. Look for:
   - Badge (!) on extension icon
   - "Job Detected" notification on page

3. Click extension icon → Review details → Save!

## 📋 What You Should See

### On Job Pages:
- ✅ Badge notification on extension icon
- ✅ Floating "Job Detected" badge
- ✅ Pre-filled company and position

### In Extension Popup:
- ✅ Company name auto-filled
- ✅ Position title auto-filled
- ✅ Job URL captured
- ✅ Application method detected

### In Dashboard:
- ✅ New applications appear immediately
- ✅ All details captured correctly
- ✅ Analytics updated

## 🔧 Common Issues & Quick Fixes

### Extension Not Loading?
```bash
# Make sure you're in the right folder
cd job-application-tracker/browser-extension
# Check files exist
ls manifest.json popup.html content.js
```

### Jobs Not Detected?
- Refresh the job page
- Check URL has `/jobs/` or `/careers/`
- Make sure extension is enabled

### Can't Save Applications?
1. Check you're signed in to dashboard
2. Verify Supabase credentials in `.env`
3. Clear extension storage and reconnect

### Extension Icon Missing?
- Click puzzle icon (🧩) in browser
- Find "Job Application Tracker"
- Click pin icon

## 📁 File Structure

```
job-application-tracker/
├── browser-extension/          ← Load this folder
│   ├── manifest.json          ← Extension config
│   ├── popup.html             ← Extension UI
│   ├── popup.js               ← Extension logic
│   ├── content.js             ← Job detection
│   ├── content.css            ← Styling
│   ├── background.js          ← Background worker
│   └── icons/                 ← Extension icons
├── src/
│   ├── components/
│   │   └── ExtensionSettings.jsx  ← Settings page
│   └── pages/
│       └── Dashboard.jsx      ← Main dashboard
└── EXTENSION_CONNECTION_GUIDE.md  ← Detailed guide
```

## 🎯 Testing Checklist

Test on these sites to verify everything works:

- [ ] LinkedIn Jobs - `linkedin.com/jobs/`
- [ ] Indeed - `indeed.com`
- [ ] Glassdoor - `glassdoor.com`
- [ ] Company career page (any company)

For each site:
- [ ] Badge appears on extension icon
- [ ] Notification shows on page
- [ ] Company name extracted correctly
- [ ] Position title extracted correctly
- [ ] Can save application successfully
- [ ] Application appears in dashboard

## 💡 Pro Tips

1. **Pin the extension** for quick access
2. **Use right-click menu** for fast saves
3. **Review auto-filled data** before saving
4. **Add notes** for important details
5. **Check dashboard** regularly for updates

## 🆘 Need Help?

1. **Check browser console** (F12 → Console)
2. **Review detailed guide**: `EXTENSION_CONNECTION_GUIDE.md`
3. **Check extension errors**: `chrome://extensions/` → Details → Errors

## ✅ Success Indicators

You'll know it's working when:

1. ✅ Extension icon shows in toolbar
2. ✅ Badge (!) appears on job pages
3. ✅ Clicking icon shows pre-filled form
4. ✅ Saving shows success message
5. ✅ Applications appear in dashboard
6. ✅ All data syncs correctly

## 🎉 You're All Set!

Now you can:
- Browse job sites normally
- Get automatic job detection
- Save applications with one click
- Track everything in your dashboard

Happy job hunting! 🚀

---

**Next Steps:**
- Customize the extension settings
- Set up email notifications
- Explore analytics features
- Share feedback for improvements

Made with ❤️ by Bob