/*
  # Add Initial Blog Categories

  1. New Data
    - Adds 7 essential categories for the blog:
      - Guias (Guides)
      - Dicas Financeiras (Financial Tips)
      - Direitos do Consumidor (Consumer Rights)
      - Negociação de Dívidas (Debt Negotiation)
      - Educação Financeira (Financial Education)
      - Planejamento Financeiro (Financial Planning)
      - Score de Crédito (Credit Score)

  2. Purpose
    - Provides initial content structure
    - Covers main topics related to financial health
    - Helps users find relevant content easily
*/

-- Insert initial categories
INSERT INTO categories (name, slug, description, color, image_url) VALUES
  (
    'Guias',
    'guias',
    'Guias completos e passo a passo para limpar seu nome e recuperar seu crédito',
    '#11CD80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400'
  ),
  (
    'Dicas Financeiras',
    'dicas-financeiras',
    'Dicas práticas para manter suas finanças saudáveis e evitar novas dívidas',
    '#FDE047',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400'
  ),
  (
    'Direitos do Consumidor',
    'direitos-do-consumidor',
    'Informações sobre seus direitos e como se proteger legalmente',
    '#60A5FA',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400'
  ),
  (
    'Negociação de Dívidas',
    'negociacao-de-dividas',
    'Estratégias e técnicas para negociar suas dívidas com sucesso',
    '#F472B6',
    'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400'
  ),
  (
    'Educação Financeira',
    'educacao-financeira',
    'Aprenda conceitos fundamentais para uma vida financeira saudável',
    '#818CF8',
    'https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?w=400'
  ),
  (
    'Planejamento Financeiro',
    'planejamento-financeiro',
    'Ferramentas e métodos para planejar seu futuro financeiro',
    '#34D399',
    'https://images.unsplash.com/photo-1554224155-1696413565d3?w=400'
  ),
  (
    'Score de Crédito',
    'score-de-credito',
    'Entenda como funciona seu score e aprenda a melhorá-lo',
    '#FB923C',
    'https://images.unsplash.com/photo-1617934277616-8b56fae892c6?w=400'
  );