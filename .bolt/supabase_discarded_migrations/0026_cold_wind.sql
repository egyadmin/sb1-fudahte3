-- Create user settings table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'user_settings') THEN
    CREATE TABLE user_settings (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES auth.users(id),
      theme text CHECK (theme IN ('system', 'light', 'dark')) DEFAULT 'system',
      notifications text CHECK (notifications IN ('all', 'important', 'none')) DEFAULT 'all',
      accessibility text CHECK (accessibility IN ('default', 'large', 'high-contrast')) DEFAULT 'default',
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now(),
      UNIQUE(user_id)
    );

    -- Enable RLS
    ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Users can view their own settings"
      ON user_settings FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can update their own settings"
      ON user_settings FOR ALL
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);

    -- Create indexes
    CREATE INDEX IF NOT EXISTS idx_user_settings_user ON user_settings(user_id);

    -- Add updated_at trigger
    CREATE TRIGGER update_user_settings_updated_at
      BEFORE UPDATE ON user_settings
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;