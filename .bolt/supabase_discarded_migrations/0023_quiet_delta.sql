-- Seed quality data
DO $$ 
BEGIN
  -- Insert quality standards if they don't exist
  IF NOT EXISTS (SELECT 1 FROM quality_standards WHERE title_en = 'ISO 9001 Compliance') THEN
    INSERT INTO quality_standards (title_en, title_ar, category, status) VALUES
    ('ISO 9001 Compliance', 'الامتثال لمعايير الأيزو 9001', 'quality', 'active'),
    ('Safety Protocol Standards', 'معايير بروتوكول السلامة', 'safety', 'active');
  END IF;

  -- Insert quality audits
  IF NOT EXISTS (SELECT 1 FROM quality_audits WHERE title_en = 'Q1 Quality Audit') THEN
    INSERT INTO quality_audits (title_en, title_ar, audit_date, status, score) VALUES
    ('Q1 Quality Audit', 'تدقيق الجودة للربع الأول', CURRENT_DATE, 'completed', 92),
    ('Safety Compliance Audit', 'تدقيق الامتثال للسلامة', CURRENT_DATE, 'completed', 88);
  END IF;
END $$;