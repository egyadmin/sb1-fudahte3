/*
  # Sample Finance Data Migration

  1. New Data
    - Budget categories (Operations, Marketing, Development)
    - Sample transactions

  2. Security
    - Safe inserts with existence checks
    - Maintains RLS policies
*/

DO $$ 
BEGIN
  -- Insert budget categories if they don't exist
  IF NOT EXISTS (SELECT 1 FROM finance_budget_categories WHERE name_en = 'Operations') THEN
    INSERT INTO finance_budget_categories (name_en, name_ar, allocated_amount, fiscal_year) VALUES
    ('Operations', 'العمليات', 500000, '2024'),
    ('Marketing', 'التسويق', 300000, '2024'),
    ('Development', 'التطوير', 400000, '2024');
  END IF;

  -- Insert transactions
  IF NOT EXISTS (SELECT 1 FROM finance_transactions WHERE type_en = 'Equipment Purchase') THEN
    INSERT INTO finance_transactions (type_en, type_ar, amount, category_id, transaction_date) VALUES
    ('Equipment Purchase', 'شراء معدات', 25000, (SELECT id FROM finance_budget_categories WHERE name_en = 'Operations'), CURRENT_DATE),
    ('Marketing Campaign', 'حملة تسويقية', 15000, (SELECT id FROM finance_budget_categories WHERE name_en = 'Marketing'), CURRENT_DATE);
  END IF;
END $$;