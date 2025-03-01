/*
  # Add plans management

  1. New Tables
    - `plans`
      - `id` (uuid, primary key)
      - `name` (text) - Plan name
      - `price` (integer) - Plan price in cents
      - `features` (text[]) - List of plan features
      - `max_debt` (integer) - Maximum debt amount
      - `support_type` (text) - Type of support
      - `deadline` (integer) - Deadline in days
      - `button_url` (text) - URL for the plan button
      - `highlighted` (boolean) - Whether the plan is highlighted
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `plans` table
    - Add policies for authenticated users
*/

-- Create plans table
CREATE TABLE plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price integer NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  max_debt integer,
  support_type text,
  deadline integer,
  button_url text,
  highlighted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view plans"
ON plans FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can insert plans"
ON plans FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Only authenticated users can update plans"
ON plans FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete plans"
ON plans FOR DELETE
TO authenticated
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_plans_updated_at
  BEFORE UPDATE ON plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default plans
INSERT INTO plans (
  name,
  price,
  features,
  max_debt,
  support_type,
  deadline,
  button_url,
  highlighted
) VALUES 
(
  'Básico',
  34900,
  ARRAY[
    'Dívidas até R$ 1.699',
    'Análise completa',
    'Suporte por email',
    'Prazo: 29 dias'
  ],
  169900,
  'email',
  29,
  'https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome',
  false
),
(
  'Recomendado',
  43900,
  ARRAY[
    'Dívidas até R$ 49.999',
    'Análise completa',
    'Suporte prioritário',
    'Prazo: 21 dias'
  ],
  4999900,
  'priority',
  21,
  'https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome',
  true
),
(
  'Premium',
  59900,
  ARRAY[
    'Dívidas acima de R$ 50.000',
    'Análise completa',
    'Suporte VIP 24/7',
    'Prazo: 15 dias'
  ],
  null,
  'vip',
  15,
  'https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome',
  false
);