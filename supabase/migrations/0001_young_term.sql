/*
  # Strategic Planning Database Schema

  1. New Tables
    - strategic_metrics
      - Stores operational metrics and KPIs
    - strategic_resources
      - Tracks resource allocation and efficiency
    - strategic_quality
      - Manages quality control data
    - strategic_improvements
      - Records improvement initiatives

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Metrics table
CREATE TABLE IF NOT EXISTS strategic_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  completion numeric NOT NULL CHECK (completion >= 0 AND completion <= 100),
  trend numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Resources table
CREATE TABLE IF NOT EXISTS strategic_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  efficiency numeric NOT NULL CHECK (efficiency >= 0 AND efficiency <= 100),
  description_en text,
  description_ar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Quality metrics table
CREATE TABLE IF NOT EXISTS strategic_quality (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  status text CHECK (status IN ('improved', 'stable', 'declined')),
  description_en text,
  description_ar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Improvements table
CREATE TABLE IF NOT EXISTS strategic_improvements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  status text CHECK (status IN ('planned', 'in-progress', 'completed')),
  progress numeric NOT NULL CHECK (progress >= 0 AND progress <= 100),
  impact_en text,
  impact_ar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE strategic_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategic_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategic_quality ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategic_improvements ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read their own metrics"
  ON strategic_metrics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metrics"
  ON strategic_metrics FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own resources"
  ON strategic_resources FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own resources"
  ON strategic_resources FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own quality data"
  ON strategic_quality FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quality data"
  ON strategic_quality FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own improvements"
  ON strategic_improvements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own improvements"
  ON strategic_improvements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);