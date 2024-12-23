/*
  # Innovation Opportunities Schema

  1. New Tables
    - `innovation_opportunities`
      - `id` (uuid, primary key)
      - `title_en` (text, required)
      - `title_ar` (text, required) 
      - `description_en` (text, required)
      - `description_ar` (text, required)
      - `impact` (enum: high, medium, low)
      - Various optional fields for benefits, resources, costs
      - Status tracking and progress fields
      - Standard audit fields (created_at, updated_at, created_by)

  2. Security
    - Enable RLS
    - Add policies for viewing and managing opportunities
    
  3. Performance
    - Add indexes for frequently queried fields
*/

-- Opportunities Table
CREATE TABLE IF NOT EXISTS innovation_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text NOT NULL,
  description_ar text NOT NULL,
  impact text CHECK (impact IN ('high', 'medium', 'low')),
  expected_benefits_en text,
  expected_benefits_ar text,
  resources_required text,
  estimated_cost numeric,
  target_date date,
  status text CHECK (status IN ('draft', 'under_review', 'approved', 'in_progress', 'completed', 'cancelled')) DEFAULT 'draft',
  progress numeric DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE innovation_opportunities ENABLE ROW LEVEL SECURITY;

-- Safely manage policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can view opportunities" ON innovation_opportunities;
  DROP POLICY IF EXISTS "Users can manage their opportunities" ON innovation_opportunities;

  -- Create new policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'innovation_opportunities' 
    AND policyname = 'Users can view opportunities'
  ) THEN
    CREATE POLICY "Users can view opportunities"
      ON innovation_opportunities FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'innovation_opportunities' 
    AND policyname = 'Users can manage their opportunities'
  ) THEN
    CREATE POLICY "Users can manage their opportunities"
      ON innovation_opportunities FOR ALL
      TO authenticated
      USING (auth.uid() = created_by)
      WITH CHECK (auth.uid() = created_by);
  END IF;
END $$;

-- Create Indexes (these are idempotent)
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON innovation_opportunities(status);
CREATE INDEX IF NOT EXISTS idx_opportunities_impact ON innovation_opportunities(impact);