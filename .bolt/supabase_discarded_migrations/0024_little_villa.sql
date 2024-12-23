DO $$ 
BEGIN
  -- Create Notifications Table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'notifications') THEN
    CREATE TABLE notifications (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title_en text NOT NULL,
      title_ar text NOT NULL,
      message_en text NOT NULL,
      message_ar text NOT NULL,
      type text CHECK (type IN ('info', 'success', 'warning', 'error')),
      user_id uuid REFERENCES auth.users(id),
      read boolean DEFAULT false,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now(),
      created_by uuid REFERENCES auth.users(id)
    );

    -- Enable RLS
    ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

    -- Create Indexes
    CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
    CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
    CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at);

    -- Add Updated At Trigger
    CREATE TRIGGER update_notifications_updated_at
      BEFORE UPDATE ON notifications
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  -- Safely create policies
  DO $policies$ 
  BEGIN
    -- View Policy
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'notifications' 
      AND policyname = 'Users can view their own notifications'
    ) THEN
      CREATE POLICY "Users can view their own notifications"
        ON notifications FOR SELECT
        TO authenticated
        USING (auth.uid() = user_id);
    END IF;

    -- Update Policy
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'notifications' 
      AND policyname = 'Users can update their own notifications'
    ) THEN
      CREATE POLICY "Users can update their own notifications"
        ON notifications FOR UPDATE
        TO authenticated
        USING (auth.uid() = user_id)
        WITH CHECK (auth.uid() = user_id);
    END IF;
  END $policies$;
END $$;