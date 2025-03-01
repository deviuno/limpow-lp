/*
  # Add Initial Blog Posts

  1. New Content
    - Adds 10 new blog posts with diverse financial content
    - Posts are distributed across different categories
    - Each post includes title, content, excerpt, and metadata
    - Featured images from Unsplash
*/

-- Insert blog posts
INSERT INTO posts (
  title,
  slug,
  content,
  excerpt,
  featured_image,
  category_id,
  status,
  meta_title,
  meta_description,
  author_id,
  featured,
  published_at
) VALUES
-- Post 1: Comprehensive Guide
(
  'Como Negociar Dívidas em 2024: O Guia Definitivo',
  'como-negociar-dividas-2024-guia-definitivo',
  '# Como Negociar Dívidas em 2024: O Guia Definitivo

## Introdução

Estar endividado pode ser uma situação extremamente estressante, mas com as estratégias certas, é possível reverter esse quadro. Este guia completo vai te mostrar como negociar suas dívidas de forma eficiente em 2024.

## 1. Faça um Diagnóstico Financeiro

Antes de começar qualquer negociação, é fundamental:

- Listar todas as suas dívidas
- Identificar credores e valores
- Verificar taxas de juros
- Priorizar as dívidas mais urgentes

## 2. Conheça Seus Direitos

Como consumidor, você tem direitos garantidos por lei:

- Direito à informação clara
- Possibilidade de renegociação
- Proteção contra práticas abusivas
- Limitação de juros

## 3. Estratégias de Negociação

### 3.1 Preparação

- Defina quanto pode pagar mensalmente
- Reúna documentação necessária
- Pesquise condições oferecidas pelo mercado

### 3.2 Durante a Negociação

- Seja realista com suas propostas
- Peça descontos nos juros
- Solicite a exclusão de seu nome dos órgãos de proteção
- Exija um documento formal do acordo

## 4. Após o Acordo

- Guarde todos os comprovantes
- Monitore a retirada do nome dos órgãos de proteção
- Mantenha os pagamentos em dia
- Reorganize seu orçamento

## 5. Prevenção de Novas Dívidas

- Crie um orçamento realista
- Estabeleça uma reserva de emergência
- Evite compras por impulso
- Monitore seus gastos regularmente

## Conclusão

Negociar dívidas requer planejamento e persistência. Com as orientações deste guia, você estará mais preparado para conquistar sua liberdade financeira.',
  'Aprenda as melhores estratégias para negociar suas dívidas em 2024. Um guia completo com dicas práticas, direitos do consumidor e técnicas de negociação.',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200',
  (SELECT id FROM categories WHERE slug = 'guias'),
  'published',
  'Como Negociar Dívidas em 2024 | Guia Completo',
  'Guia definitivo sobre negociação de dívidas em 2024. Aprenda estratégias eficientes para sair do vermelho e recuperar seu crédito.',
  (SELECT id FROM auth.users WHERE email = 'admin@limpow.com.br'),
  true,
  now()
),

-- Post 2: Financial Education
(
  '7 Hábitos Financeiros que Vão Mudar Sua Vida',
  '7-habitos-financeiros-que-vao-mudar-sua-vida',
  '# 7 Hábitos Financeiros que Vão Mudar Sua Vida

A educação financeira é a base para uma vida próspera. Conheça os 7 hábitos que podem transformar sua relação com o dinheiro.

## 1. Planejamento Financeiro

O primeiro passo é ter um plano claro:
- Registre todas as receitas e despesas
- Crie metas financeiras realistas
- Revise seu orçamento mensalmente

## 2. Reserva de Emergência

Proteja-se contra imprevistos:
- Guarde 6 a 12 meses de despesas
- Mantenha em investimentos seguros
- Não use para gastos comuns

## 3. Consumo Consciente

Aprenda a gastar com sabedoria:
- Diferencie necessidades de desejos
- Compare preços antes de comprar
- Evite compras por impulso

## 4. Investimentos Regulares

Faça seu dinheiro trabalhar:
- Comece com valores pequenos
- Diversifique aplicações
- Reinvista os rendimentos

## 5. Educação Contínua

Mantenha-se atualizado:
- Leia sobre finanças
- Acompanhe notícias econômicas
- Participe de cursos

## 6. Uso Consciente do Crédito

Crédito pode ser aliado:
- Use com moderação
- Conheça as taxas
- Pague as faturas em dia

## 7. Metas de Longo Prazo

Pense no futuro:
- Planeje a aposentadoria
- Defina objetivos claros
- Monitore seu progresso

## Conclusão

Adotar estes hábitos não é fácil, mas os resultados valem a pena. Comece hoje mesmo!',
  'Descubra os 7 hábitos financeiros essenciais que podem transformar sua vida. Aprenda a gerenciar melhor seu dinheiro e construir um futuro próspero.',
  'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200',
  (SELECT id FROM categories WHERE slug = 'educacao-financeira'),
  'published',
  '7 Hábitos Financeiros Essenciais | Educação Financeira',
  'Aprenda os 7 hábitos financeiros fundamentais que podem transformar sua vida. Dicas práticas para melhor gestão financeira.',
  (SELECT id FROM auth.users WHERE email = 'admin@limpow.com.br'),
  false,
  now()
),

-- Post 3: Credit Score
(
  'Como Aumentar seu Score de Crédito em 90 Dias',
  'como-aumentar-seu-score-de-credito-em-90-dias',
  '# Como Aumentar seu Score de Crédito em 90 Dias

Seu score de crédito é fundamental para sua saúde financeira. Veja como melhorá-lo em apenas 90 dias.

## O que é Score de Crédito?

O score é uma pontuação que indica:
- Seu histórico financeiro
- Probabilidade de pagamento
- Risco de crédito

## Estratégias para 90 Dias

### Primeiro Mês
- Verifique seu relatório de crédito
- Identifique pendências
- Comece a negociar dívidas

### Segundo Mês
- Mantenha pagamentos em dia
- Use menos de 30% do limite
- Evite consultas desnecessárias

### Terceiro Mês
- Diversifique suas fontes de crédito
- Mantenha contas antigas ativas
- Monitore seu progresso

## Dicas Extras

- Cadastre-se no cadastro positivo
- Pague contas antes do vencimento
- Mantenha endereço atualizado

## Conclusão

Com dedicação e as estratégias certas, é possível melhorar significativamente seu score em 90 dias.',
  'Aprenda estratégias práticas para aumentar seu score de crédito em apenas 90 dias. Um guia passo a passo para melhorar sua pontuação de crédito.',
  'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200',
  (SELECT id FROM categories WHERE slug = 'score-de-credito'),
  'published',
  'Aumente seu Score de Crédito em 90 Dias | Guia Completo',
  'Guia prático com estratégias eficientes para aumentar seu score de crédito em 90 dias. Aprenda a melhorar sua pontuação de crédito.',
  (SELECT id FROM auth.users WHERE email = 'admin@limpow.com.br'),
  false,
  now()
),

-- Post 4: Consumer Rights
(
  'Seus Direitos na Hora de Negociar Dívidas',
  'seus-direitos-na-hora-de-negociar-dividas',
  '# Seus Direitos na Hora de Negociar Dívidas

Conheça seus direitos como consumidor e negocie suas dívidas com mais segurança.

## Direitos Básicos

### 1. Informação Clara
- Valores detalhados
- Taxas e juros aplicados
- Condições de pagamento

### 2. Proteção contra Abusos
- Limite de juros
- Proibição de práticas abusivas
- Direito à renegociação

### 3. Documentação
- Contrato por escrito
- Comprovantes de pagamento
- Termo de quitação

## Como Exercer seus Direitos

1. Mantenha registros
2. Exija documentação
3. Busque órgãos de defesa

## Órgãos de Apoio

- Procon
- Defensoria Pública
- Banco Central

## Conclusão

Conhecer seus direitos é fundamental para uma negociação justa e segura.',
  'Entenda seus direitos como consumidor na hora de negociar dívidas. Aprenda a se proteger e garantir uma negociação justa.',
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200',
  (SELECT id FROM categories WHERE slug = 'direitos-do-consumidor'),
  'published',
  'Direitos do Consumidor na Negociação de Dívidas',
  'Guia completo sobre seus direitos como consumidor ao negociar dívidas. Aprenda a se proteger e garantir uma negociação justa.',
  (SELECT id FROM auth.users WHERE email = 'admin@limpow.com.br'),
  false,
  now()
),

-- Post 5: Debt Negotiation
(
  'As 10 Melhores Estratégias para Negociar Dívidas',
  'as-10-melhores-estrategias-para-negociar-dividas',
  '# As 10 Melhores Estratégias para Negociar Dívidas

Aprenda as técnicas mais eficientes para negociar suas dívidas e recuperar seu crédito.

## Estratégias Essenciais

1. Conheça suas dívidas
2. Priorize pagamentos
3. Prepare-se para negociar
4. Use argumentos corretos
5. Peça descontos
6. Documente tudo
7. Negocie prazos
8. Analise propostas
9. Mantenha compromissos
10. Monitore resultados

## Dicas Práticas

- Momento certo
- Abordagem adequada
- Documentação necessária

## Conclusão

Com as estratégias certas, é possível negociar com sucesso.',
  'Conheça as 10 estratégias mais eficientes para negociar suas dívidas. Técnicas práticas e comprovadas para uma negociação bem-sucedida.',
  'https://images.unsplash.com/photo-1554224155-1696413565d3?w=1200',
  (SELECT id FROM categories WHERE slug = 'negociacao-de-dividas'),
  'published',
  '10 Estratégias Eficientes para Negociação de Dívidas',
  'Aprenda as 10 melhores estratégias para negociar suas dívidas com sucesso. Técnicas práticas e eficientes.',
  (SELECT id FROM auth.users WHERE email = 'admin@limpow.com.br'),
  false,
  now()
),

-- Post 6: Financial Planning
(
  'Planejamento Financeiro: Por Onde Começar?',
  'planejamento-financeiro-por-onde-comecar',
  '# Planejamento Financeiro: Por Onde Começar?

Um guia prático para iniciar seu planejamento financeiro e conquistar seus objetivos.

## Primeiros Passos

1. Diagnóstico financeiro
2. Definição de metas
3. Criação de orçamento
4. Controle de gastos

## Ferramentas Úteis

- Planilhas
- Aplicativos
- Anotações

## Dicas Importantes

- Seja realista
- Mantenha registros
- Revise periodicamente

## Conclusão

Comece hoje seu planejamento financeiro!',
  'Aprenda como iniciar seu planejamento financeiro de forma prática e eficiente. Um guia completo para organizar suas finanças.',
  'https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?w=1200',
  (SELECT id FROM categories WHERE slug = 'planejamento-financeiro'),
  'published',
  'Guia Inicial de Planejamento Financeiro',
  'Aprenda como começar seu planejamento financeiro do zero. Dicas práticas e ferramentas úteis.',
  (SELECT id FROM auth.users WHERE email = 'admin@limpow.com.br'),
  false,
  now()
),

-- Post 7: Credit Card Tips
(
  'Como Usar o Cartão de Crédito de Forma Inteligente',
  'como-usar-cartao-credito-forma-inteligente',
  '# Como Usar o Cartão de Crédito de Forma Inteligente

Aprenda a usar o cartão de crédito como aliado e não como inimigo das suas finanças.

## Uso Consciente

1. Controle de gastos
2. Pagamento em dia
3. Benefícios e vantagens
4. Evitar armadilhas

## Dicas Práticas

- Limite adequado
- Fatura única
- Compras planejadas

## Conclusão

Use o crédito a seu favor!',
  'Descubra como usar seu cartão de crédito de maneira inteligente e responsável. Dicas práticas para evitar dívidas e aproveitar benefícios.',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200',
  (SELECT id FROM categories WHERE slug = 'dicas-financeiras'),
  'published',
  'Uso Inteligente do Cartão de Crédito | Guia Completo',
  'Aprenda a usar seu cartão de crédito de forma inteligente e responsável. Dicas para evitar dívidas.',
  (SELECT id FROM auth.users WHERE email = 'admin@limpow.com.br'),
  false,
  now()
),

-- Post 8: Emergency Fund
(
  'Reserva de Emergência: Quanto Guardar e Como Começar',
  'reserva-de-emergencia-quanto-guardar-como-comecar',
  '# Reserva de Emergência: Quanto Guardar e Como Começar

Aprenda a importância da reserva de emergência e como construí-la.

## Por Que Ter?

1. Segurança financeira
2. Imprevistos
3. Oportunidades
4. Tranquilidade

## Como Começar

- Definir valor
- Escolher investimentos
- Poupar regularmente

## Conclusão

Comece sua reserva hoje!',
  'Saiba como criar e manter uma reserva de emergência eficiente. Aprenda quanto guardar e as melhores formas de investir.',
  'https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=1200',
  (SELECT id FROM categories WHERE slug = 'planejamento-financeiro'),
  'published',
  'Guia Completo sobre Reserva de Emergência',
  'Aprenda a criar e manter uma reserva de emergência eficiente. Dicas práticas e estratégias de investimento.',
  (SELECT id FROM auth.users WHERE email = 'admin@limpow.com.br'),
  false,
  now()
),

-- Post 9: Investment Basics
(
  'Investimentos para Iniciantes: Guia Básico',
  'investimentos-para-iniciantes-guia-basico',
  '# Investimentos para Iniciantes: Guia Básico

Um guia simples para começar a investir seu dinheiro.

## Conceitos Básicos

1. Renda fixa
2. Renda variável
3. Riscos
4. Retornos

## Por Onde Começar

- Tesouro Direto
- Poupança
- CDB
- Fundos

## Conclusão

Invista com conhecimento!',
  'Comece a investir seu dinheiro de forma consciente e segura. Um guia completo para iniciantes no mundo dos investimentos.',
  'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200',
  (SELECT id FROM categories WHERE slug = 'educacao-financeira'),
  'published',
  'Guia de Investimentos para Iniciantes',
  'Aprenda os conceitos básicos de investimentos e comece a investir seu dinheiro de forma consciente.',
  (SELECT id FROM auth.users WHERE email = 'admin@limpow.com.br'),
  false,
  now()
),

-- Post 10: Debt Prevention
(
  'Como Evitar Dívidas: 12 Dicas Práticas',
  'como-evitar-dividas-12-dicas-praticas',
  '# Como Evitar Dívidas: 12 Dicas Práticas

Aprenda a manter suas finanças saudáveis e evitar o endividamento.

## Dicas Essenciais

1. Orçamento realista
2. Controle de gastos
3. Reserva de emergência
4. Uso consciente do crédito
5. Planejamento de compras
6. Educação financeira
7. Renda extra
8. Economia doméstica
9. Comparação de preços
10. Metas financeiras
11. Hábitos saudáveis
12. Revisão periódica

## Conclusão

Prevenção é o melhor remédio!',
  'Conheça 12 dicas práticas e eficientes para evitar dívidas e manter suas finanças saudáveis. Estratégias simples para uma vida financeira equilibrada.',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
  (SELECT id FROM categories WHERE slug = 'dicas-financeiras'),
  'published',
  '12 Dicas Práticas para Evitar Dívidas',
  'Aprenda 12 estratégias eficientes para evitar dívidas e manter suas finanças saudáveis.',
  (SELECT id FROM auth.users WHERE email = 'admin@limpow.com.br'),
  false,
  now()
);