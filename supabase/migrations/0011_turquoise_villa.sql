/*
  # Financial Management Schema

  1. New Tables
    - finance_budget_categories
    - finance_transactions
    - finance_reports
    - finance_accounts

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    
  3. Changes
    - Add indexes for performance
    - Add triggers for automatic updates
*/

-- Budget Categories Table
CREATE TABLE IF NOT EXISTS finance_budget_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_ar text NOT NULL,
  allocated_amount numeric NOT NULL CHECK (allocated_amount >= 0),
  spent_amount numeric DEFAULT 0 CHECK (spent_amount >= 0),
  fiscal_year text NOT NULL,
  status text CHECK (status IN ('active', 'archived')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS finance_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type_en text NOT NULL,
  type_ar text NOT NULL,
  amount numeric NOT NULL,
  category_id uuid REFERENCES finance_budget_categories(id),
  description_en text,
  description_ar text,
  transaction_date date NOT NULL,
  status text CHECK (status IN ('pending', 'completed', 'cancelled')) DEFAULT 'completed',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Financial Reports Table
CREATE TABLE IF NOT EXISTS finance_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  type_en text NOT NULL,
  type_ar text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text CHECK (status IN ('generated', 'archived')) DEFAULT 'generated',
  report_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE finance_budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_reports ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view budget categories"
  ON finance_budget_categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage budget categories they created"
  ON finance_budget_categories FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view transactions"
  ON finance_transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage transactions they created"
  ON finance_transactions FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view financial reports"
  ON finance_reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage reports they created"
  ON finance_reports FOR ALL
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_budget_categories_fiscal_year ON finance_budget_categories(fiscal_year);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON finance_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON finance_transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_reports_date_range ON finance_reports(start_date, end_date);

-- Add trigger for updating spent amounts
CREATE OR REPLACE FUNCTION update_budget_category_spent_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE finance_budget_categories
    SET spent_amount = spent_amount + NEW.amount,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.category_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE finance_budget_categories
    SET spent_amount = spent_amount - OLD.amount,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.category_id;
  ELSIF TG_OP = 'UPDATE' AND NEW.amount != OLD.amount THEN
    UPDATE finance_budget_categories
    SET spent_amount = spent_amount - OLD.amount + NEW.amount,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.category_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_budget_spent_amount
  AFTER INSERT OR UPDATE OR DELETE ON finance_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_budget_category_spent_amount();

-- Add updated_at triggers
CREATE TRIGGER update_budget_categories_updated_at
  BEFORE UPDATE ON finance_budget_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON finance_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON finance_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();