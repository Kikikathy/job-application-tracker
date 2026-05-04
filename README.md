# 📋 Job Application Tracker

A comprehensive web application to track and manage your job applications with document management capabilities.

## 🚀 Live Demo
**[View Live Application](https://job-application-tracker-two-xi.vercel.app)**

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Deployment](https://img.shields.io/badge/deployment-vercel-black.svg)

## ✨ Features

### 🎯 Core Features

#### Application Management
- ✅ **Add, Edit, Delete** job applications
- ✅ **Search** by company name or position title
- ✅ **Filter** by status (pending, responded, rejected, successful)
- ✅ **Dashboard statistics** - Track total, pending, responded, rejections, and offers
- ✅ **Notes** - Add detailed notes for each application

#### Status Tracking
- ✅ **Response Status Dropdown:**
  - Pending Response
  - Responded
  - Interview Scheduled
  - No Response
- ✅ **Final Outcome Dropdown:**
  - In Progress
  - Rejected
  - Successful (Job Offer)
  - Withdrawn
- ✅ **Instant Updates** - Changes save automatically

#### Document Management
- ✅ **Upload Multiple Document Types:**
  - Resume/CV (PDF, DOC, DOCX)
  - Cover Letter (PDF, DOC, DOCX)
  - Portfolio (PDF, DOC, DOCX, MP4, MOV, AVI, MKV, WEBM, or Link)
  - Other Documents (PDF, DOC, DOCX, Videos)
- ✅ **Portfolio Links** - Save portfolio website URLs
- ✅ **Video Support** - Upload video presentations
- ✅ **Document Management** - View, download, and delete documents
- ✅ **File Size Display** - See document sizes
- ✅ **Secure Storage** - All files stored in Supabase Storage

#### User Interface
- ✅ **Modern Design** - Clean, intuitive interface
- ✅ **Responsive** - Works on desktop, tablet, and mobile
- ✅ **Dark Mode Ready** - Professional color scheme
- ✅ **Loading States** - Smooth animations and feedback
- ✅ **Status Badges** - Visual indicators for application status

## 🚀 Tech Stack

- **Frontend:** React 18 + Vite 8
- **Styling:** Tailwind CSS 3
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Routing:** React Router DOM 6
- **Hosting:** Vercel

## 📁 Project Structure

```
job-application-tracker/
├── src/
│   ├── components/           # React components
│   │   ├── Auth.jsx         # Authentication component
│   │   └── Layout.jsx       # App layout with navigation
│   ├── pages/               # Page components
│   │   └── Dashboard.jsx    # Main dashboard
│   ├── lib/                 # Utilities and services
│   │   └── supabase.js     # Supabase client
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── supabase/               # Database schema
│   └── schema.sql          # Main database schema
├── public/                 # Static assets
├── .env.example           # Environment variables template
├── SETUP.md              # Detailed setup instructions
├── INTERVIEW_STATUS_FIX.md     # Database migration guide
└── README.md             # This file
```

## 🗄️ Database Schema

### Applications Table
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key to auth.users)
- company_name (text, required)
- position_title (text, required)
- application_date (date, required)
- application_method (text)
- job_posting_url (text)
- response_status (enum: pending, responded, no_response)
- final_outcome (enum: in_progress, rejected, successful, withdrawn)
- notes (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### Documents Table
```sql
- id (uuid, primary key)
- application_id (uuid, foreign key)
- document_type (enum: resume, cover_letter, portfolio, other)
- file_name (text)
- file_url (text)
- file_size (integer)
- version_number (integer)
- uploaded_at (timestamp)
```

### Responses Table
```sql
- id (uuid, primary key)
- application_id (uuid, foreign key)
- response_date (timestamp)
- response_type (enum: email, phone, rejection, interview_invite, other)
- notes (text)
- created_at (timestamp)
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Supabase account (free tier available)
- GitHub account

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/Kikikathy/job-application-tracker.git
cd job-application-tracker
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the schema from `supabase/schema.sql`
   - Get your project URL and anon key from Project Settings → API

4. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **Run the development server:**
```bash
npm run dev
```

6. **Open your browser:**
   - Navigate to http://localhost:5173
   - Sign up for an account
   - Start tracking your applications!

### Detailed Setup

For detailed setup instructions, see [SETUP.md](SETUP.md)

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** (if not already done)

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your `job-application-tracker` repository

3. **Configure Environment Variables:**
   Add these in Vercel project settings:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://job-application-tracker-two-xi.vercel.app`

## 📖 Usage Guide

### Adding an Application

1. Click "Add Application" button
2. Fill in required fields:
   - Company Name
   - Position Title
   - Application Date
3. Optionally add:
   - Application Method (e.g., LinkedIn, Company Website)
   - Job Posting URL
   - Notes
4. Select initial status
5. Click "Add Application"

### Uploading Documents

1. Click the upload icon (📤) on any application
2. Choose document type:
   - Resume/CV
   - Cover Letter
   - Portfolio (file or link)
   - Other Documents
3. Select file or paste link
4. Document uploads automatically

### Updating Status

1. Find your application in the list
2. Use the dropdown menus to update:
   - **Response Status** - Track if company responded
   - **Final Outcome** - Track final result
3. Changes save automatically

### Searching and Filtering

- Use the search bar to find applications by company or position
- Use the filter dropdown to show specific statuses
- View statistics at the top of the dashboard

## 🔧 Troubleshooting

See [INTERVIEW_STATUS_FIX.md](INTERVIEW_STATUS_FIX.md) for details.

### Common Issues

**"Missing Supabase environment variables"**
- Ensure `.env` file exists
- Check that values are correct (no quotes needed)
- Restart dev server after changes

**Database errors**
- Verify schema was executed in Supabase
- Check Row Level Security policies are enabled
- Ensure you're signed in

**File upload fails**
- Check file size (max 10MB)
- Verify Supabase storage bucket exists
- Check storage policies in Supabase

## 🎯 Features Roadmap

### ✅ Completed
- [x] User authentication
- [x] Application CRUD operations
- [x] Document upload and management
- [x] Status tracking with dropdowns
- [x] Search and filter
- [x] Dashboard statistics
- [x] Video file support
- [x] Portfolio links
- [x] Responsive design

### 📋 Future Enhancements
- [ ] Export to CSV/Excel
- [ ] Analytics dashboard
- [ ] Follow-up reminders
- [ ] Email notifications
- [ ] Browser extension
- [ ] Mobile app
- [ ] Interview preparation notes
- [ ] Salary tracking
- [ ] Company research integration

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests
- Share your experience using the app

## 📄 License

MIT License - feel free to use this for your own job search!

## 🙏 Acknowledgments

- Built with React and Vite
- Powered by Supabase
- Icons by Lucide
- Styled with Tailwind CSS

## 📞 Support

For questions or issues:
- Open a GitHub issue
- Check the documentation files
- Review troubleshooting guides

## 🌟 Star This Repo

If this project helps you in your job search, please give it a star! ⭐

---

**Built with ❤️ to make job hunting less stressful**

**Repository:** https://github.com/Kikikathy/job-application-tracker