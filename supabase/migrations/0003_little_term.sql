/*
  # Add Strategic Planning Enhancements

  1. Performance Improvements
    - Add indexes for user_id columns to improve query performance
    - Add updated_at trigger function and triggers

  2. Additional Security
    - Add update policies for all tables
    - Add delete policies for all tables

  Note: This migration builds upon existing tables and policies
*/

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_strategic_metrics_user ON strategic_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_strategic_resources_user ON strategic_resources(user_id);
CREATE INDEX IF NOT EXISTS idx_strategic_quality_user ON strategic_quality(user_id);
CREATE INDEX IF NOT EXISTS idx_strategic_improvements_user ON strategic_improvements(user_id);

-- Add update policies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'strategic_metrics' 
    AND policyname = 'Users can update their own metrics'
  ) THEN
    CREATE POLICY "Users can update their own metrics"
      ON strategic_metrics FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'strategic_resources' 
    AND policyname = 'Users can update their own resources'
  ) THEN
    CREATE POLICY "Users can update their own resources"
      ON strategic_resources FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'strategic_quality' 
    AND policyname = 'Users can update their own quality data'
  ) THEN
    CREATE POLICY "Users can update their own quality data"
      ON strategic_quality FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'strategic_improvements' 
    AND policyname = 'Users can update their own improvements'
  ) THEN
    CREATE POLICY "Users can update their own improvements"
      ON strategic_improvements FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Add delete policies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'strategic_metrics' 
    AND policyname = 'Users can delete their own metrics'
  ) THEN
    CREATE POLICY "Users can delete their own metrics"
      ON strategic_metrics FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'strategic_resources' 
    AND policyname = 'Users can delete their own resources'
  ) THEN
    CREATE POLICY "Users can delete their own resources"
      ON strategic_resources FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'strategic_quality' 
    AND policyname = 'Users can delete their own quality data'
  ) THEN
    CREATE POLICY "Users can delete their own quality data"
      ON strategic_quality FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'strategic_improvements' 
    AND policyname = 'Users can delete their own improvements'
  ) THEN
    CREATE POLICY "Users can delete their own improvements"
      ON strategic_improvements FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Add updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_strategic_metrics_updated_at'
  ) THEN
    CREATE TRIGGER update_strategic_metrics_updated_at
      BEFORE UPDATE ON strategic_metrics
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_strategic_resources_updated_at'
  ) THEN
    CREATE TRIGGER update_strategic_resources_updated_at
      BEFORE UPDATE ON strategic_resources
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_strategic_quality_updated_at'
  ) THEN
    CREATE TRIGGER update_strategic_quality_updated_at
      BEFORE UPDATE ON strategic_quality
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_strategic_improvements_updated_at'
  ) THEN
    CREATE TRIGGER update_strategic_improvements_updated_at
      BEFORE UPDATE ON strategic_improvements
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;