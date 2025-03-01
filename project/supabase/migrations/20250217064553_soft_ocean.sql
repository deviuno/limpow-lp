/*
  # Fix admin settings table

  1. Changes
    - Drop and recreate admin_settings table with proper structure
    - Add default settings row
    - Update RLS policies

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS admin_settings;

-- Create admin_settings table
CREATE TABLE admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  password_hash text NOT NULL DEFAULT '$2a$10$xVfYx9JTr0RYrPmFrRd7..QkwWqHwXK.0uO9kD7.j8VzxU1KY2K6q',
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
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view admin settings"
ON admin_settings FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can update admin settings"
ON admin_settings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default settings if not exists
INSERT INTO admin_settings (
  password_hash,
  blog_name,
  blog_description,
  blog_url,
  meta_title,
  meta_description,
  meta_keywords
) VALUES (
  '$2a$10$xVfYx9JTr0RYrPmFrRd7..QkwWqHwXK.0uO9kD7.j8VzxU1KY2K6q',
  'Limpow Blog',
  'Blog sobre finanças pessoais e recuperação de crédito',
  'https://blog.limpow.com.br',
  'Limpow Blog - Finanças e Crédito',
  'Dicas e informações sobre finanças pessoais, recuperação de crédito e muito mais.',
  'finanças, crédito, nome limpo, dívidas'
) ON CONFLICT DO NOTHING;