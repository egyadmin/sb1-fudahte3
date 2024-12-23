-- Quality and Safety Management Tables

-- Quality Standards Table
CREATE TABLE IF NOT EXISTS quality_standards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text,
  description_ar text,
  category text CHECK (category IN ('safety', 'quality', 'compliance')),
  status text CHECK (status IN ('active', 'under_review', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Audit Records Table
CREATE TABLE IF NOT EXISTS quality_audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  findings_en text,
  findings_ar text,
  audit_date date NOT NULL,
  status text CHECK (status IN ('pending', 'completed', 'action_required')),
  score numeric CHECK (score >= 0 AND score <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Safety Guidelines Table
CREATE TABLE IF NOT EXISTS safety_guidelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  content_en text NOT NULL,
  content_ar text NOT NULL,
  category text CHECK (category IN ('general', 'emergency', 'workplace')),
  priority text CHECK (priority IN ('high', 'medium', 'low')),
  effective_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Emergency Protocols Table
CREATE TABLE IF NOT EXISTS emergency_protocols (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  procedure_en text NOT NULL,
  procedure_ar text NOT NULL,
  emergency_type text CHECK (emergency_type IN ('fire', 'medical', 'security', 'environmental')),
  priority text CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  last_updated date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE quality_standards ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_protocols ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view quality standards"
  ON quality_standards FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage quality standards they created"
  ON quality_standards FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view quality audits"
  ON quality_audits FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage quality audits they created"
  ON quality_audits FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view safety guidelines"
  ON safety_guidelines FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage safety guidelines they created"
  ON safety_guidelines FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view emergency protocols"
  ON emergency_protocols FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage emergency protocols they created"
  ON emergency_protocols FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_quality_standards_category ON quality_standards(category);
CREATE INDEX IF NOT EXISTS idx_quality_audits_date ON quality_audits(audit_date);
CREATE INDEX IF NOT EXISTS idx_safety_guidelines_category ON safety_guidelines(category);
CREATE INDEX IF NOT EXISTS idx_emergency_protocols_type ON emergency_protocols(emergency_type);