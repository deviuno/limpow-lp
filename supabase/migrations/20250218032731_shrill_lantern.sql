-- Drop existing table and policies
DROP TABLE IF EXISTS settings CASCADE;

-- Create settings table with proper constraints
CREATE TABLE settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Create trigger to ensure only one row exists
CREATE OR REPLACE FUNCTION prevent_multiple_settings()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM settings) > 0 THEN
    RAISE EXCEPTION 'Only one settings row is allowed';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_single_settings_row
  BEFORE INSERT ON settings
  FOR EACH ROW
  EXECUTE FUNCTION prevent_multiple_settings();

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

-- Insert default settings
INSERT INTO settings (
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