/*
  # Configuração do usuário admin

  1. Configurações
    - Cria índice único para email
    - Cria usuário admin com email e senha específicos
    - Configura metadados do usuário
*/

-- Criar índice único para email se não existir
CREATE UNIQUE INDEX IF NOT EXISTS users_email_idx ON auth.users (email);

-- Inserir usuário admin
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@limpow.com.br',
  crypt('123456', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Rodrigo","phone":"11998058119","role":"admin"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
)
ON CONFLICT (email) DO NOTHING;