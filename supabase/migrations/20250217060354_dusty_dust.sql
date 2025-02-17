/*
  # Create settings table

  1. New Tables
    - `settings`
      - `id` (uuid, primary key)
      - `blog_name` (text)
      - `blog_description` (text)
      - `blog_url` (text)
      - `posts_per_page` (integer)
      - `meta_title` (text)
      - `meta_description` (text)
      - `meta_keywords` (text)
      - `facebook_url` (text)
      - `instagram_url` (text)
      - `linkedin_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `settings` table
    - Add policy for authenticated users to read/update settings
*/

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_name text,
  blog_description text,
  blog_url text,
  posts_per_page integer DEFAULT 10,
  meta_title text,
  meta_description text,
  meta_keywords text,
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

-- Create trigger for updated_at
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default settings
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