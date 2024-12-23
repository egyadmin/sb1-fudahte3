/*
  # Initial Notifications Setup
  
  1. Data
    - Inserts welcome notification for admin user
    - Inserts getting started guide notification
    
  2. Safety
    - Checks if notifications already exist before inserting
    - Uses safe transaction handling
*/

BEGIN;

-- Create temporary table to store user id
CREATE TEMP TABLE IF NOT EXISTS temp_admin_user AS
SELECT id FROM auth.users WHERE email = 'tgohary@sajco.com.sa' LIMIT 1;

-- Only proceed if we found the admin user
DO $$ 
DECLARE
  v_user_id uuid;
BEGIN
  SELECT id INTO v_user_id FROM temp_admin_user;
  
  IF v_user_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM notifications LIMIT 1) THEN
    -- Insert welcome notification
    INSERT INTO notifications (
      title_en, title_ar,
      message_en, message_ar,
      type, user_id, created_by
    ) VALUES (
      'Welcome to the System',
      'مرحباً بك في النظام',
      'Thank you for joining our operations management system',
      'شكراً لانضمامك إلى نظام إدارة العمليات',
      'info',
      v_user_id,
      v_user_id
    );

    -- Insert getting started guide notification
    INSERT INTO notifications (
      title_en, title_ar,
      message_en, message_ar,
      type, user_id, created_by
    ) VALUES (
      'Getting Started Guide',
      'دليل البدء',
      'Check out our quick start guide to learn about the system features',
      'اطلع على دليل البدء السريع للتعرف على ميزات النظام',
      'info',
      v_user_id,
      v_user_id
    );
  END IF;
END $$;

-- Clean up
DROP TABLE IF EXISTS temp_admin_user;

COMMIT;