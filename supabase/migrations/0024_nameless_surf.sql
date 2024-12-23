/*
  # Sample Reports Data Migration

  1. New Data
    - Performance reports
    - Financial reports

  2. Security
    - Safe inserts with existence checks
    - Maintains RLS policies
*/

DO $$ 
BEGIN
  -- Insert reports if they don't exist
  IF NOT EXISTS (SELECT 1 FROM reports WHERE title_en = 'Q1 Performance Report') THEN
    INSERT INTO reports (title_en, title_ar, type_en, type_ar, start_date, end_date, department) VALUES
    ('Q1 Performance Report', 'تقرير الأداء للربع الأول', 'Performance', 'الأداء', CURRENT_DATE - INTERVAL '90 days', CURRENT_DATE, 'hr'),
    ('Monthly Financial Summary', 'ملخص مالي شهري', 'Financial', 'مالي', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, 'finance');
  END IF;
END $$;