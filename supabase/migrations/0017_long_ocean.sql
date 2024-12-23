/*
  # Innovation System Implementation

  1. New Tables
    - `innovation_opportunities`
      - Stores innovation opportunities and ideas
      - Supports multilingual content (English/Arabic)
      - Tracks status, impact, and progress
    
    - `innovation_suggestions`
      - Manages employee suggestions and feedback
      - Includes voting and commenting features
    
    - `market_trends`
      - Tracks market trends and analysis
      - Includes growth rates and impact assessments
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    
  3. Changes
    - Add indexes for performance optimization
    - Add triggers for updated_at timestamps
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

-- Suggestions Table
CREATE TABLE IF NOT EXISTS innovation_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text NOT NULL,
  description_ar text NOT NULL,
  category text CHECK (category IN ('process', 'product', 'service', 'technology')),
  priority text CHECK (priority IN ('high', 'medium', 'low')),
  status text CHECK (status IN ('pending', 'under_review', 'approved', 'implemented', 'rejected')) DEFAULT 'pending',
  votes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Market Trends Table
CREATE TABLE IF NOT EXISTS market_trends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text NOT NULL,
  description_ar text NOT NULL,
  impact_en text NOT NULL,
  impact_ar text NOT NULL,
  growth_rate numeric NOT NULL,
  category text CHECK (category IN ('technology', 'market', 'consumer', 'industry')),
  status text CHECK (status IN ('active', 'monitoring', 'archived')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE innovation_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE innovation_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_trends ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view opportunities"
  ON innovation_opportunities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage opportunities they created"
  ON innovation_opportunities FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view suggestions"
  ON innovation_suggestions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage suggestions they created"
  ON innovation_suggestions FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view market trends"
  ON market_trends FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage market trends they created"
  ON market_trends FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_opportunities_impact ON innovation_opportunities(impact);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON innovation_opportunities(status);
CREATE INDEX IF NOT EXISTS idx_suggestions_category ON innovation_suggestions(category);
CREATE INDEX IF NOT EXISTS idx_suggestions_status ON innovation_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_market_trends_category ON market_trends(category);
CREATE INDEX IF NOT EXISTS idx_market_trends_status ON market_trends(status);

-- Add updated_at trigger
CREATE TRIGGER update_innovation_opportunities_updated_at
  BEFORE UPDATE ON innovation_opportunities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_innovation_suggestions_updated_at
  BEFORE UPDATE ON innovation_suggestions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_market_trends_updated_at
  BEFORE UPDATE ON market_trends
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();