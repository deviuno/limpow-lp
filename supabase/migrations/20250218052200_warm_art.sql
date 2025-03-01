/*
  # Fix writer_virtual_articles table references column

  1. Changes
    - Create backup of existing data
    - Drop tables in correct order
    - Recreate table with proper structure using article_references instead of references
    - Restore data
*/

-- Create backups of existing data
CREATE TABLE writer_virtual_articles_backup AS
SELECT * FROM writer_virtual_articles;

CREATE TABLE writer_virtual_history_backup AS
SELECT * FROM writer_virtual_history;

-- Drop tables in correct order
DROP TABLE IF EXISTS writer_virtual_history;
DROP TABLE IF EXISTS writer_virtual_articles;

-- Recreate writer_virtual_articles table with proper structure
CREATE TABLE writer_virtual_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  keywords text[] NOT NULL,
  keywords_auto boolean DEFAULT true,
  target_audience text NOT NULL,
  length text NOT NULL CHECK (length IN ('short', 'medium', 'long')),
  length_auto boolean DEFAULT true,
  required_sections text[] NOT NULL,
  required_sections_auto boolean DEFAULT true,
  reference_links text[] DEFAULT '{}',
  article_references text[] DEFAULT '{}',
  writer_id uuid REFERENCES writer_virtual_profiles(id) ON DELETE SET NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  content text,
  image_source text DEFAULT 'unsplash',
  auto_publish boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE writer_virtual_articles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Only authenticated users can view articles"
ON writer_virtual_articles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can manage articles"
ON writer_virtual_articles
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_writer_virtual_articles_updated_at
  BEFORE UPDATE ON writer_virtual_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Restore articles data
INSERT INTO writer_virtual_articles (
  id, title, keywords, target_audience, length, required_sections,
  writer_id, category_id, status, content, created_at, updated_at
)
SELECT 
  id, title, keywords, target_audience, length, required_sections,
  writer_id, category_id, status, content, created_at, updated_at
FROM writer_virtual_articles_backup;

-- Recreate writer_virtual_history table
CREATE TABLE writer_virtual_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id uuid REFERENCES writer_virtual_profiles(id) ON DELETE SET NULL,
  article_id uuid REFERENCES writer_virtual_articles(id) ON DELETE SET NULL,
  prompt text NOT NULL,
  result text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE writer_virtual_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Only authenticated users can view history"
ON writer_virtual_history FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can insert history"
ON writer_virtual_history FOR INSERT
TO authenticated
WITH CHECK (true);

-- Restore history data
INSERT INTO writer_virtual_history (
  id, writer_id, article_id, prompt, result, metadata, created_at
)
SELECT 
  id, writer_id, article_id, prompt, result, metadata, created_at
FROM writer_virtual_history_backup;

-- Drop backup tables
DROP TABLE writer_virtual_articles_backup;
DROP TABLE writer_virtual_history_backup;