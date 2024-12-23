-- Update RLS policies for performance goals
DROP POLICY IF EXISTS "Users can view their own goals" ON hr_performance_goals;
DROP POLICY IF EXISTS "Users can manage their own goals" ON hr_performance_goals;

-- New policies that properly handle both employee and creator access
CREATE POLICY "Users can view performance goals"
  ON hr_performance_goals FOR SELECT
  TO authenticated
  USING (
    auth.uid() = employee_id OR 
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM hr_employees e 
      WHERE e.id = hr_performance_goals.employee_id 
      AND e.department_id IN (
        SELECT department_id FROM hr_employees 
        WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can create performance goals"
  ON hr_performance_goals FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by AND (
      auth.uid() = employee_id OR
      EXISTS (
        SELECT 1 FROM hr_employees e 
        WHERE e.id = employee_id 
        AND e.department_id IN (
          SELECT department_id FROM hr_employees 
          WHERE id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can update performance goals"
  ON hr_performance_goals FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);