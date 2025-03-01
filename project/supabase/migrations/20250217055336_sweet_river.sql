/*
  # Adicionar post inicial
  
  1. Novo Conteúdo
    - Adiciona um post inicial para testar a funcionalidade do blog
    
  2. Dados
    - Post com título, conteúdo e categoria
    - Status publicado para aparecer no blog
*/

INSERT INTO posts (
  title,
  slug,
  content,
  excerpt,
  category_id,
  status,
  author_id,
  published_at
) VALUES (
  'Como limpar seu nome em 2024: Guia Completo',
  'como-limpar-seu-nome-2024',
  '# Como limpar seu nome em 2024

Estar com o nome sujo pode ser um verdadeiro pesadelo. Além de dificultar o acesso ao crédito, essa situação pode afetar várias áreas da sua vida, desde a busca por um emprego até o aluguel de um imóvel.

## 1. Entenda sua situação

O primeiro passo para limpar seu nome é entender exatamente qual é sua situação. Isso significa:

- Consultar seu CPF nos principais órgãos de proteção ao crédito
- Identificar todas as dívidas em seu nome
- Verificar os valores atualizados de cada débito
- Confirmar a legitimidade das cobranças

## 2. Organize suas finanças

Antes de começar as negociações, é fundamental organizar suas finanças para evitar novos problemas no futuro.',
  'Descubra as melhores estratégias para limpar seu nome e recuperar seu crédito neste ano.',
  (SELECT id FROM categories WHERE slug = 'guias' LIMIT 1),
  'published',
  (SELECT id FROM auth.users WHERE email = 'admin@limpow.com.br' LIMIT 1),
  now()
);