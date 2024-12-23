/*
  # Create Notifications System

  1. New Tables
    - notifications
      - id (uuid, primary key)
      - title_en (text)
      - title_ar (text)
      - message_en (text)
      - message_ar (text)
      - type (text - info/success/warning/error)
      - user_id (uuid)
      - read (boolean)
      - created_at (timestamptz)
      - updated_at (timestamptz)
      - created_by (uuid)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add indexes for performance

  3. Sample Data
    - Add welcome notifications for admin user
*/

-- Create Notifications Table
DO $$ 
BEGIN
  -- Create table if it doesn't exist
  CREATE TABLE IF NOT EXISTS notifications (
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

  -- Enable RLS if not already enabled
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'notifications' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
  END IF;

  -- Create policies if they don't exist
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

  -- Create indexes if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'notifications' 
    AND indexname = 'idx_notifications_user'
  ) THEN
    CREATE INDEX idx_notifications_user ON notifications(user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'notifications' 
    AND indexname = 'idx_notifications_read'
  ) THEN
    CREATE INDEX idx_notifications_read ON notifications(read);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'notifications' 
    AND indexname = 'idx_notifications_created'
  ) THEN
    CREATE INDEX idx_notifications_created ON notifications(created_at);
  END IF;

  -- Add trigger if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_notifications_updated_at'
  ) THEN
    CREATE TRIGGER update_notifications_updated_at
      BEFORE UPDATE ON notifications
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  -- Insert sample notifications for admin user
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