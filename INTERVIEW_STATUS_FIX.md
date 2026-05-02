# Interview Status Database Migration

## Issue
The "interview" option in the Response Status dropdown returns an error because the database enum doesn't include this value yet.

## Solution
Run this SQL migration in your Supabase SQL Editor:

```sql
ALTER TYPE response_status ADD VALUE IF NOT EXISTS 'interview';
```

## Steps to Fix:

1. Go to your Supabase project: https://supabase.com/dashboard/project/vxudxyzzaziqvgjtteay
2. Navigate to **SQL Editor**
3. Click "New Query"
4. Copy and paste the SQL above
5. Click **"Run"**
6. You should see: "Success. No rows returned"
7. Restart your development server

## After Migration:

The interview status will work correctly:
- ✅ Appears in all dropdowns
- ✅ Shows in stats dashboard with blue icon
- ✅ Can be selected and saved
- ✅ Filters work properly

## Alternative: Fresh Database Setup

If you prefer to start fresh with all enum values:

1. Drop and recreate the enum:
```sql
-- Drop existing enum (this will fail if tables use it)
DROP TYPE IF EXISTS response_status CASCADE;

-- Recreate with all values
CREATE TYPE response_status AS ENUM ('pending', 'responded', 'interview', 'no_response');

-- Recreate applications table (simplified - see schema.sql for full version)
ALTER TABLE applications 
  ALTER COLUMN response_status TYPE response_status 
  USING response_status::text::response_status;
```

2. Or simply run the full schema.sql again with the updated enum definition

## Verification:

After running the migration, test:
1. Create a new application
2. Select "Interview" from Response Status
3. Save - should work without errors
4. Check stats dashboard - interview count should update

Made with Bob