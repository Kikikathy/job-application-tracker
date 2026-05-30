# 📊 Job Application Tracker

A comprehensive web application and browser extension to help you track and manage your job applications effortlessly.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![GitHub](https://img.shields.io/github/stars/Kikikathy/job-application-tracker?style=social)

---

## ✨ Features

### 🌐 Web Dashboard
- **Application Management**: Track all your job applications in one place
- **Status Tracking**: Monitor application progress from submission to offer
- **Analytics**: Visualize your job search with charts and statistics
- **Document Storage**: Upload and manage resumes, cover letters, and portfolios
- **Timeline View**: See your application history at a glance
- **Search & Filter**: Quickly find specific applications

### 🔌 Browser Extension
- **Auto-Detection**: Automatically detects job postings on popular sites
- **Smart Extraction**: Extracts company name, position, and details
- **One-Click Save**: Save applications directly from job sites
- **Multi-Platform**: Works on LinkedIn, Indeed, Glassdoor, and more
- **Seamless Sync**: Instantly syncs with your dashboard

---

## 🚀 Quick Start

### For Users: Install the Extension

1. **Download the Extension**:
   - Visit the [Releases page](https://github.com/Kikikathy/job-application-tracker/releases/latest)
   - Download `job-tracker-extension-v1.0.0.zip`
   - Extract the ZIP file

2. **Install in Browser**:
   - Open Chrome/Edge: `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `browser-extension` folder

3. **Connect to Dashboard**:
   - Visit: https://job-application-tracker-two-xi.vercel.app
   - Sign up or sign in
   - Click the extension icon and start tracking!

📖 **Detailed Instructions**: [INSTALLATION.md](./browser-extension/INSTALLATION.md)

### For Developers: Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Kikikathy/job-application-tracker.git
   cd job-application-tracker
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Load Extension**:
   - Follow the installation steps above
   - Point to the `browser-extension` folder

📖 **Full Setup Guide**: [SETUP.md](./SETUP.md)

---

## 📦 Project Structure

```
job-application-tracker/
├── browser-extension/          # Browser extension files
│   ├── manifest.json          # Extension configuration
│   ├── popup.html             # Extension popup UI
│   ├── popup.js               # Popup logic
│   ├── content.js             # Job detection script
│   ├── background.js          # Background worker
│   └── icons/                 # Extension icons
├── src/                       # React application
│   ├── components/            # React components
│   ├── pages/                 # Page components
│   └── lib/                   # Utilities and configs
├── supabase/                  # Database schema
└── dist/                      # Packaged extensions (generated)
```

---

## 🎯 Supported Job Sites

The extension automatically detects jobs on:

- ✅ LinkedIn Jobs
- ✅ Indeed
- ✅ Glassdoor
- ✅ Monster
- ✅ ZipRecruiter
- ✅ Greenhouse
- ✅ Lever
- ✅ Workday
- ✅ SmartRecruiters
- ✅ iCIMS
- ✅ Company career pages

---

## 🛠️ Technology Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Supabase** - Database and authentication
- **PostgreSQL** - Database
- **Row Level Security** - Data protection

### Extension
- **Manifest V3** - Chrome extension API
- **Content Scripts** - Page interaction
- **Service Worker** - Background processing

---

## 📚 Documentation

- **[LAUNCH_GUIDE.md](./LAUNCH_GUIDE.md)** - How to launch and distribute the extension
- **[EXTENSION_DISTRIBUTION_GUIDE.md](./EXTENSION_DISTRIBUTION_GUIDE.md)** - Distribution options and strategies
- **[SETUP.md](./SETUP.md)** - Development setup instructions
- **[browser-extension/README.md](./browser-extension/README.md)** - Extension documentation
- **[browser-extension/INSTALLATION.md](./browser-extension/INSTALLATION.md)** - User installation guide
- **[QUICK_START_EXTENSION.md](./QUICK_START_EXTENSION.md)** - Quick setup guide

---

## 🚀 Deployment

### Dashboard (Vercel)

The dashboard is deployed on Vercel:
- **Production**: https://job-application-tracker-two-xi.vercel.app
- **Auto-deploy**: Pushes to `main` branch trigger deployment

📖 **Deployment Guide**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

### Extension Distribution

**Option 1: GitHub Releases** (Recommended)
```bash
# Package the extension
./package-extension.sh  # or package-extension.bat on Windows

# Create a release on GitHub
# Upload the generated ZIP file from dist/
```

**Option 2: Chrome Web Store**
- Submit to Chrome Web Store for official distribution
- Requires $5 developer fee and review process

📖 **Distribution Guide**: [EXTENSION_DISTRIBUTION_GUIDE.md](./EXTENSION_DISTRIBUTION_GUIDE.md)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Test thoroughly before submitting
- Update documentation as needed
- Add comments for complex logic

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea?

1. **Check existing issues** to avoid duplicates
2. **Open a new issue** with detailed information
3. **Use issue templates** when available

[Report an Issue](https://github.com/Kikikathy/job-application-tracker/issues)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

---

## 📞 Support

Need help? Here's how to get support:

- 📖 **Documentation**: Check the guides in this repository
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Kikikathy/job-application-tracker/issues)
- 💬 **Questions**: Open a discussion on GitHub
- 📧 **Email**: your-email@example.com

---

## 🎉 Getting Started

Ready to streamline your job search?

1. **[Download the Extension](https://github.com/Kikikathy/job-application-tracker/releases/latest)**
2. **[Sign Up for Dashboard](https://job-application-tracker-two-xi.vercel.app)**
3. **Start Tracking Applications!**

---

## 📊 Stats

- 🎯 **Applications Tracked**: Growing daily
- ⭐ **GitHub Stars**: [Star this repo!](https://github.com/Kikikathy/job-application-tracker)
- 🍴 **Forks**: [Fork and contribute!](https://github.com/Kikikathy/job-application-tracker/fork)

---

## 🗺️ Roadmap

### Current Version (v1.0.0)
- ✅ Core application tracking
- ✅ Browser extension
- ✅ Document management
- ✅ Analytics dashboard

### Upcoming Features
- 📧 Email notifications
- 📱 Mobile app
- 🔗 API integrations
- 🤖 AI-powered insights
- 📅 Interview scheduling
- 🎨 Custom themes

---

## 💡 Tips for Job Seekers

1. **Track Everything**: Save every application, even if you're not sure
2. **Add Notes**: Document your thoughts and follow-up actions
3. **Upload Documents**: Keep all versions of your resume organized
4. **Review Analytics**: Learn from your application patterns
5. **Stay Organized**: Regular updates help you stay on top of your search

---

## 🌟 Show Your Support

If this project helps you, please consider:

- ⭐ **Starring the repository**
- 🐛 **Reporting bugs**
- 💡 **Suggesting features**
- 🤝 **Contributing code**
- 📢 **Sharing with others**

---

**Made with ❤️ by Bob**

*Helping job seekers stay organized and land their dream jobs!*

---

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### Extension Popup
![Extension](https://via.placeholder.com/400x600?text=Extension+Screenshot)

### Analytics
![Analytics](https://via.placeholder.com/800x400?text=Analytics+Screenshot)

---

**Happy Job Hunting! 🚀**