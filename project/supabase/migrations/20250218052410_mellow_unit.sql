/*
  # Fix writer_virtual_articles table references column

  1. Changes
    - Add article_references column
    - Drop references column if it exists
*/

-- Add article_references column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'writer_virtual_articles' 
    AND column_name = 'article_references'
  ) THEN
    ALTER TABLE writer_virtual_articles 
    ADD COLUMN article_references text[] DEFAULT '{}';
  END IF;
END $$;