-- Create categories table for organizing learning activities
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(10) DEFAULT '📚', -- Emoji icon for the category
    color VARCHAR(50) DEFAULT 'from-blue-400 to-blue-600', -- Tailwind gradient classes
    display_order INTEGER DEFAULT 0, -- Order for displaying categories
    is_active BOOLEAN DEFAULT true, -- Whether category is active/visible
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_categories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at (drop if exists first)
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_categories_updated_at();

-- Create Row Level Security (RLS) policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Only admins can manage categories" ON categories;

-- Policy: Categories are viewable by everyone (both authenticated and anonymous users)
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

-- Policy: Only authenticated users can manage categories (for now, later we can restrict to admin role)
CREATE POLICY "Only authenticated users can manage categories" ON categories
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert default categories
INSERT INTO categories (name, description, icon, color, display_order, is_active) VALUES
('Academic', 'Educational activities and school subjects like math, reading, and science', '📚', 'from-blue-400 to-blue-600', 1, true),
('Social/Daily Life', 'Social skills and daily living activities for independence', '👥', 'from-green-400 to-green-600', 2, true),
('Objects', 'Object recognition and identification activities', '🧩', 'from-purple-400 to-purple-600', 3, true),
('Creative', 'Art, music, and creative expression activities', '🎨', 'from-pink-400 to-pink-600', 4, true),
('Communication', 'Language and communication skill development', '💬', 'from-indigo-400 to-indigo-600', 5, true),
('Physical', 'Motor skills and physical activity exercises', '⚽', 'from-orange-400 to-orange-600', 6, true)
ON CONFLICT (name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);
CREATE INDEX IF NOT EXISTS idx_categories_created_at ON categories(created_at);

-- Add foreign key constraint to activities table (if it exists)
-- This will ensure referential integrity between activities and categories
DO $$
BEGIN
    -- Check if activities table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'activities') THEN
        -- Add category_id column if it doesn't exist
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'activities' AND column_name = 'category_id') THEN
            ALTER TABLE activities ADD COLUMN category_id INTEGER REFERENCES categories(id);
            
            -- Update existing activities to link with categories based on category name
            UPDATE activities SET category_id = (
                SELECT id FROM categories WHERE categories.name = activities.category
            ) WHERE category IS NOT NULL;
            
            -- Create index on category_id
            CREATE INDEX IF NOT EXISTS idx_activities_category_id ON activities(category_id);
        END IF;
    END IF;
END $$;

-- Function to get category statistics
CREATE OR REPLACE FUNCTION get_category_stats()
RETURNS TABLE (
    category_id INTEGER,
    category_name VARCHAR(100),
    activity_count BIGINT,
    active_activity_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id as category_id,
        c.name as category_name,
        COALESCE(COUNT(a.id), 0) as activity_count,
        COALESCE(COUNT(a.id) FILTER (WHERE a.is_active = true), 0) as active_activity_count
    FROM categories c
    LEFT JOIN activities a ON c.id = a.category_id
    WHERE c.is_active = true
    GROUP BY c.id, c.name
    ORDER BY c.display_order;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT SELECT ON categories TO anon, authenticated;
GRANT ALL ON categories TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE categories_id_seq TO authenticated;
