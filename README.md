# Job Application Tracker

A comprehensive web application to track and manage your job applications with automatic email integration.

## Features

### Phase 1: Core Tracking (MVP)
- ✅ Spreadsheet-like interface for viewing all applications
- ✅ Manual entry form for job applications
- ✅ Track company, position, application date, and method
- ✅ Upload and manage documents (resumes, cover letters, etc.)
- ✅ Status tracking with dropdowns:
  - Response Status: Pending Response, Responded, No Response
  - Final Outcome: In Progress, Rejected, Successful, Withdrawn
- ✅ Search and filter applications
- ✅ Export data to CSV/Excel

### Phase 2: Email Integration
- 📧 Connect Gmail/Outlook accounts
- 📧 Automatic detection of application confirmation emails
- 📧 Auto-update response status when companies reply
- 📧 Notification system for new responses

### Phase 3: Advanced Features (Future)
- 🔍 Browser extension for one-click capture
- 📊 Analytics dashboard (success rates, response times)
- 📈 Document effectiveness tracking
- 🔔 Follow-up reminders

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Authentication + Storage)
- **Hosting**: Vercel
- **Email Integration**: Gmail API / Microsoft Graph API

## Project Structure

```
job-application-tracker/
├── src/
│   ├── components/        # React components
│   │   ├── ApplicationTable.jsx
│   │   ├── ApplicationForm.jsx
│   │   ├── StatusDropdown.jsx
│   │   └── DocumentUpload.jsx
│   ├── pages/            # Page components
│   │   ├── Dashboard.jsx
│   │   ├── AddApplication.jsx
│   │   └── Settings.jsx
│   ├── services/         # API services
│   │   ├── supabase.js
│   │   └── emailService.js
│   ├── utils/            # Utility functions
│   └── App.jsx           # Main app component
├── public/               # Static assets
├── supabase/            # Database migrations
│   └── migrations/
├── .env.example         # Environment variables template
├── package.json
└── README.md
```

## Database Schema

### Applications Table
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key)
- company_name (text)
- position_title (text)
- application_date (date)
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
- version_number (integer)
- uploaded_at (timestamp)
```

### Responses Table
```sql
- id (uuid, primary key)
- application_id (uuid, foreign key)
- response_date (timestamp)
- response_type (enum: email, phone, rejection, interview_invite)
- notes (text)
- created_at (timestamp)
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Supabase account (free tier)
- GitHub account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/job-application-tracker.git
cd job-application-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
npm run dev
```

6. Open http://localhost:5173 in your browser

## Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy!

## Development Roadmap

- [x] Project setup and planning
- [ ] Phase 1: Core tracking features (Week 1-2)
  - [ ] Set up React + Vite project
  - [ ] Configure Supabase
  - [ ] Create database schema
  - [ ] Build application table view
  - [ ] Implement add/edit forms
  - [ ] Add file upload functionality
  - [ ] Implement status dropdowns
  - [ ] Add search and filter
  - [ ] Export to CSV feature
- [ ] Phase 2: Email integration (Week 3-4)
  - [ ] Gmail API integration
  - [ ] Email scanning service
  - [ ] Auto-update response status
  - [ ] Notification system
- [ ] Phase 3: Advanced features (Week 5+)
  - [ ] Browser extension
  - [ ] Analytics dashboard
  - [ ] Follow-up reminders

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - feel free to use this for your own job search!

## Support

For questions or issues, please open a GitHub issue.

---

**Built with ❤️ to make job hunting less stressful**