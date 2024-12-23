/*
  # Sample Innovation Data Migration

  1. New Data
    - Innovation Opportunities (AI Customer Service, Process Automation)
    - Innovation Suggestions (Mobile App Development, Employee Training Program)

  2. Security
    - Safe inserts with existence checks
    - Maintains data integrity
*/

DO $$ 
BEGIN
  -- Insert opportunities if they don't exist
  IF NOT EXISTS (SELECT 1 FROM innovation_opportunities WHERE title_en = 'AI Customer Service') THEN
    INSERT INTO innovation_opportunities (title_en, title_ar, description_en, description_ar, impact, status) VALUES
    ('AI Customer Service', 'خدمة العملاء بالذكاء الاصطناعي', 'Implement AI-powered customer service', 'تنفيذ خدمة عملاء مدعومة بالذكاء الاصطناعي', 'high', 'in_progress'),
    ('Process Automation', 'أتمتة العمليات', 'Automate manual processes', 'أتمتة العمليات اليدوية', 'medium', 'under_review');
  END IF;

  -- Insert suggestions
  IF NOT EXISTS (SELECT 1 FROM innovation_suggestions WHERE title_en = 'Mobile App Development') THEN
    INSERT INTO innovation_suggestions (title_en, title_ar, description_en, description_ar, category, priority) VALUES
    ('Mobile App Development', 'تطوير تطبيق الجوال', 'Develop mobile app for field operations', 'تطوير تطبيق جوال للعمليات الميدانية', 'technology', 'high'),
    ('Employee Training Program', 'برنامج تدريب الموظفين', 'Implement new training program', 'تنفيذ برنامج تدريبي جديد', 'process', 'medium');
  END IF;
END $$;