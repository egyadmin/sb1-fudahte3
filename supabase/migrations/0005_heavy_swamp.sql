/*
  # HR Management Schema

  1. New Tables
    - `hr_employees`
      - Basic employee information
      - Contact details
      - Department and position
    - `hr_departments`
      - Department information
    - `hr_positions`
      - Job positions/titles
    - `hr_recruitment`
      - Recruitment pipeline tracking
    - `hr_policies`
      - HR policy documents

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Departments Table
CREATE TABLE IF NOT EXISTS hr_departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_ar text NOT NULL,
  description_en text,
  description_ar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Positions Table
CREATE TABLE IF NOT EXISTS hr_positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  department_id uuid REFERENCES hr_departments(id),
  requirements_en text,
  requirements_ar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Employees Table
CREATE TABLE IF NOT EXISTS hr_employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_ar text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  position_id uuid REFERENCES hr_positions(id),
  department_id uuid REFERENCES hr_departments(id),
  hire_date date NOT NULL,
  status text CHECK (status IN ('active', 'on_leave', 'terminated')),
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Recruitment Table
CREATE TABLE IF NOT EXISTS hr_recruitment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position_id uuid REFERENCES hr_positions(id),
  status text CHECK (status IN ('open', 'in_progress', 'closed')),
  applicants_count integer DEFAULT 0,
  start_date date NOT NULL,
  end_date date,
  requirements_en text,
  requirements_ar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Policies Table
CREATE TABLE IF NOT EXISTS hr_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  content_en text NOT NULL,
  content_ar text NOT NULL,
  category text CHECK (category IN ('general', 'leave', 'conduct', 'benefits')),
  effective_date date NOT NULL,
  version text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE hr_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_recruitment ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_policies ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can read hr_departments"
  ON hr_departments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert hr_departments"
  ON hr_departments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read hr_positions"
  ON hr_positions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert hr_positions"
  ON hr_positions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read hr_employees"
  ON hr_employees FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert hr_employees"
  ON hr_employees FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read hr_recruitment"
  ON hr_recruitment FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert hr_recruitment"
  ON hr_recruitment FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read hr_policies"
  ON hr_policies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert hr_policies"
  ON hr_policies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_hr_employees_department ON hr_employees(department_id);
CREATE INDEX IF NOT EXISTS idx_hr_employees_position ON hr_employees(position_id);
CREATE INDEX IF NOT EXISTS idx_hr_positions_department ON hr_positions(department_id);
CREATE INDEX IF NOT EXISTS idx_hr_recruitment_position ON hr_recruitment(position_id);