/*
  # Add Writers Tables

  1. Drop existing tables if they exist
  2. Create new tables:
    - writers_profiles: Stores writer profiles and their characteristics
    - writers_settings: Stores writer-specific generation settings
    - writers_prompts: Stores pre-defined prompts for each writer
    - writers_history: Stores generation history

  3. Enable RLS and create appropriate policies
  4. Insert default writers
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS writers_history CASCADE;
DROP TABLE IF EXISTS writers_prompts CASCADE;
DROP TABLE IF EXISTS writers_settings CASCADE;
DROP TABLE IF EXISTS writers_profiles CASCADE;

-- Create writers_profiles table
CREATE TABLE writers_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  expertise text[] NOT NULL,
  style text NOT NULL,
  tone text NOT NULL,
  typical_phrases text[] NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create writers_settings table
CREATE TABLE writers_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id uuid REFERENCES writers_profiles(id) ON DELETE CASCADE,
  temperature float DEFAULT 0.7,
  max_tokens integer DEFAULT 2500,
  frequency_penalty float DEFAULT 0.0,
  presence_penalty float DEFAULT 0.0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(writer_id)
);

-- Create writers_prompts table
CREATE TABLE writers_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id uuid REFERENCES writers_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  prompt text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create writers_history table
CREATE TABLE writers_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id uuid REFERENCES writers_profiles(id) ON DELETE SET NULL,
  prompt text NOT NULL,
  result text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create updated_at triggers
CREATE TRIGGER update_writers_profiles_updated_at
  BEFORE UPDATE ON writers_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_writers_settings_updated_at
  BEFORE UPDATE ON writers_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_writers_prompts_updated_at
  BEFORE UPDATE ON writers_prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE writers_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE writers_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE writers_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE writers_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view writer profiles"
ON writers_profiles FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can manage writer profiles"
ON writers_profiles 
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can view writer settings"
ON writers_settings FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can manage writer settings"
ON writers_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Only authenticated users can view writer prompts"
ON writers_prompts FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can manage writer prompts"
ON writers_prompts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Only authenticated users can view writer history"
ON writers_history FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can insert writer history"
ON writers_history FOR INSERT
TO authenticated
WITH CHECK (true);

-- Insert default writer profiles
INSERT INTO writers_profiles (name, expertise, style, tone, typical_phrases) VALUES
(
  'Especialista Financeiro',
  ARRAY['finanças pessoais', 'investimentos', 'planejamento financeiro'],
  'formal',
  'profissional',
  ARRAY[
    'É fundamental compreender que...',
    'Análises demonstram que...',
    'Recomenda-se fortemente que...'
  ]
),
(
  'Consultor de Crédito',
  ARRAY['recuperação de crédito', 'negociação de dívidas', 'score de crédito'],
  'casual',
  'amigável',
  ARRAY[
    'Vamos resolver isso juntos!',
    'Aqui está o passo a passo...',
    'Não se preocupe, tem solução!'
  ]
),
(
  'Educador Financeiro',
  ARRAY['educação financeira', 'economia doméstica', 'orçamento familiar'],
  'didático',
  'motivacional',
  ARRAY[
    'Vamos aprender juntos...',
    'O primeiro passo é...',
    'Lembre-se sempre que...'
  ]
);

-- Insert default settings for each writer
INSERT INTO writers_settings (writer_id, temperature, max_tokens)
SELECT 
  id,
  0.7,
  2500
FROM writers_profiles;

-- Insert some example prompts
INSERT INTO writers_prompts (writer_id, title, prompt, category_id)
SELECT
  wp.id,
  'Como limpar o nome em 2024',
  'Escreva um artigo detalhado sobre como limpar o nome em 2024, incluindo passo a passo, dicas práticas e informações legais importantes.',
  c.id
FROM writers_profiles wp
CROSS JOIN (
  SELECT id FROM categories WHERE slug = 'guias' LIMIT 1
) c
WHERE wp.expertise @> ARRAY['recuperação de crédito']::text[];

INSERT INTO writers_prompts (writer_id, title, prompt, category_id)
SELECT
  wp.id,
  'Investimentos para iniciantes',
  'Crie um guia completo sobre investimentos para iniciantes, explicando os conceitos básicos, tipos de investimentos e como começar.',
  c.id
FROM writers_profiles wp
CROSS JOIN (
  SELECT id FROM categories WHERE slug = 'educacao-financeira' LIMIT 1
) c
WHERE wp.expertise @> ARRAY['finanças pessoais']::text[];