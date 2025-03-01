import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles,
  Settings2,
  FileText,
  X,
  Loader2,
  AlertCircle,
  Save,
  ChevronRight
} from 'lucide-react';
import { generateArticle } from '../../lib/openai';
import { supabase } from '../../lib/supabase';

function AIGenerator() {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [aiConfig, setAIConfig] = useState({
    prompt: '',
    model: 'gpt-4',
    pointOfView: 'third',
    category: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err.message);
      setError('Erro ao carregar categorias');
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);

    try {
      const content = await generateArticle(
        aiConfig.prompt,
        aiConfig.model,
        aiConfig.pointOfView
      );

      setGeneratedContent(content);
    } catch (err) {
      setError(err.message || 'Erro ao gerar artigo');
    } finally {
      setGenerating(false);
    }
  };

  const handleCreatePost = () => {
    navigate('/admin/posts/new', {
      state: {
        content: generatedContent,
        category_id: aiConfig.category
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerador de Artigos com IA</h1>
          <p className="text-gray-600">Crie artigos de alta qualidade com ajuda da inteligência artificial</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 text-red-800 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#11CD80]/10 flex items-center justify-center">
                <Settings2 className="w-5 h-5 text-[#11CD80]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Configurações</h2>
                <p className="text-gray-600">Personalize a geração do seu artigo</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prompt
                </label>
                <textarea
                  value={aiConfig.prompt}
                  onChange={(e) => setAIConfig(prev => ({ ...prev, prompt: e.target.value }))}
                  placeholder="Descreva o artigo que você quer gerar..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={aiConfig.category}
                  onChange={(e) => setAIConfig(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modelo
                  </label>
                  <select
                    value={aiConfig.model}
                    onChange={(e) => setAIConfig(prev => ({ ...prev, model: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  >
                    <option value="gpt-4">GPT-4 (Melhor qualidade)</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 (Mais rápido)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ponto de Vista
                  </label>
                  <select
                    value={aiConfig.pointOfView}
                    onChange={(e) => setAIConfig(prev => ({ ...prev, pointOfView: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  >
                    <option value="third">Terceira Pessoa (Profissional)</option>
                    <option value="first">Primeira Pessoa (Pessoal)</option>
                    <option value="random">Misto (Dinâmico)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating || !aiConfig.prompt || !aiConfig.category}
                className="w-full bg-[#11CD80] text-white px-6 py-3 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Gerar Artigo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#11CD80]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#11CD80]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Prévia do Artigo</h2>
                <p className="text-gray-600">Visualize o conteúdo gerado</p>
              </div>
            </div>
            {generatedContent && (
              <button
                onClick={handleCreatePost}
                className="bg-[#11CD80] text-white px-4 py-2 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center gap-2"
              >
                Criar Post
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="prose max-w-none">
            {generating ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#11CD80] animate-spin" />
              </div>
            ) : generatedContent ? (
              <div dangerouslySetInnerHTML={{ __html: generatedContent }} />
            ) : (
              <div className="text-center py-12 text-gray-500">
                Configure e gere um artigo para visualizar a prévia aqui
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIGenerator;