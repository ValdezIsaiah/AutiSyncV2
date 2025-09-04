-- AutiSync v2.0 Database Setup
-- This file contains the SQL commands to set up your Supabase database

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  age INTEGER,
  parent_email TEXT,
  birthday DATE,
  address TEXT,
  gender TEXT,
  grade TEXT,
  school TEXT,
  interests TEXT[] DEFAULT ARRAY['Drawing', 'Animals', 'Music', 'Numbers'],
  favorite_color TEXT DEFAULT '#3B82F6',
  achievements INTEGER DEFAULT 0,
  day_streak INTEGER DEFAULT 0,
  activities_done INTEGER DEFAULT 0,
  stars_earned INTEGER DEFAULT 0,
  learning_style JSONB DEFAULT '{
    "visual": true,
    "goal_oriented": true,
    "routine_loving": true,
    "step_by_step": true
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Row Level Security (RLS) policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view and edit their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
