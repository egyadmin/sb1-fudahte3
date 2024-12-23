/*
  # Reports Management System

  1. New Tables
    - `reports` - Main reports table with bilingual support
      - id (uuid, primary key)
      - title_en, title_ar (text)
      - type_en, type_ar (text) 
      - content_en, content_ar (text)
      - start_date, end_date (date)
      - department (text)
      - status (text)
      - created_at, updated_at (timestamptz)
      - created_by (uuid)

  2. Security
    - Enable RLS
    - Policies for authenticated users
    - Proper indexes for performance

  3. Changes
    - Creates reports table if not exists
    - Adds RLS policies with proper checks
    - Adds performance indexes
*/

-- Create Reports Table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'reports') THEN
    CREATE TABLE reports (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title_en text NOT NULL,
      title_ar text NOT NULL,
      type_en text NOT NULL,
      type_ar text NOT NULL,
      content_en text,
      content_ar text,
      start_date date NOT NULL,
      end_date date NOT NULL,
      department text CHECK (department IN ('general', 'hr', 'finance', 'operations', 'quality')),
      status text CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now(),
      created_by uuid REFERENCES auth.users(id)
    );

    -- Enable RLS
    ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

    -- Create indexes
    CREATE INDEX IF NOT EXISTS idx_reports_department ON reports(department);
    CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
    CREATE INDEX IF NOT EXISTS idx_reports_dates ON reports(start_date, end_date);

    -- Add updated_at trigger
    CREATE TRIGGER update_reports_updated_at
      BEFORE UPDATE ON reports
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Safely create policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can view reports" ON reports;
  DROP POLICY IF EXISTS "Users can insert their own reports" ON reports;
  DROP POLICY IF EXISTS "Users can update their own reports" ON reports;
  DROP POLICY IF EXISTS "Users can delete their own reports" ON reports;

  -- Create new policies
  CREATE POLICY "Users can view reports"
    ON reports FOR SELECT
    TO authenticated
    USING (true);

  CREATE POLICY "Users can insert their own reports"
    ON reports FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

  CREATE POLICY "Users can update their own reports"
    ON reports FOR UPDATE
    TO authenticated
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

  CREATE POLICY "Users can delete their own reports"
    ON reports FOR DELETE
    TO authenticated
    USING (auth.uid() = created_by);
END $$;