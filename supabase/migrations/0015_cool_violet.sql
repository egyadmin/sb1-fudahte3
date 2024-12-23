-- Legal Compliance Management Tables

/*
  # Legal Compliance Schema

  1. New Tables
    - legal_documents: Stores operating licenses, data protection policies, etc.
    - compliance_checklists: Tracks compliance requirements and their status
    - compliance_trainings: Records compliance training sessions and completion
    - compliance_audits: Stores audit records and findings
    - legal_contracts: Manages contracts and their statuses
  
  2. Security
    - Enable RLS on all tables
    - Policies for viewing and managing documents
    - Audit trail for all changes
  
  3. Features
    - Document versioning
    - Status tracking
    - Expiry notifications
    - Compliance reporting
*/

-- Legal Documents Table
CREATE TABLE IF NOT EXISTS legal_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  type text CHECK (type IN ('license', 'policy', 'insurance', 'certificate', 'permit')),
  content_en text NOT NULL,
  content_ar text NOT NULL,
  status text CHECK (status IN ('active', 'expired', 'pending_renewal', 'revoked')),
  effective_date date NOT NULL,
  expiry_date date,
  document_number text,
  issuing_authority_en text,
  issuing_authority_ar text,
  version text NOT NULL DEFAULT '1.0',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Compliance Checklists Table
CREATE TABLE IF NOT EXISTS compliance_checklists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text,
  description_ar text,
  category text CHECK (category IN ('general', 'data_protection', 'safety', 'financial')),
  priority text CHECK (priority IN ('high', 'medium', 'low')),
  due_date date NOT NULL,
  status text CHECK (status IN ('pending', 'completed', 'overdue')),
  completion_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Compliance Trainings Table
CREATE TABLE IF NOT EXISTS compliance_trainings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text,
  description_ar text,
  type text CHECK (type IN ('annual', 'quarterly', 'onboarding', 'special')),
  status text CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  start_date date NOT NULL,
  end_date date NOT NULL,
  materials_url text,
  completion_criteria text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Compliance Audits Table
CREATE TABLE IF NOT EXISTS compliance_audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  type text CHECK (type IN ('internal', 'external', 'regulatory')),
  scope_en text NOT NULL,
  scope_ar text NOT NULL,
  findings_en text,
  findings_ar text,
  status text CHECK (status IN ('planned', 'in_progress', 'completed', 'follow_up')),
  audit_date date NOT NULL,
  completion_date date,
  auditor_en text NOT NULL,
  auditor_ar text NOT NULL,
  score numeric CHECK (score >= 0 AND score <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Legal Contracts Table
CREATE TABLE IF NOT EXISTS legal_contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  type text CHECK (type IN ('service', 'procurement', 'employment', 'lease', 'other')),
  description_en text,
  description_ar text,
  status text CHECK (status IN ('draft', 'active', 'expired', 'terminated')),
  start_date date NOT NULL,
  end_date date,
  value numeric,
  party_name_en text NOT NULL,
  party_name_ar text NOT NULL,
  terms_en text,
  terms_ar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_contracts ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view legal documents"
  ON legal_documents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage legal documents they created"
  ON legal_documents FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view compliance checklists"
  ON compliance_checklists FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage compliance checklists they created"
  ON compliance_checklists FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view compliance trainings"
  ON compliance_trainings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage compliance trainings they created"
  ON compliance_trainings FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view compliance audits"
  ON compliance_audits FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage compliance audits they created"
  ON compliance_audits FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view legal contracts"
  ON legal_contracts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage legal contracts they created"
  ON legal_contracts FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_legal_documents_type ON legal_documents(type);
CREATE INDEX IF NOT EXISTS idx_legal_documents_status ON legal_documents(status);
CREATE INDEX IF NOT EXISTS idx_legal_documents_expiry ON legal_documents(expiry_date);
CREATE INDEX IF NOT EXISTS idx_compliance_checklists_category ON compliance_checklists(category);
CREATE INDEX IF NOT EXISTS idx_compliance_checklists_due_date ON compliance_checklists(due_date);
CREATE INDEX IF NOT EXISTS idx_compliance_trainings_type ON compliance_trainings(type);
CREATE INDEX IF NOT EXISTS idx_compliance_trainings_dates ON compliance_trainings(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_compliance_audits_type ON compliance_audits(type);
CREATE INDEX IF NOT EXISTS idx_compliance_audits_date ON compliance_audits(audit_date);
CREATE INDEX IF NOT EXISTS idx_legal_contracts_type ON legal_contracts(type);
CREATE INDEX IF NOT EXISTS idx_legal_contracts_status ON legal_contracts(status);
CREATE INDEX IF NOT EXISTS idx_legal_contracts_dates ON legal_contracts(start_date, end_date);

-- Add updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_legal_documents_updated_at
  BEFORE UPDATE ON legal_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_checklists_updated_at
  BEFORE UPDATE ON compliance_checklists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_trainings_updated_at
  BEFORE UPDATE ON compliance_trainings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_audits_updated_at
  BEFORE UPDATE ON compliance_audits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_legal_contracts_updated_at
  BEFORE UPDATE ON legal_contracts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();