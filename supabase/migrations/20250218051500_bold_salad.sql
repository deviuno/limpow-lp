/*
  # Add auto_publish column to writer_virtual_articles

  1. Changes
    - Add auto_publish column to writer_virtual_articles table with default value false
*/

-- Add auto_publish column if it doesn't exist
ALTER TABLE writer_virtual_articles 
ADD COLUMN IF NOT EXISTS auto_publish boolean DEFAULT false;