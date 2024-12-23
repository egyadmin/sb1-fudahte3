/*
  # Sample Legal Data Migration

  1. New Data
    - Legal documents (Operating License, Privacy Policy)
    - Compliance checklists

  2. Security
    - Safe inserts with existence checks
    - Maintains RLS policies
*/

DO $$ 
BEGIN
  -- Insert legal documents if they don't exist
  IF NOT EXISTS (SELECT 1 FROM legal_documents WHERE title_en = 'Operating License') THEN
    INSERT INTO legal_documents (title_en, title_ar, type, content_en, content_ar, status, effective_date) VALUES
    ('Operating License', 'رخصة التشغيل', 'license', 'Operating license content', 'محتوى رخصة التشغيل', 'active', CURRENT_DATE),
    ('Privacy Policy', 'سياسة الخصوصية', 'policy', 'Privacy policy content', 'محتوى سياسة الخصوصية', 'active', CURRENT_DATE);
  END IF;

  -- Insert compliance checklists
  IF NOT EXISTS (SELECT 1 FROM compliance_checklists WHERE title_en = 'Annual Compliance Review') THEN
    INSERT INTO compliance_checklists (title_en, title_ar, category, priority, due_date, status) VALUES
    ('Annual Compliance Review', 'المراجعة السنوية للامتثال', 'general', 'high', CURRENT_DATE + INTERVAL '30 days', 'pending'),
    ('Data Protection Audit', 'تدقيق حماية البيانات', 'data_protection', 'medium', CURRENT_DATE + INTERVAL '15 days', 'pending');
  END IF;
END $$;