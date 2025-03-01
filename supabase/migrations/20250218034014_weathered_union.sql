/*
  # Fix Settings Table Structure

  1. Changes
    - Drop existing settings table
    - Recreate with integer primary key
    - Add check constraint to ensure only one row
    - Add OpenAI API key column
    - Reinsert default settings

  2. Security
    - Enable RLS
    - Add policies for viewing and updating settings
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS settings CASCADE;

-- Create settings table with proper constraints
CREATE TABLE settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  blog_name text DEFAULT 'Limpow Blog',
  blog_description text DEFAULT 'Blog sobre finanças pessoais e recuperação de crédito',
  blog_url text DEFAULT 'https://blog.limpow.com.br',
  posts_per_page integer DEFAULT 10,
  meta_title text DEFAULT 'Limpow Blog - Finanças e Crédito',
  meta_description text DEFAULT 'Dicas e informações sobre finanças pessoais, recuperação de crédito e muito mais.',
  meta_keywords text DEFAULT 'finanças, crédito, nome limpo, dívidas',
  facebook_url text DEFAULT 'https://facebook.com/limpow',
  instagram_url text DEFAULT 'https://instagram.com/limpow',
  linkedin_url text DEFAULT 'https://linkedin.com/company/limpow',
  openai_api_key text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view settings"
ON settings FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can update settings"
ON settings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default settings
INSERT INTO settings (
  id,
  blog_name,
  blog_description,
  blog_url,
  meta_title,
  meta_description,
  meta_keywords,
  facebook_url,
  instagram_url,
  linkedin_url
) VALUES (
  1,
  'Limpow Blog',
  'Blog sobre finanças pessoais e recuperação de crédito',
  'https://blog.limpow.com.br',
  'Limpow Blog - Finanças e Crédito',
  'Dicas e informações sobre finanças pessoais, recuperação de crédito e muito mais.',
  'finanças, crédito, nome limpo, dívidas',
  'https://facebook.com/limpow',
  'https://instagram.com/limpow',
  'https://linkedin.com/company/limpow'
);