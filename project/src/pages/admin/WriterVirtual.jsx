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
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Wand2
} from 'lucide-react';
import { 
  getWriterProfiles,
  createWriterProfile,
  updateWriterProfile,
  createArticle,
  generateArticleContent,
  generateTitles
} from '../../lib/writerVirtual';
import { supabase } from '../../lib/supabase';

function WriterVirtual() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [writers, setWriters] = useState([]);
  const [showWriterForm, setShowWriterForm] = useState(false);
  const [editingWriter, setEditingWriter] = useState(null);
  const [showTitleGenerator, setShowTitleGenerator] = useState(false);
  const [titleQuantity, setTitleQuantity] = useState(5);
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [generatingTitles, setGeneratingTitles] = useState(false);
  const [writerFormData, setWriterFormData] = useState({
    name: '',
    expertise: [],
    style: '',
    tone: '',
    typical_phrases: ['']
  });
  const [articleData, setArticleData] = useState({
    title: '',
    keywords: [],
    keywords_auto: true,
    target_audience: '',
    length: 'medium',
    length_auto: true,
    required_sections: [],
    required_sections_auto: true,
    article_references: [],
    writer_id: '',
    category_id: '',
    image_source: 'unsplash',
    auto_publish: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [writersResult, categoriesResult] = await Promise.all([
        getWriterProfiles(),
        supabase.from('categories').select('*').order('name')
      ]);

      if (writersResult.error) throw writersResult.error;
      if (categoriesResult.error) throw categoriesResult.error;

      setWriters(writersResult.data);
      setCategories(categoriesResult.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPhrase = () => {
    setWriterFormData(prev => ({
      ...prev,
      typical_phrases: [...prev.typical_phrases, '']
    }));
  };

  const handleRemovePhrase = (index) => {
    setWriterFormData(prev => ({
      ...prev,
      typical_phrases: prev.typical_phrases.filter((_, i) => i !== index)
    }));
  };

  const handlePhraseChange = (index, value) => {
    setWriterFormData(prev => {
      const newPhrases = [...prev.typical_phrases];
      newPhrases[index] = value;
      return { ...prev, typical_phrases: newPhrases };
    });
  };

  const handleSaveWriter = async () => {
    try {
      if (editingWriter) {
        await updateWriterProfile(editingWriter.id, writerFormData);
      } else {
        await createWriterProfile(writerFormData);
      }
      
      fetchData();
      setShowWriterForm(false);
      setEditingWriter(null);
      setWriterFormData({
        name: '',
        expertise: [],
        style: '',
        tone: '',
        typical_phrases: ['']
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditWriter = (writer) => {
    setEditingWriter(writer);
    setWriterFormData({
      name: writer.name,
      expertise: writer.expertise,
      style: writer.style,
      tone: writer.tone,
      typical_phrases: writer.typical_phrases
    });
    setShowWriterForm(true);
  };

  const handleGenerateTitles = async () => {
    setGeneratingTitles(true);
    try {
      const titles = await generateTitles(titleQuantity);
      setGeneratedTitles(titles);
      setSelectedTitles(titles); // Seleciona todos por padrão
    } catch (err) {
      setError('Erro ao gerar títulos: ' + err.message);
    } finally {
      setGeneratingTitles(false);
    }
  };

  const handleAddTitles = () => {
    const currentTitles = articleData.title.split('\n').filter(t => t.trim());
    const newTitles = [...currentTitles, ...selectedTitles];
    setArticleData(prev => ({ 
      ...prev, 
      title: newTitles.join('\n')
    }));
    setShowTitleGenerator(false);
    setGeneratedTitles([]);
    setSelectedTitles([]);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);

    try {
      const writer = writers.find(w => w.id === articleData.writer_id);
      if (!writer) throw new Error('Selecione um escritor');

      // Create article first
      const { data: article, error: articleError } = await createArticle(articleData);
      if (articleError) throw articleError;

      // Generate content
      const content = await generateArticleContent(writer, article);

      // Update article with generated content
      await updateArticle(article.id, { content });

      // Navigate to edit post
      navigate('/admin/posts/new', {
        state: {
          content,
          category_id: articleData.category_id,
          title: articleData.title
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#11CD80] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Escritor Virtual</h1>
          <p className="text-gray-600">Configure e gere artigos com diferentes personalidades</p>
        </div>
        <button
          onClick={() => setShowWriterForm(true)}
          className="bg-[#11CD80] text-white px-4 py-2 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Escritor
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 text-red-800 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Writers List */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#11CD80]/10 flex items-center justify-center">
                <Settings2 className="w-5 h-5 text-[#11CD80]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Escritores</h2>
                <p className="text-gray-600">Selecione ou configure um escritor</p>
              </div>
            </div>

            <div className="space-y-4">
              {writers.map((writer) => (
                <div
                  key={writer.id}
                  className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                    articleData.writer_id === writer.id
                      ? 'border-[#11CD80] bg-[#11CD80]/5'
                      : 'border-gray-100 hover:border-[#11CD80] hover:bg-[#11CD80]/5'
                  }`}
                  onClick={() => setArticleData(prev => ({ ...prev, writer_id: writer.id }))}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{writer.name}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditWriter(writer);
                        }}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Implement delete
                        }}
                        className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Expertise:</span>{' '}
                      {writer.expertise.join(', ')}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Estilo:</span> {writer.style}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Tom:</span> {writer.tone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Article Configuration */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#11CD80]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#11CD80]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Configuração do Artigo</h2>
                <p className="text-gray-600">Configure o artigo a ser gerado</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <div className="relative">
                  <textarea
                    value={articleData.title}
                    onChange={(e) => {
                      const lines = e.target.value.split('\n');
                      if (lines.length <= 10) {
                        setArticleData(prev => ({ ...prev, title: e.target.value }));
                      }
                    }}
                    placeholder="Para gerar mais de um artigo coloque os títulos um por linha"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent resize-none"
                  />
                  <button
                    onClick={() => setShowTitleGenerator(true)}
                    className="absolute top-2 right-2 bg-[#11CD80] text-white px-3 py-1 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center gap-1 text-sm"
                  >
                    <Wand2 className="w-4 h-4" />
                    Gerar
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={articleData.category_id}
                  onChange={(e) => setArticleData(prev => ({ ...prev, category_id: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                >
                  <option value="">Automático</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palavras-chave
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={articleData.keywords_auto}
                      onChange={(e) => setArticleData(prev => ({ 
                        ...prev, 
                        keywords_auto: e.target.checked,
                        keywords: e.target.checked ? [] : prev.keywords
                      }))}
                      className="rounded text-[#11CD80] focus:ring-[#11CD80]"
                    />
                    <span className="text-sm text-gray-600">Automático</span>
                  </div>
                  <input
                    type="text"
                    value={articleData.keywords.join(', ')}
                    onChange={(e) => setArticleData(prev => ({
                      ...prev,
                      keywords: e.target.value.split(',').map(k => k.trim())
                    }))}
                    placeholder="Separe as palavras-chave por vírgula"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                    disabled={articleData.keywords_auto}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Público-alvo
                </label>
                <div className="relative">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {articleData.target_audience.split(',')
                      .map(t => t.trim())
                      .filter(t => t)
                      .map((target, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#11CD80]/10 text-[#11CD80]"
                        >
                          {target}
                          <button
                            onClick={() => {
                              const newTargets = articleData.target_audience
                                .split(',')
                                .map(t => t.trim())
                                .filter((_, i) => i !== index)
                                .join(', ');
                              setArticleData(prev => ({ ...prev, target_audience: newTargets }));
                            }}
                            className="hover:bg-[#11CD80]/20 rounded-full p-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Selecione ou digite e pressione Enter"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = e.target.value.trim();
                        if (value) {
                          const currentTargets = articleData.target_audience.split(',').map(t => t.trim()).filter(t => t);
                          if (!currentTargets.includes(value)) {
                            setArticleData(prev => ({
                              ...prev,
                              target_audience: [...currentTargets, value].join(', ')
                            }));
                          }
                          e.target.value = '';
                        }
                      }
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.endsWith(',')) {
                        const newValue = value.slice(0, -1).trim();
                        if (newValue) {
                          const currentTargets = articleData.target_audience.split(',').map(t => t.trim()).filter(t => t);
                          if (!currentTargets.includes(newValue)) {
                            setArticleData(prev => ({
                              ...prev,
                              target_audience: [...currentTargets, newValue].join(', ')
                            }));
                          }
                          e.target.value = '';
                        }
                      }
                    }}
                    list="target-audiences"
                  />
                  <datalist id="target-audiences">
                    <option value="Baixa renda" />
                    <option value="Endividados" />
                    <option value="Renda extra" />
                    <option value="Empresários falidos" />
                  </datalist>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    Enter ou vírgula para adicionar
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extensão
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={articleData.length_auto}
                      onChange={(e) => setArticleData(prev => ({ 
                        ...prev, 
                        length_auto: e.target.checked,
                        length: e.target.checked ? 'auto' : 'medium'
                      }))}
                      className="rounded text-[#11CD80] focus:ring-[#11CD80]"
                    />
                    <span className="text-sm text-gray-600">Automático</span>
                  </div>
                  <select
                    value={articleData.length}
                    onChange={(e) => setArticleData(prev => ({ ...prev, length: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                    disabled={articleData.length_auto}
                  >
                    <option value="auto">Automático</option>
                    <option value="short">Curto (500-800 palavras)</option>
                    <option value="medium">Médio (800-1500 palavras)</option>
                    <option value="long">Longo (1500+ palavras)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seções Obrigatórias
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={articleData.required_sections_auto}
                      onChange={(e) => setArticleData(prev => ({ 
                        ...prev, 
                        required_sections_auto: e.target.checked,
                        required_sections: e.target.checked ? [] : prev.required_sections
                      }))}
                      className="rounded text-[#11CD80] focus:ring-[#11CD80]"
                    />
                    <span className="text-sm text-gray-600">Automático</span>
                  </div>
                  <input
                    type="text"
                    value={articleData.required_sections.join(', ')}
                    onChange={(e) => setArticleData(prev => ({
                      ...prev,
                      required_sections: e.target.value.split(',').map(s => s.trim())
                    }))}
                    placeholder="Separe as seções por vírgula"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                    disabled={articleData.required_sections_auto}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usar imagens
                </label>
                <select
                  value={articleData.image_source}
                  onChange={(e) => setArticleData(prev => ({ ...prev, image_source: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                >
                  <option value="unsplash">Banco de imagens</option>
                  <option value="ai">Geradas por IA</option>
                  <option value="none">Nenhuma</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publicar artigos automaticamente?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={articleData.auto_publish}
                    onChange={(e) => setArticleData(prev => ({ 
                      ...prev, 
                      auto_publish: e.target.checked 
                    }))}
                    className="rounded text-[#11CD80] focus:ring-[#11CD80]"
                  />
                  <span className="text-sm text-gray-600">
                    {articleData.auto_publish ? 'Sim - Os artigos serão publicados automaticamente' : 'Não - Os artigos serão salvos como rascunho'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating || !articleData.writer_id || !articleData.title}
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

          {/* Progress Modal */}
          {generating && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Gerando Artigos</h3>
                  <button
                    onClick={() => setGenerating(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[#11CD80] animate-spin" />
                  </div>
                  <p className="text-center text-gray-600">
                    Seus artigos estão sendo gerados. Você pode fechar esta janela, os artigos serão adicionados na página Artigos quando estiverem prontos.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Title Generator Modal */}
      {showTitleGenerator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Gerador de Títulos</h3>
              <button
                onClick={() => setShowTitleGenerator(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={titleQuantity}
                  onChange={(e) => setTitleQuantity(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-gray-600 font-medium">{titleQuantity} títulos</span>
                <button
                  onClick={handleGenerateTitles}
                  disabled={generatingTitles}
                  className="bg-[#11CD80] text-white px-4 py-2 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center gap-2"
                >
                  {generatingTitles ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      Gerar
                    </>
                  )}
                </button>
              </div>

              {generatedTitles.length > 0 && (
                <>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {generatedTitles.map((title, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedTitles.includes(title)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTitles([...selectedTitles, title]);
                            } else {
                              setSelectedTitles(selectedTitles.filter(t => t !== title));
                            }
                          }}
                          className="rounded text-[#11CD80] focus:ring-[#11CD80]"
                        />
                        <span className="text-gray-700">{title}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowTitleGenerator(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleAddTitles}
                      disabled={selectedTitles.length === 0}
                      className="bg-[#11CD80] text-white px-4 py-2 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center gap-2"
                    >
                      Adicionar Títulos
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WriterVirtual;