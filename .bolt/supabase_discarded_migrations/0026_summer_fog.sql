/*
  # Sample Notifications Data
  
  1. Purpose
    - Inserts initial welcome notifications for admin user
    - Only inserts if notifications table is empty
  
  2. Changes
    - Adds welcome notification
    - Adds getting started guide notification
    
  3. Safety
    - Checks for existing notifications before inserting
    - References existing admin user
*/

DO $$ 
BEGIN
  -- Only insert if no notifications exist
  IF NOT EXISTS (SELECT 1 FROM notifications LIMIT 1) THEN
    -- Insert welcome notification
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

    -- Insert getting started guide notification
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