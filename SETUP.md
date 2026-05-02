# Setup Instructions for Job Application Tracker

## Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Supabase account (free tier)

## Step 1: Connect to GitHub

### Create a new repository on GitHub:
1. Go to https://github.com/new
2. Repository name: `job-application-tracker`
3. Description: "A comprehensive web application to track and manage job applications"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Connect your local repository to GitHub:
```bash
cd job-application-tracker
git remote add origin https://github.com/YOUR_USERNAME/job-application-tracker.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 2: Set Up Supabase

### Create a Supabase Project:
1. Go to https://supabase.com
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - Name: `job-application-tracker`
   - Database Password: (create a strong password and save it)
   - Region: Choose closest to you
5. Click "Create new project" (takes ~2 minutes)

### Set Up Database:
1. In your Supabase project, go to "SQL Editor"
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL editor
5. Click "Run" to execute the schema

### Get API Credentials:
1. Go to Project Settings (gear icon) → API
2. Copy these values:
   - Project URL
   - anon/public key

### Configure Environment Variables:
1. In the project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run the Development Server

```bash
npm run dev
```

The application will open at http://localhost:5173

## Step 5: Create Your Account

1. Click "Sign Up"
2. Enter your email and password
3. Check your email for confirmation link
4. Click the confirmation link
5. Sign in to start tracking applications!

## Step 6: Deploy to Vercel (Optional)

### Deploy your application:
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your `job-application-tracker` repository
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy"

Your app will be live at `https://your-app-name.vercel.app`

## Troubleshooting

### "Missing Supabase environment variables" error:
- Make sure you created the `.env` file
- Check that the values are correct (no quotes needed)
- Restart the dev server after adding environment variables

### Database errors:
- Verify the schema was executed successfully in Supabase
- Check that Row Level Security policies are enabled
- Make sure you're signed in

### Authentication issues:
- Check your email for confirmation link
- Verify email confirmation in Supabase Dashboard → Authentication → Users
- Try password reset if needed

## Next Steps

Once everything is set up:
1. ✅ Create your account
2. ✅ Add your first job application
3. ✅ Upload documents (resume, cover letter)
4. ✅ Track application status
5. ✅ Update outcomes as you hear back

## Phase 2: Email Integration (Coming Soon)
- Gmail API integration for automatic tracking
- Email scanning for application confirmations
- Response detection and status updates

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure Supabase database schema is properly set up
4. Check that you're using Node.js 18+

## Security Notes

- Never commit your `.env` file to Git
- Keep your Supabase credentials private
- Use strong passwords for your account
- Enable 2FA on GitHub and Supabase accounts