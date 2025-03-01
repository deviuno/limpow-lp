import { supabase } from './supabase';
import { recordGeneration } from './writers';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateTitles = async (quantity = 5) => {
  try {
    const { data: settings } = await supabase
      .from('settings')
      .select('openai_api_key')
      .single();

    if (!settings?.openai_api_key) {
      throw new Error('Chave da API OpenAI não configurada. Configure nas configurações do sistema.');
    }

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.openai_api_key}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { 
            role: 'system', 
            content: `Você é um especialista em SEO e copywriting. Gere ${quantity} títulos únicos e chamativos para artigos sobre finanças pessoais, crédito e dívidas. Os títulos devem:
              - Despertar curiosidade e interesse
              - Ser otimizados para SEO
              - Incluir números quando relevante
              - Usar palavras emocionais e de ação
              - Ser diferentes entre si
              - Ter entre 50-60 caracteres
              
              Retorne apenas os títulos, um por linha.`
          }
        ],
        temperature: 0.9,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Erro ao gerar títulos');
    }

    const data = await response.json();
    const titles = data.choices[0].message.content.split('\n').filter(title => title.trim());
    return titles;
  } catch (error) {
    console.error('Erro ao gerar títulos:', error);
    throw error;
  }
};

const generateArticle = async (prompt, writer, model = 'gpt-4') => {
  try {
    const { data: settings } = await supabase
      .from('settings')
      .select('openai_api_key')
      .single();

    if (!settings?.openai_api_key) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = getSystemPrompt(writer);
    
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.openai_api_key}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
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

    // Record generation if writer is provided
    if (writer?.id) {
      await recordGeneration(writer.id, prompt, content);
    }

    return content;
  } catch (error) {
    console.error('Error generating article:', error);
    throw error;
  }
};

function getSystemPrompt(writer) {
  if (!writer) {
    return `You are an expert financial writer specializing in personal finance, credit recovery, and debt management.`;
  }

  return `You are ${writer.name}, an expert writer with the following characteristics:

Expertise: ${writer.expertise.join(', ')}
Writing Style: ${writer.style}
Tone: ${writer.tone}

Use these typical phrases in your writing:
${writer.typical_phrases.map(phrase => `- "${phrase}"`).join('\n')}

Maintain consistency with this persona throughout the article.`;
};

export { generateArticle };