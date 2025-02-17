/*
  # Add landing content table

  1. New Tables
    - `landing_content`
      - `id` (uuid, primary key)
      - `section` (text) - Identifies the section (hero, features, etc)
      - `content` (jsonb) - Stores section content
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `landing_content` table
    - Add policies for public read access
    - Add policies for authenticated users to update content

  3. Initial Data
    - Insert default content for all sections
*/

-- Create landing_content table
CREATE TABLE landing_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL UNIQUE,
  content jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE landing_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view landing content"
ON landing_content FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can update landing content"
ON landing_content FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_landing_content_updated_at
  BEFORE UPDATE ON landing_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default content
INSERT INTO landing_content (section, content) VALUES
(
  'hero',
  '{
    "title": "Limpe seu nome e Reconquiste o seu Poder de Compra",
    "subtitle": "Seu nome limpo e sua vida financeira transformada em até 15 dias. Junte-se aos 52.378 brasileiros que já recomeçaram com o LIMPOW!",
    "features": [
      "Análise gratuita em 5 minutos",
      "Atendimento humanizado 24/7",
      "Garantia de resultado ou seu dinheiro de volta"
    ],
    "stats": {
      "title": "Vidas Transformadas",
      "value": "52.378+"
    },
    "image": "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=800&q=80"
  }'::jsonb
),
(
  'how_it_works',
  '{
    "title": "Como Funciona?",
    "subtitle": "Processo simples e transparente em apenas 3 passos",
    "steps": [
      {
        "title": "1. Cadastro Rápido",
        "description": "Em apenas 3 minutos, você estará mais perto de limpar seu nome."
      },
      {
        "title": "2. Análise Completa",
        "description": "Nossa equipe dedicada cuida de tudo para você, sem complicações."
      },
      {
        "title": "3. Nome Limpo",
        "description": "Acompanhe o processo de perto e celebre sua liberdade financeira."
      }
    ]
  }'::jsonb
),
(
  'benefits',
  '{
    "title": "Por que escolher o LIMPOW?",
    "subtitle": "Benefícios exclusivos para sua tranquilidade",
    "items": [
      {
        "title": "Segurança Total",
        "description": "Seus dados protegidos com a mais alta tecnologia"
      },
      {
        "title": "Suporte 24/7",
        "description": "Atendimento humanizado a qualquer momento"
      },
      {
        "title": "Processo Legal",
        "description": "100% dentro da lei e com garantia de resultado"
      },
      {
        "title": "Melhor Preço",
        "description": "Valores justos e parcelamento facilitado"
      }
    ]
  }'::jsonb
),
(
  'testimonials',
  '{
    "title": "O que dizem nossos clientes",
    "subtitle": "Histórias reais de pessoas que transformaram suas vidas",
    "videos": [
      {
        "id": "8aYkvrvuRgA",
        "title": "Depoimento 1"
      },
      {
        "id": "7xYCg9dp1SE",
        "title": "Depoimento 2"
      }
    ],
    "images": [
      "56wjQq4/2cf5412b-6b69-4d75-8fee-8a63e36f2bb7",
      "hdNWBwg/8d2bf022-3f7a-4c55-bcff-b9342b140445",
      "7vgr5gf/34ef6257-e262-4a6d-b8f5-da07ad160083",
      "VL3RvMr/bb5bc77e-ba69-42aa-b6fb-efd53a54631b",
      "rtxT5zK/d54fe6d6-2a67-4bd2-aa04-b6c9eaccf4c5",
      "0MV6pDN/ef333021-d295-4aab-a9da-071226ace6ef"
    ]
  }'::jsonb
),
(
  'cta',
  '{
    "title": "Pronto para reconquistar sua liberdade financeira?",
    "subtitle": "Junte-se aos milhares de brasileiros que já limparam seu nome com a LIMPOW",
    "primary_button": {
      "text": "Começar Agora",
      "url": "https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
    },
    "secondary_button": {
      "text": "Falar com Consultor",
      "url": "https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
    }
  }'::jsonb
);