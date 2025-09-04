# Supabase Setup Instructions for AutiSync v2.0

## Prerequisites
1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project in your Supabase dashboard

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following:
   - **Project URL** (something like: `https://your-project-id.supabase.co`)
   - **Anon Public Key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)

## Step 2: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```

## Step 3: Set Up Database Tables

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `database/setup_user_profiles.sql`
4. Click **Run** to execute the SQL commands

This will create:
- `user_profiles` table with all necessary columns
- Row Level Security (RLS) policies for data protection
- Automatic timestamp updates

## Step 4: Configure Authentication

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Configure your authentication providers (Email, Google, etc.)
3. Set up email templates if needed
4. Configure redirect URLs for your application

## Step 5: Test the Connection

1. Start your development server: `npm run dev`
2. Try signing up a new user
3. Check if the user appears in the **Authentication** → **Users** section
4. Verify that a profile is created in the **Database** → **user_profiles** table

## Security Notes

- Never commit your `.env` file to version control
- The anon key is safe to use in client-side code
- RLS policies ensure users can only access their own data
- Always validate data on both client and server sides

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Ensure your `.env` file has the correct variable names
   - Restart your development server after changing environment variables

2. **Authentication errors**
   - Check if email confirmation is enabled in Supabase settings
   - Verify your redirect URLs are correctly configured

3. **Database permission errors**
   - Ensure RLS policies are properly set up
   - Check that the `user_profiles` table exists

4. **CORS errors**
   - Add your development URL to the allowed origins in Supabase settings

For more help, visit the [Supabase documentation](https://supabase.com/docs) or check the console for specific error messages.
