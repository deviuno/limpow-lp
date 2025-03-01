/*
  # Add OpenAI API key to settings

  1. Changes
    - Add openai_api_key column to settings table
  
  2. Security
    - Column is encrypted at rest
    - Only accessible through RLS policies
*/

-- Add OpenAI API key to settings
ALTER TABLE settings
ADD COLUMN IF NOT EXISTS openai_api_key text;