-- Create writer_virtual_profiles table
CREATE TABLE writer_virtual_profiles (
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

-- Create writer_virtual_articles table
CREATE TABLE writer_virtual_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  keywords text[] NOT NULL,
  target_audience text NOT NULL,
  length text NOT NULL CHECK (length IN ('short', 'medium', 'long')),
  required_sections text[] NOT NULL,
  reference_links text[],
  writer_id uuid REFERENCES writer_virtual_profiles(id) ON DELETE SET NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  content text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create writer_virtual_history table
CREATE TABLE writer_virtual_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id uuid REFERENCES writer_virtual_profiles(id) ON DELETE SET NULL,
  article_id uuid REFERENCES writer_virtual_articles(id) ON DELETE SET NULL,
  prompt text NOT NULL,
  result text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create updated_at triggers
CREATE TRIGGER update_writer_virtual_profiles_updated_at
  BEFORE UPDATE ON writer_virtual_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_writer_virtual_articles_updated_at
  BEFORE UPDATE ON writer_virtual_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE writer_virtual_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_virtual_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_virtual_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view writer profiles"
ON writer_virtual_profiles FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can manage writer profiles"
ON writer_virtual_profiles 
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Only authenticated users can view articles"
ON writer_virtual_articles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can manage articles"
ON writer_virtual_articles
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Only authenticated users can view history"
ON writer_virtual_history FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can insert history"
ON writer_virtual_history FOR INSERT
TO authenticated
WITH CHECK (true);

-- Insert default writer profiles
INSERT INTO writer_virtual_profiles (name, expertise, style, tone, typical_phrases) VALUES
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