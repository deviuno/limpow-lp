/*
  # Fix writer_virtual_articles table columns

  1. Changes
    - Add missing columns for auto-generation features
    - Add reference_links column
    - Add image source and auto publish options
    - Add auto flags for keywords, length, and sections
*/

-- Add missing columns if they don't exist
ALTER TABLE writer_virtual_articles 
ADD COLUMN IF NOT EXISTS reference_links text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS image_source text DEFAULT 'unsplash',
ADD COLUMN IF NOT EXISTS auto_publish boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS keywords_auto boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS length_auto boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS required_sections_auto boolean DEFAULT true;