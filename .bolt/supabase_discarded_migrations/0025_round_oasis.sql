-- Insert initial notifications safely
DO $$ 
DECLARE
  user_id uuid;
BEGIN
  -- Get the user ID
  SELECT id INTO user_id FROM auth.users WHERE email = 'tgohary@sajco.com.sa' LIMIT 1;

  -- Only proceed if we found the user and no notifications exist
  IF user_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM notifications WHERE user_id = user_id) THEN
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
      user_id,
      user_id
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
      user_id,
      user_id
    );
  END IF;
END $$;