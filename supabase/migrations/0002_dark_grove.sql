/*
  # Add Update and Delete Policies

  1. Changes
    - Add update policies for all tables
    - Add delete policies for all tables
    - Add indexes for performance optimization

  2. Security
    - Maintain RLS
    - Add policies for update/delete operations
    - Ensure data integrity
*/

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_strategic_metrics_user ON strategic_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_strategic_resources_user ON strategic_resources(user_id);
CREATE INDEX IF NOT EXISTS idx_strategic_quality_user ON strategic_quality(user_id);
CREATE INDEX IF NOT EXISTS idx_strategic_improvements_user ON strategic_improvements(user_id);

-- Add update policies
CREATE POLICY "Users can update their own metrics"
  ON strategic_metrics FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resources"
  ON strategic_resources FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quality data"
  ON strategic_quality FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own improvements"
  ON strategic_improvements FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add delete policies
CREATE POLICY "Users can delete their own metrics"
  ON strategic_metrics FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resources"
  ON strategic_resources FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quality data"
  ON strategic_quality FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own improvements"
  ON strategic_improvements FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_strategic_metrics_updated_at
  BEFORE UPDATE ON strategic_metrics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_strategic_resources_updated_at
  BEFORE UPDATE ON strategic_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_strategic_quality_updated_at
  BEFORE UPDATE ON strategic_quality
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_strategic_improvements_updated_at
  BEFORE UPDATE ON strategic_improvements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();