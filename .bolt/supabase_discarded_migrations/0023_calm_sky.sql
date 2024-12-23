-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
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

-- Safely create policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
  DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;

  -- Create new policies
  CREATE POLICY "Users can view their own notifications"
    ON notifications FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can update their own notifications"
    ON notifications FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);

-- Insert initial notifications
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM notifications LIMIT 1) THEN
    INSERT INTO notifications (
      title_en, title_ar,
      message_en, message_ar,
      type, user_id, created_by
    )
    SELECT 
      'Welcome to the System',
      'مرحباً بك في النظام',
      'Thank you for joining our operations management system',
      'شكراً لانضمامك إلى نظام إدارة العمليات',
      'info',
      id,
      id
    FROM auth.users
    WHERE email = 'tgohary@sajco.com.sa';

    INSERT INTO notifications (
      title_en, title_ar,
      message_en, message_ar,
      type, user_id, created_by
    )
    SELECT 
      'Getting Started Guide',
      'دليل البدء',
      'Check out our quick start guide to learn about the system features',
      'اطلع على دليل البدء السريع للتعرف على ميزات النظام',
      'info',
      id,
      id
    FROM auth.users
    WHERE email = 'tgohary@sajco.com.sa';
  END IF;
END $$;

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_notifications_updated_at ON notifications;
CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON notifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();