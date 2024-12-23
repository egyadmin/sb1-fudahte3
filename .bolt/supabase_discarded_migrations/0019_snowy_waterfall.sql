/*
  # Add Innovation Votes and Comments

  1. New Tables and Columns
    - Add vote and comment tracking to opportunities
    - Create votes and comments tables
    - Set up proper relationships and constraints

  2. Security
    - Enable RLS
    - Add policies with safety checks
    
  3. Performance
    - Add appropriate indexes
    - Set up count maintenance triggers
*/

-- Add vote tracking columns safely
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
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(opportunity_id, created_by)
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

-- Create Policies with safety checks
DO $$ 
BEGIN
  -- Votes policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'innovation_opportunities_votes' 
    AND policyname = 'Users can view all votes'
  ) THEN
    CREATE POLICY "Users can view all votes"
      ON innovation_opportunities_votes FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'innovation_opportunities_votes' 
    AND policyname = 'Users can vote once'
  ) THEN
    CREATE POLICY "Users can vote once"
      ON innovation_opportunities_votes FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = created_by);
  END IF;

  -- Comments policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'innovation_opportunities_comments' 
    AND policyname = 'Users can view all comments'
  ) THEN
    CREATE POLICY "Users can view all comments"
      ON innovation_opportunities_comments FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'innovation_opportunities_comments' 
    AND policyname = 'Users can manage own comments'
  ) THEN
    CREATE POLICY "Users can manage own comments"
      ON innovation_opportunities_comments FOR ALL
      TO authenticated
      USING (auth.uid() = created_by)
      WITH CHECK (auth.uid() = created_by);
  END IF;
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

-- Create triggers
DROP TRIGGER IF EXISTS update_opportunity_vote_count_trigger ON innovation_opportunities_votes;
CREATE TRIGGER update_opportunity_vote_count_trigger
  AFTER INSERT OR DELETE ON innovation_opportunities_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_opportunity_vote_count();

DROP TRIGGER IF EXISTS update_opportunity_comment_count_trigger ON innovation_opportunities_comments;
CREATE TRIGGER update_opportunity_comment_count_trigger
  AFTER INSERT OR DELETE ON innovation_opportunities_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_opportunity_comment_count();