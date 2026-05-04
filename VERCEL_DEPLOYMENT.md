# Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Supabase project already set up with the schema

## Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
cd job-application-tracker
git init
git add .
git commit -m "Initial commit - Job Application Tracker"
```

2. Create a new repository on GitHub (https://github.com/new)

3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   Click "Environment Variables" and add:
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon/public key

6. Click "Deploy"

### Option B: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd job-application-tracker
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? (default or custom name)
   - In which directory is your code located? **.**
   - Want to override settings? **N**

5. Add environment variables:
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

6. Redeploy with environment variables:
```bash
vercel --prod
```

## Step 3: Configure Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Vercel deployment URL to:
   - **Site URL**: `https://job-application-tracker-two-xi.vercel.app`
   - **Redirect URLs**: `https://job-application-tracker-two-xi.vercel.app/**`

## Step 4: Test Your Deployment

1. Visit your Vercel deployment URL
2. Test the following:
   - ✅ Sign up / Sign in functionality
   - ✅ Add new application
   - ✅ Edit application
   - ✅ Upload documents
   - ✅ Update statuses
   - ✅ Delete application

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Update Supabase redirect URLs with your custom domain

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### Authentication Issues
- Verify Supabase URL and keys are correct
- Check that Vercel URL is added to Supabase redirect URLs
- Clear browser cache and cookies

### 404 Errors on Refresh
- The `vercel.json` file should handle this with rewrites
- If issues persist, check that `vercel.json` is in the root directory

### Environment Variables Not Working
- Ensure variables start with `VITE_` prefix
- Redeploy after adding/changing environment variables
- Check that variables are set for the correct environment (Production/Preview)

## Monitoring

- View deployment logs in Vercel dashboard
- Check analytics and performance metrics
- Set up error tracking (optional): Sentry, LogRocket, etc.

## Updates and Maintenance

To deploy updates:
1. Make changes locally
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Description of changes"
git push
```
3. Vercel automatically deploys the changes

## Security Notes

- Never commit `.env` file to GitHub
- Keep Supabase keys secure
- Use environment variables for all sensitive data
- Enable RLS (Row Level Security) in Supabase
- Regularly update dependencies

## Support

- Vercel Documentation: https://vercel.com/docs
- Supabase Documentation: https://supabase.com/docs
- GitHub Issues: Create issues in your repository

---

**Deployment Status**: Ready for production ✅
**Last Updated**: 2026-05-03