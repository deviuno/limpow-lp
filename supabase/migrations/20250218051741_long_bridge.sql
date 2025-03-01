/*
  # Fix references column in writer_virtual_articles

  1. Changes
    - Add reference_links column as text array with default empty array
*/

-- Add reference_links column if it doesn't exist
ALTER TABLE writer_virtual_articles 
ADD COLUMN IF NOT EXISTS reference_links text[] DEFAULT '{}';