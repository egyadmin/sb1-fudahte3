/*
  # Seed Initial Data
  
  1. Departments
    - Technology Department
    - HR Department
    - Finance Department
    
  2. Positions
    - Senior Developer (Technology)
    - HR Manager (HR)
    - Financial Analyst (Finance)
    
  3. Innovation Data
    - Opportunities
    - Suggestions
    
  Notes:
    - Uses DECLARE for department IDs
    - Includes safety checks to prevent duplicates
    - Maintains referential integrity
*/

DO $$ 
DECLARE
  tech_dept_id uuid;
  hr_dept_id uuid;
  finance_dept_id uuid;
BEGIN
  -- Insert Technology Department
  IF NOT EXISTS (SELECT 1 FROM hr_departments WHERE name_en = 'Technology') THEN
    INSERT INTO hr_departments (name_en, name_ar, description_en, description_ar)
    VALUES ('Technology', 'التكنولوجيا', 'Technology and Development Department', 'قسم التكنولوجيا والتطوير')
    RETURNING id INTO tech_dept_id;
  ELSE 
    SELECT id INTO tech_dept_id FROM hr_departments WHERE name_en = 'Technology';
  END IF;

  -- Insert HR Department
  IF NOT EXISTS (SELECT 1 FROM hr_departments WHERE name_en = 'Human Resources') THEN
    INSERT INTO hr_departments (name_en, name_ar, description_en, description_ar)
    VALUES ('Human Resources', 'الموارد البشرية', 'HR Management Department', 'قسم إدارة الموارد البشرية')
    RETURNING id INTO hr_dept_id;
  ELSE
    SELECT id INTO hr_dept_id FROM hr_departments WHERE name_en = 'Human Resources';
  END IF;

  -- Insert Finance Department
  IF NOT EXISTS (SELECT 1 FROM hr_departments WHERE name_en = 'Finance') THEN
    INSERT INTO hr_departments (name_en, name_ar, description_en, description_ar)
    VALUES ('Finance', 'المالية', 'Financial Management Department', 'قسم الإدارة المالية')
    RETURNING id INTO finance_dept_id;
  ELSE
    SELECT id INTO finance_dept_id FROM hr_departments WHERE name_en = 'Finance';
  END IF;

  -- Insert positions for each department
  IF NOT EXISTS (SELECT 1 FROM hr_positions WHERE title_en = 'Senior Developer') THEN
    INSERT INTO hr_positions (title_en, title_ar, department_id)
    VALUES ('Senior Developer', 'مطور أول', tech_dept_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM hr_positions WHERE title_en = 'HR Manager') THEN
    INSERT INTO hr_positions (title_en, title_ar, department_id)
    VALUES ('HR Manager', 'مدير الموارد البشرية', hr_dept_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM hr_positions WHERE title_en = 'Financial Analyst') THEN
    INSERT INTO hr_positions (title_en, title_ar, department_id)
    VALUES ('Financial Analyst', 'محلل مالي', finance_dept_id);
  END IF;

  -- Insert innovation opportunities
  IF NOT EXISTS (SELECT 1 FROM innovation_opportunities WHERE title_en = 'AI Customer Service') THEN
    INSERT INTO innovation_opportunities (title_en, title_ar, description_en, description_ar, impact, status)
    VALUES 
    ('AI Customer Service', 'خدمة العملاء بالذكاء الاصطناعي', 'Implement AI-powered customer service', 'تنفيذ خدمة عملاء مدعومة بالذكاء الاصطناعي', 'high', 'in_progress'),
    ('Process Automation', 'أتمتة العمليات', 'Automate manual processes', 'أتمتة العمليات اليدوية', 'medium', 'under_review');
  END IF;

  -- Insert innovation suggestions
  IF NOT EXISTS (SELECT 1 FROM innovation_suggestions WHERE title_en = 'Mobile App Development') THEN
    INSERT INTO innovation_suggestions (title_en, title_ar, description_en, description_ar, category, priority)
    VALUES 
    ('Mobile App Development', 'تطوير تطبيق الجوال', 'Develop mobile app for field operations', 'تطوير تطبيق جوال للعمليات الميدانية', 'technology', 'high'),
    ('Employee Training Program', 'برنامج تدريب الموظفين', 'Implement new training program', 'تنفيذ برنامج تدريبي جديد', 'process', 'medium');
  END IF;
END $$;