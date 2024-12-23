/*
  # HR Performance Management Schema

  1. New Tables
    - Review Cycles (must be created first due to foreign key references)
    - Performance Goals
    - Performance Reviews
    - Team Feedback

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Review Cycles Table (Create this first since it's referenced by other tables)
CREATE TABLE IF NOT EXISTS hr_review_cycles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text CHECK (status IN ('upcoming', 'active', 'completed')),
  cycle_type text CHECK (cycle_type IN ('annual', 'quarterly', 'monthly')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Performance Goals Table
CREATE TABLE IF NOT EXISTS hr_performance_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text,
  description_ar text,
  target_date date,
  progress numeric DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status text CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  employee_id uuid REFERENCES hr_employees(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Performance Reviews Table
CREATE TABLE IF NOT EXISTS hr_performance_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES hr_employees(id),
  reviewer_id uuid REFERENCES auth.users(id),
  review_cycle_id uuid REFERENCES hr_review_cycles(id),
  rating numeric CHECK (rating >= 1 AND rating <= 5),
  feedback_en text,
  feedback_ar text,
  status text CHECK (status IN ('draft', 'submitted', 'approved')),
  review_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Team Feedback Table
CREATE TABLE IF NOT EXISTS hr_team_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES hr_employees(id),
  feedback_provider_id uuid REFERENCES auth.users(id),
  feedback_en text NOT NULL,
  feedback_ar text NOT NULL,
  category text CHECK (category IN ('collaboration', 'leadership', 'technical', 'communication')),
  rating numeric CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE hr_review_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_performance_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_performance_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_team_feedback ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view review cycles"
  ON hr_review_cycles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage review cycles they created"
  ON hr_review_cycles FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view their own goals"
  ON hr_performance_goals FOR SELECT
  TO authenticated
  USING (auth.uid() = employee_id OR auth.uid() = created_by);

CREATE POLICY "Users can manage their own goals"
  ON hr_performance_goals FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view relevant reviews"
  ON hr_performance_reviews FOR SELECT
  TO authenticated
  USING (
    auth.uid() = employee_id OR 
    auth.uid() = reviewer_id OR 
    auth.uid() = created_by
  );

CREATE POLICY "Users can manage reviews they created"
  ON hr_performance_reviews FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view relevant feedback"
  ON hr_team_feedback FOR SELECT
  TO authenticated
  USING (
    auth.uid() = employee_id OR 
    auth.uid() = feedback_provider_id OR 
    auth.uid() = created_by
  );

CREATE POLICY "Users can manage feedback they provided"
  ON hr_team_feedback FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_review_cycles_dates ON hr_review_cycles(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_performance_goals_employee ON hr_performance_goals(employee_id);
CREATE INDEX IF NOT EXISTS idx_performance_reviews_employee ON hr_performance_reviews(employee_id);
CREATE INDEX IF NOT EXISTS idx_performance_reviews_cycle ON hr_performance_reviews(review_cycle_id);
CREATE INDEX IF NOT EXISTS idx_team_feedback_employee ON hr_team_feedback(employee_id);