-- Create notifications table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'notifications') THEN
    CREATE TABLE notifications (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title_en text NOT NULL,
      title_ar text NOT NULL,
      message_en text NOT NULL,
      message_ar text NOT NULL,
      type text CHECK (type IN ('info', 'success', 'warning', 'error')),
      read boolean DEFAULT false,
      user_id uuid REFERENCES auth.users(id),
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now(),
      created_by uuid REFERENCES auth.users(id)
    );

    -- Enable RLS
    ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Users can view their own notifications"
      ON notifications FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can update their own notifications"
      ON notifications FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);

    -- Create indexes
    CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
    CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
    CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

    -- Add updated_at trigger
    CREATE TRIGGER update_notifications_updated_at
      BEFORE UPDATE ON notifications
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;