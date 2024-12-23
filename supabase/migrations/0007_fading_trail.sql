/*
  # HR System Extensions
  
  1. New Columns
    - Applications tracking enhancements
    - Interview feedback improvements
    - Policy document management extensions
  
  2. Indexes
    - Performance optimization for common queries
    
  3. Functions
    - Application stage tracking
    - Automated status updates
*/

-- Add missing columns to existing tables
ALTER TABLE hr_applications 
ADD COLUMN IF NOT EXISTS feedback_summary text,
ADD COLUMN IF NOT EXISTS interview_date timestamptz,
ADD COLUMN IF NOT EXISTS time_to_hire interval;

ALTER TABLE hr_interview_feedback 
ADD COLUMN IF NOT EXISTS interview_date timestamptz,
ADD COLUMN IF NOT EXISTS interview_type text CHECK (interview_type IN ('technical', 'hr', 'cultural', 'final'));

ALTER TABLE hr_policy_documents 
ADD COLUMN IF NOT EXISTS last_reviewed_at timestamptz,
ADD COLUMN IF NOT EXISTS review_cycle interval;

-- Add new indexes for performance
CREATE INDEX IF NOT EXISTS idx_applications_status ON hr_applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_stage ON hr_applications(stage);
CREATE INDEX IF NOT EXISTS idx_interview_feedback_date ON hr_interview_feedback(interview_date);
CREATE INDEX IF NOT EXISTS idx_policy_documents_status ON hr_policy_documents(status);

-- Add constraints for data integrity
ALTER TABLE hr_applications 
ADD CONSTRAINT valid_stage_transition 
CHECK (
  (status = 'new' AND stage = 'initial') OR
  (status = 'screening' AND stage IN ('initial', 'technical')) OR
  (status = 'interview' AND stage IN ('technical', 'final')) OR
  (status IN ('offer', 'hired', 'rejected') AND stage = 'complete')
);

-- Add functions for common operations
CREATE OR REPLACE FUNCTION update_application_stage()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stage != OLD.stage THEN
    NEW.updated_at = CURRENT_TIMESTAMP;
    -- Calculate time spent in previous stage
    NEW.time_to_hire = COALESCE(NEW.time_to_hire, '0'::interval) + (CURRENT_TIMESTAMP - OLD.updated_at);
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for automation
DROP TRIGGER IF EXISTS update_application_stage_trigger ON hr_applications;
CREATE TRIGGER update_application_stage_trigger
  BEFORE UPDATE OF stage ON hr_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_application_stage();

-- Add views for reporting
CREATE OR REPLACE VIEW hr_application_metrics AS
SELECT 
  job_posting_id,
  status,
  stage,
  COUNT(*) as count,
  AVG(EXTRACT(EPOCH FROM time_to_hire)/86400)::numeric(10,2) as avg_days_to_hire
FROM hr_applications
GROUP BY job_posting_id, status, stage;