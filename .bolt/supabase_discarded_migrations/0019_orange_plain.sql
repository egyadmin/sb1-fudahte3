/*
  # Add Innovation Voting and Comments

  1. New Features
    - Vote tracking columns for opportunities
    - Voting system with one vote per user per opportunity
    - Comment system with bilingual support
    
  2. Security
    - RLS policies for votes and comments
    - Proper access controls and constraints
    
  3. Performance
    - Indexes for efficient querying
    - Triggers for maintaining vote and comment counts
*/

-- Add vote tracking columns
DO $$ 
BEGIN
  ALTER TABLE innovation_opportunities 
  ADD COLUMN IF NOT EXISTS votes_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS comments_count integer DEFAULT 0;
EXCEPTION
  WHEN duplicate_column THEN NULL;
END $$;

-- Create votes table
CREATE TABLE IF NOT EXISTS innovation_opportunities_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES innovation_opportunities(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS innovation_opportunities_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES innovation_opportunities(id) ON DELETE CASCADE,
  comment_en text NOT NULL,
  comment_ar text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE innovation_opportunities_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE innovation_opportunities_comments ENABLE ROW LEVEL SECURITY;

-- Safely create policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can view votes" ON innovation_opportunities_votes;
  DROP POLICY IF EXISTS "Users can add votes" ON innovation_opportunities_votes;
  DROP POLICY IF EXISTS "Users can view comments" ON innovation_opportunities_comments;
  DROP POLICY IF EXISTS "Users can manage their comments" ON innovation_opportunities_comments;

  -- Create new policies
  CREATE POLICY "Users can view votes"
    ON innovation_opportunities_votes FOR SELECT
    TO authenticated
    USING (true);

  CREATE POLICY "Users can add votes"
    ON innovation_opportunities_votes FOR INSERT
    TO authenticated
    WITH CHECK (
      auth.uid() = created_by AND
      NOT EXISTS (
        SELECT 1 FROM innovation_opportunities_votes v
        WHERE v.opportunity_id = innovation_opportunities_votes.opportunity_id
        AND v.created_by = auth.uid()
      )
    );

  CREATE POLICY "Users can view comments"
    ON innovation_opportunities_comments FOR SELECT
    TO authenticated
    USING (true);

  CREATE POLICY "Users can manage their comments"
    ON innovation_opportunities_comments FOR ALL
    TO authenticated
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);
END $$;

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_opportunity_votes ON innovation_opportunities_votes(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_opportunity_comments ON innovation_opportunities_comments(opportunity_id);

-- Add triggers to maintain counts
CREATE OR REPLACE FUNCTION update_opportunity_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE innovation_opportunities
    SET votes_count = votes_count + 1
    WHERE id = NEW.opportunity_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE innovation_opportunities
    SET votes_count = votes_count - 1
    WHERE id = OLD.opportunity_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_opportunity_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE innovation_opportunities
    SET comments_count = comments_count + 1
    WHERE id = NEW.opportunity_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE innovation_opportunities
    SET comments_count = comments_count - 1
    WHERE id = OLD.opportunity_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Safely create triggers
DO $$
BEGIN
  DROP TRIGGER IF EXISTS update_opportunity_vote_count_trigger ON innovation_opportunities_votes;
  DROP TRIGGER IF EXISTS update_opportunity_comment_count_trigger ON innovation_opportunities_comments;

  CREATE TRIGGER update_opportunity_vote_count_trigger
    AFTER INSERT OR DELETE ON innovation_opportunities_votes
    FOR EACH ROW
    EXECUTE FUNCTION update_opportunity_vote_count();

  CREATE TRIGGER update_opportunity_comment_count_trigger
    AFTER INSERT OR DELETE ON innovation_opportunities_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_opportunity_comment_count();
END $$;