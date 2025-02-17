/*
  # Criar tabela de configurações do admin
  
  1. Nova Tabela
    - `admin_settings`
      - `id` (uuid, primary key)
      - `password_hash` (text, não nulo)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS
    - Adicionar política para leitura/atualização apenas com a chave anon
*/

CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  password_hash text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura/atualização com a chave anon
CREATE POLICY "Allow anon access to admin_settings"
  ON admin_settings
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Inserir senha padrão inicial (123456)
INSERT INTO admin_settings (password_hash) 
VALUES ('$2a$10$xVfYx9JTr0RYrPmFrRd7..QkwWqHwXK.0uO9kD7.j8VzxU1KY2K6q');