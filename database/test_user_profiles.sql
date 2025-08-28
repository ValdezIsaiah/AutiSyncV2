-- Test script to check if the user_profiles table exists and is working
-- Run this in your Supabase SQL editor

-- 1. Check if the table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'user_profiles'
);

-- 2. Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'user_profiles'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'user_profiles';

-- 4. Test inserting a sample record (replace with your actual user ID)
-- You can get your user ID from the auth.users table first:
SELECT id, email FROM auth.users LIMIT 5;

-- Then test insert (uncomment and replace the UUID):
-- INSERT INTO user_profiles (
--     id, 
--     username, 
--     first_name, 
--     last_name, 
--     email,
--     interests,
--     favorite_color
-- ) VALUES (
--     'your-user-id-here',
--     'Test User',
--     'Test',
--     'User', 
--     'test@example.com',
--     ARRAY['Drawing', 'Music'],
--     '#3B82F6'
-- );

-- 5. Check if RLS is working by trying to select
-- SELECT * FROM user_profiles;
