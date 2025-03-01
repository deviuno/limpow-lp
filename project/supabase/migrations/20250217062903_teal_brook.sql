/*
  # Update admin settings table

  1. Changes
    - Add new columns for blog settings
    - Add default values
    - Preserve existing password_hash data
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to admin_settings if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'admin_settings' AND column_name = 'blog_name') THEN
    ALTER TABLE admin_settings 
      ADD COLUMN blog_name text DEFAULT 'Limpow Blog',
      ADD COLUMN blog_description text DEFAULT 'Blog sobre finanças pessoais e recuperação de crédito',
      ADD COLUMN blog_url text DEFAULT 'https://blog.limpow.com.br',
      ADD COLUMN posts_per_page integer DEFAULT 10,
      ADD COLUMN meta_title text DEFAULT 'Limpow Blog - Finanças e Crédito',
      ADD COLUMN meta_description text DEFAULT 'Dicas e informações sobre finanças pessoais, recuperação de crédito e muito mais.',
      ADD COLUMN meta_keywords text DEFAULT 'finanças, crédito, nome limpo, dívidas',
      ADD COLUMN facebook_url text,
      ADD COLUMN instagram_url text,
      ADD COLUMN linkedin_url text;
  END IF;
END $$;