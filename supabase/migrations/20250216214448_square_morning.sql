/*
  # Criar tabela de categorias

  1. Nova Tabela
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, não nulo)
      - `slug` (text, único)
      - `description` (text)
      - `icon` (text)
      - `color` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Habilitar RLS
    - Adicionar políticas para leitura pública
    - Adicionar políticas para escrita apenas por usuários autenticados
*/

-- Criar tabela de categorias
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  color text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- Política para inserção/atualização apenas por usuários autenticados
CREATE POLICY "Categories can be created by authenticated users only" ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Categories can be updated by authenticated users only" ON categories
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Categories can be deleted by authenticated users only" ON categories
  FOR DELETE
  TO authenticated
  USING (true);

-- Função para atualizar o updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar o updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();