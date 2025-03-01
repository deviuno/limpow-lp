import { supabase } from './supabase';
import { generateTitles as generateTitlesFromOpenAI } from './openai';

// Writer Profiles
export const getWriterProfiles = async () => {
  try {
    const { data, error } = await supabase
      .from('writer_virtual_profiles')
      .select('*')
      .order('created_at');

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error fetching writer profiles:', err.message);
    return { data: null, error: err.message };
  }
};

export const getWriterProfile = async (id) => {
  try {
    const { data, error } = await supabase
      .from('writer_virtual_profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error fetching writer profile:', err.message);
    return { data: null, error: err.message };
  }
};

export const createWriterProfile = async (profileData) => {
  try {
    const { data, error } = await supabase
      .from('writer_virtual_profiles')
      .insert([profileData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error creating writer profile:', err.message);
    return { data: null, error: err.message };
  }
};

export const updateWriterProfile = async (id, profileData) => {
  try {
    const { data, error } = await supabase
      .from('writer_virtual_profiles')
      .update(profileData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error updating writer profile:', err.message);
    return { data: null, error: err.message };
  }
};

// Articles
export const createArticle = async (articleData) => {
  try {
    const { data, error } = await supabase
      .from('writer_virtual_articles')
      .insert([articleData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error creating article:', err.message);
    return { data: null, error: err.message };
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const { data, error } = await supabase
      .from('writer_virtual_articles')
      .update(articleData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error updating article:', err.message);
    return { data: null, error: err.message };
  }
};

export const getArticle = async (id) => {
  try {
    const { data, error } = await supabase
      .from('writer_virtual_articles')
      .select(`
        *,
        writer:writer_virtual_profiles(*),
        category:categories(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error fetching article:', err.message);
    return { data: null, error: err.message };
  }
};

export const getArticles = async (filters = {}) => {
  try {
    let query = supabase
      .from('writer_virtual_articles')
      .select(`
        *,
        writer:writer_virtual_profiles(*),
        category:categories(*)
      `)
      .order('created_at', { ascending: false });

    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.writer_id) {
      query = query.eq('writer_id', filters.writer_id);
    }
    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error fetching articles:', err.message);
    return { data: null, error: err.message };
  }
};

// History
export const recordGeneration = async (writerId, articleId, prompt, result, metadata = {}) => {
  try {
    const { error } = await supabase
      .from('writer_virtual_history')
      .insert([{
        writer_id: writerId,
        article_id: articleId,
        prompt,
        result,
        metadata
      }]);

    if (error) throw error;
    return { error: null };
  } catch (err) {
    console.error('Error recording generation:', err.message);
    return { error: err.message };
  }
};

// Re-export generateTitles from openai
export const generateTitles = async (quantity = 5) => {
  try {
    return await generateTitlesFromOpenAI(quantity);
  } catch (error) {
    console.error('Erro ao gerar títulos:', error);
    throw new Error(error.message || 'Erro ao gerar títulos. Por favor, tente novamente.');
  }
};

// Generate Article
export const generateArticleContent = async (writer, article) => {
  try {
    const { data: settings } = await supabase
      .from('settings')
      .select('openai_api_key')
      .single();

    if (!settings?.openai_api_key) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = generatePrompt(writer, article);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.openai_api_key}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: getSystemPrompt(writer) },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2500
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate article');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Record generation
    await recordGeneration(writer.id, article.id, prompt, content);

    return content;
  } catch (error) {
    console.error('Error generating article:', error);
    throw error;
  }
};

// Helper functions
const getSystemPrompt = (writer) => {
  return `Você é ${writer.name}, um escritor especialista em ${writer.expertise.join(', ')}.
Seu estilo de escrita é ${writer.style} e seu tom de voz é ${writer.tone}.

Use estas frases típicas em sua escrita:
${writer.typical_phrases.map(phrase => `- "${phrase}"`).join('\n')}

Mantenha consistência com esta persona ao longo do artigo.`;
};

const generatePrompt = (writer, article) => `
Escreva um artigo sobre "${article.title}" seguindo estas diretrizes:

Use seu conhecimento em ${writer.expertise.join(', ')}
Mantenha um tom ${writer.tone}
Inclua exemplos práticos e casos reais
Use analogias e metáforas para explicar conceitos complexos
Termine com uma conclusão acionável

Público-alvo: ${article.target_audience}
Palavras-chave: ${article.keywords.join(', ')}
Extensão: ${article.length}

Estrutura obrigatória:
${article.required_sections.map(section => `- ${section}`).join('\n')}

${article.article_references?.length > 0 ? `\nReferências a incluir:\n${article.article_references.join('\n')}` : ''}`;

// Generate Article