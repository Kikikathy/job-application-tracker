# Regional Job Sites Support Guide

## Overview

The Job Application Tracker extension now works on **ANY website**, including regional and local job boards! It's no longer limited to international sites like LinkedIn, Indeed, or Glassdoor.

## Supported Regional Job Boards

### African Job Boards
- ✅ **BrighterMonday** (Kenya, Uganda, Tanzania, etc.)
- ✅ **Fuzu** (East Africa)
- ✅ **MyJobMag** (Nigeria)
- ✅ **Jobberman** (Nigeria, Ghana, Kenya)
- ✅ **Careers24** (South Africa)
- ✅ **PNet** (South Africa)

### How It Works on Any Site

The extension now uses **intelligent detection** to identify job postings on any website:

#### 1. URL Detection
Looks for job-related keywords in the URL:
- `/job`, `/jobs`
- `/career`, `/careers`
- `/apply`
- `/position`, `/positions`
- `/opening`, `/openings`
- `/vacancy`, `/vacancies`
- `/opportunities`

#### 2. Content Detection
Analyzes page content for job-related text:
- "Apply now" or "Apply for" buttons
- "Job description" sections
- "Responsibilities" or "Requirements" sections
- "Qualifications" information

#### 3. Heading Detection
Checks page headings (h1, h2, h3) for job-related terms:
- Job, Position, Role
- Vacancy, Career, Opportunity

## How to Use on Regional Sites

### Example: BrighterMonday Kenya

1. **Visit BrighterMonday** (www.brightermonday.co.ke)
2. **Search for jobs** in your field
3. **Click on a job posting** (not the search results page)
4. **Wait 1-2 seconds** for the extension to detect the job
5. **Look for the purple badge** in the top-right corner
6. **Click "Track This Job"** to save it

### What Gets Extracted

The extension automatically extracts:
- ✅ **Company Name** - From company fields or page title
- ✅ **Position Title** - From job title or main heading
- ✅ **Job URL** - Current page URL
- ✅ **Application Method** - Platform name (e.g., "BrighterMonday")
- ✅ **Application Date** - Today's date
- ✅ **Job Description** - First 500 characters

## Troubleshooting

### Badge Not Appearing?

#### Check 1: Are you on a job detail page?
- ❌ Search results page - Badge won't appear
- ❌ Browse/category page - Badge won't appear
- ✅ Individual job posting - Badge should appear

#### Check 2: Does the page have job content?
The page should contain:
- Job title/position name
- Company name
- Job description or requirements
- Apply button or application instructions

#### Check 3: Reload the extension
1. Go to `chrome://extensions/`
2. Find "Job Application Tracker"
3. Click the refresh icon 🔄
4. Go back to the job page and refresh

#### Check 4: Check console logs
1. Press F12 to open Developer Tools
2. Go to Console tab
3. Look for messages starting with `🎯 Job Tracker:`
4. Should see:
   ```
   🎯 Job Tracker: Is job page? true
   🎯 Job Tracker: Company name: [Company]
   🎯 Job Tracker: Position title: [Title]
   🎯 Job Tracker: Badge added to page
   ```

### Data Not Extracting Correctly?

If the company name or position title is wrong:

1. **Check the page structure** - Some sites use non-standard HTML
2. **Manually edit** - You can edit the data in the tracker form
3. **Report the site** - Let us know which site isn't working well

## Platform Detection

The extension automatically detects the platform name:

### Known Platforms
- LinkedIn, Indeed, Glassdoor, Monster, ZipRecruiter
- Greenhouse, Lever, Workday, SmartRecruiters, iCIMS
- BrighterMonday, Fuzu, MyJobMag, Jobberman, Careers24, PNet

### Unknown Platforms
For sites not in the list, the extension extracts the domain name:
- `www.example-jobs.com` → "Example-jobs"
- `careers.company.com` → "Careers"

You can always edit this in the tracker form!

## Best Practices

### ✅ Do's
- Use on individual job posting pages
- Wait for the page to fully load before expecting the badge
- Check console logs if something isn't working
- Edit extracted data if needed before saving

### ❌ Don'ts
- Don't expect the badge on search results pages
- Don't expect the badge on company homepages
- Don't expect the badge on job board category pages

## Examples of Supported Pages

### ✅ Will Work
- `brightermonday.co.ke/jobs/software-engineer-123456`
- `company.com/careers/senior-developer`
- `jobsite.com/job/marketing-manager`
- `careers.startup.com/positions/data-analyst`

### ❌ Won't Work
- `brightermonday.co.ke/jobs` (search results)
- `company.com/careers` (careers homepage)
- `jobsite.com/browse/marketing` (category page)
- `company.com` (company homepage)

## Need Help?

If the extension isn't working on a specific regional job site:

1. **Check the console** for error messages
2. **Verify it's a job detail page** (not search results)
3. **Try reloading** the extension
4. **Share the URL** and console logs for debugging

## Future Improvements

We're continuously improving the extension to work better on more sites. If you find a regional job board that doesn't work well, please let us know!

---

**Note**: The extension now works on ALL websites, so you can track jobs from any source - company career pages, regional job boards, or international platforms!