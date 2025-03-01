/*
  # Add Writer Profiles

  1. New Tables
    - writers_profiles: Stores predefined writer personalities
    - generation_settings: Stores generation parameters for each writer
    - generation_history: Tracks generated content history

  2. Changes
    - Add relationships between tables
    - Add default writer profiles
*/

-- Create writers_profiles table
CREATE TABLE writers_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  expertise text[] NOT NULL,
  style text NOT NULL,
  tone text NOT NULL,
  typical_phrases text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create generation_settings table
CREATE TABLE generation_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id uuid REFERENCES writers_profiles(id) ON DELETE CASCADE,
  temperature float DEFAULT 0.7,
  max_tokens integer DEFAULT 2500,
  frequency_penalty float DEFAULT 0.0,
  presence_penalty float DEFAULT 0.0,
  created_at timestamptz DEFAULT now()
);

-- Create generation_history table
CREATE TABLE generation_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id uuid REFERENCES writers_profiles(id) ON DELETE SET NULL,
  prompt text NOT NULL,
  result text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE writers_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_history ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY "Anyone can view generation settings"
ON generation_settings FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can manage generation settings"
ON generation_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Only authenticated users can view generation history"
ON generation_history FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can insert generation history"
ON generation_history FOR INSERT
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