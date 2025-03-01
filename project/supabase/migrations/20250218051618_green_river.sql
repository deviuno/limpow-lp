/*
  # Add missing columns to writer_virtual_articles

  1. Changes
    - Add image_source column with default value 'unsplash'
    - Add keywords_auto column with default value true
    - Add length_auto column with default value true
    - Add required_sections_auto column with default value true
*/

-- Add missing columns if they don't exist
ALTER TABLE writer_virtual_articles 
ADD COLUMN IF NOT EXISTS image_source text DEFAULT 'unsplash',
ADD COLUMN IF NOT EXISTS keywords_auto boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS length_auto boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS required_sections_auto boolean DEFAULT true;