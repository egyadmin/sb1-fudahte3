-- Job Postings Table
CREATE TABLE IF NOT EXISTS hr_job_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text NOT NULL,
  description_ar text NOT NULL,
  requirements_en text,
  requirements_ar text,
  department_id uuid REFERENCES hr_departments(id),
  position_id uuid REFERENCES hr_positions(id),
  status text CHECK (status IN ('draft', 'published', 'closed', 'cancelled')) DEFAULT 'draft',
  applications_count integer DEFAULT 0,
  start_date date NOT NULL,
  end_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Applications Table
CREATE TABLE IF NOT EXISTS hr_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_posting_id uuid REFERENCES hr_job_postings(id),
  candidate_name text NOT NULL,
  email text NOT NULL,
  phone text,
  resume_url text,
  cover_letter text,
  status text CHECK (status IN ('new', 'screening', 'interview', 'offer', 'hired', 'rejected')) DEFAULT 'new',
  stage text CHECK (stage IN ('initial', 'technical', 'final', 'complete')) DEFAULT 'initial',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Interview Feedback Table
CREATE TABLE IF NOT EXISTS hr_interview_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES hr_applications(id),
  interviewer_id uuid REFERENCES auth.users(id),
  stage text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  feedback_en text NOT NULL,
  feedback_ar text NOT NULL,
  recommendation text CHECK (recommendation IN ('hire', 'reject', 'next_round')),
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Policy Documents Table
CREATE TABLE IF NOT EXISTS hr_policy_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  content_en text NOT NULL,
  content_ar text NOT NULL,
  category text CHECK (category IN ('general', 'hr', 'finance', 'it', 'compliance')),
  version text NOT NULL,
  status text CHECK (status IN ('draft', 'active', 'archived')) DEFAULT 'draft',
  effective_date date NOT NULL,
  expiry_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE hr_job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_interview_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_policy_documents ENABLE ROW LEVEL SECURITY;

-- Create Policies with safety checks
DO $$ 
BEGIN
  -- Job Postings Policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hr_job_postings' 
    AND policyname = 'Users can view published job postings'
  ) THEN
    CREATE POLICY "Users can view published job postings"
      ON hr_job_postings FOR SELECT
      TO authenticated
      USING (status = 'published' OR auth.uid() = created_by);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hr_job_postings' 
    AND policyname = 'Users can manage their job postings'
  ) THEN
    CREATE POLICY "Users can manage their job postings"
      ON hr_job_postings FOR ALL
      TO authenticated
      USING (auth.uid() = created_by)
      WITH CHECK (auth.uid() = created_by);
  END IF;

  -- Applications Policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hr_applications' 
    AND policyname = 'Users can view relevant applications'
  ) THEN
    CREATE POLICY "Users can view relevant applications"
      ON hr_applications FOR SELECT
      TO authenticated
      USING (auth.uid() = created_by OR auth.uid() IN (
        SELECT created_by FROM hr_job_postings WHERE id = job_posting_id
      ));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hr_applications' 
    AND policyname = 'Users can manage their applications'
  ) THEN
    CREATE POLICY "Users can manage their applications"
      ON hr_applications FOR ALL
      TO authenticated
      USING (auth.uid() = created_by)
      WITH CHECK (auth.uid() = created_by);
  END IF;

  -- Interview Feedback Policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hr_interview_feedback' 
    AND policyname = 'Users can view relevant interview feedback'
  ) THEN
    CREATE POLICY "Users can view relevant interview feedback"
      ON hr_interview_feedback FOR SELECT
      TO authenticated
      USING (
        auth.uid() = interviewer_id OR 
        auth.uid() = created_by OR 
        auth.uid() IN (
          SELECT created_by FROM hr_applications WHERE id = application_id
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hr_interview_feedback' 
    AND policyname = 'Users can manage their interview feedback'
  ) THEN
    CREATE POLICY "Users can manage their interview feedback"
      ON hr_interview_feedback FOR ALL
      TO authenticated
      USING (auth.uid() = created_by)
      WITH CHECK (auth.uid() = created_by);
  END IF;

  -- Policy Documents Policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hr_policy_documents' 
    AND policyname = 'Users can view active policy documents'
  ) THEN
    CREATE POLICY "Users can view active policy documents"
      ON hr_policy_documents FOR SELECT
      TO authenticated
      USING (status = 'active' OR auth.uid() = created_by);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hr_policy_documents' 
    AND policyname = 'Users can manage policy documents'
  ) THEN
    CREATE POLICY "Users can manage policy documents"
      ON hr_policy_documents FOR ALL
      TO authenticated
      USING (auth.uid() = created_by)
      WITH CHECK (auth.uid() = created_by);
  END IF;
END $$;

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_job_postings_department ON hr_job_postings(department_id);
CREATE INDEX IF NOT EXISTS idx_job_postings_position ON hr_job_postings(position_id);
CREATE INDEX IF NOT EXISTS idx_applications_job ON hr_applications(job_posting_id);
CREATE INDEX IF NOT EXISTS idx_interview_feedback_application ON hr_interview_feedback(application_id);
CREATE INDEX IF NOT EXISTS idx_policy_category ON hr_policy_documents(category);

-- Add Updated At Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers with safety checks
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_hr_job_postings_updated_at'
  ) THEN
    CREATE TRIGGER update_hr_job_postings_updated_at
      BEFORE UPDATE ON hr_job_postings
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_hr_applications_updated_at'
  ) THEN
    CREATE TRIGGER update_hr_applications_updated_at
      BEFORE UPDATE ON hr_applications
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_hr_policy_documents_updated_at'
  ) THEN
    CREATE TRIGGER update_hr_policy_documents_updated_at
      BEFORE UPDATE ON hr_policy_documents
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;