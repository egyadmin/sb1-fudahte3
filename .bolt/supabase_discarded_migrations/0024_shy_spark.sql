/*
  # Add Approvals System

  1. New Tables
    - `approvals`
      - `id` (uuid, primary key)
      - `title_en` (text)
      - `title_ar` (text) 
      - `description_en` (text)
      - `description_ar` (text)
      - `type` (text - leave/expense/purchase/document)
      - `status` (text - pending/approved/rejected)
      - `requester_id` (uuid)
      - `approver_id` (uuid)
      - `notes` (text)
      - Timestamps (created_at, updated_at)

  2. Security
    - Enable RLS
    - Add policies for viewing and managing approvals
    - Add indexes for performance

  3. Changes
    - Safe creation with existence checks
    - Policy updates with safety checks
*/

-- Safely create approvals table and policies
DO $$ 
BEGIN
  -- Create table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'approvals') THEN
    CREATE TABLE approvals (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title_en text NOT NULL,
      title_ar text NOT NULL,
      description_en text NOT NULL,
      description_ar text NOT NULL,
      type text CHECK (type IN ('leave', 'expense', 'purchase', 'document')),
      status text CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
      requester_id uuid REFERENCES auth.users(id),
      approver_id uuid REFERENCES auth.users(id),
      notes text,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );

    -- Enable RLS
    ALTER TABLE approvals ENABLE ROW LEVEL SECURITY;

    -- Create indexes
    CREATE INDEX IF NOT EXISTS idx_approvals_requester ON approvals(requester_id);
    CREATE INDEX IF NOT EXISTS idx_approvals_approver ON approvals(approver_id);
    CREATE INDEX IF NOT EXISTS idx_approvals_status ON approvals(status);
    CREATE INDEX IF NOT EXISTS idx_approvals_type ON approvals(type);

    -- Add updated_at trigger
    CREATE TRIGGER update_approvals_updated_at
      BEFORE UPDATE ON approvals
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can view approvals they requested or need to approve" ON approvals;
  DROP POLICY IF EXISTS "Users can create approval requests" ON approvals;
  DROP POLICY IF EXISTS "Approvers can update approval status" ON approvals;

  -- Create new policies
  CREATE POLICY "Users can view approvals they requested or need to approve"
    ON approvals FOR SELECT
    TO authenticated
    USING (
      auth.uid() = requester_id OR 
      auth.uid() = approver_id OR
      auth.uid() IN (
        SELECT id FROM auth.users 
        WHERE raw_user_meta_data->>'role' = 'admin'
      )
    );

  CREATE POLICY "Users can create approval requests"
    ON approvals FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = requester_id);

  CREATE POLICY "Approvers can update approval status"
    ON approvals FOR UPDATE
    TO authenticated
    USING (
      auth.uid() = approver_id OR
      auth.uid() IN (
        SELECT id FROM auth.users 
        WHERE raw_user_meta_data->>'role' = 'admin'
      )
    )
    WITH CHECK (
      auth.uid() = approver_id OR
      auth.uid() IN (
        SELECT id FROM auth.users 
        WHERE raw_user_meta_data->>'role' = 'admin'
      )
    );
END $$;