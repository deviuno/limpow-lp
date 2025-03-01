/*
  # Fix settings table

  1. Changes
    - Drop old settings table
    - Create new settings table with correct structure
    - Add policies for proper access control

  2. Security
    - Enable RLS
    - Add policies for read/write access
*/

-- Drop old table if exists
DROP TABLE IF EXISTS settings;

-- Create settings table
CREATE TABLE settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_name text DEFAULT 'Limpow Blog',
  blog_description text DEFAULT 'Blog sobre finanças pessoais e recuperação de crédito',
  blog_url text DEFAULT 'https://blog.limpow.com.br',
  posts_per_page integer DEFAULT 10,
  meta_title text DEFAULT 'Limpow Blog - Finanças e Crédito',
  meta_description text DEFAULT 'Dicas e informações sobre finanças pessoais, recuperação de crédito e muito mais.',
  meta_keywords text DEFAULT 'finanças, crédito, nome limpo, dívidas',
  facebook_url text,
  instagram_url text,
  linkedin_url text,
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

CREATE POLICY "Only authenticated users can insert settings"
ON settings FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default settings if not exists
INSERT INTO settings (
  blog_name,
  blog_description,
  blog_url,
  meta_title,
  meta_description,
  meta_keywords
) VALUES (
  'Limpow Blog',
  'Blog sobre finanças pessoais e recuperação de crédito',
  'https://blog.limpow.com.br',
  'Limpow Blog - Finanças e Crédito',
  'Dicas e informações sobre finanças pessoais, recuperação de crédito e muito mais.',
  'finanças, crédito, nome limpo, dívidas'
) ON CONFLICT DO NOTHING;