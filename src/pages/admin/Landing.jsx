import React, { useState, useEffect } from 'react';
import { 
  Save,
  Loader2,
  AlertCircle,
  Upload,
  X
} from 'lucide-react';
import { getLandingContent, updateLandingContent, uploadLandingImage } from '../../lib/landing';

function Landing() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await getLandingContent();
      if (error) throw error;
      setContent(data);
    } catch (err) {
      setError('Erro ao carregar conteúdo');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const { error } = await updateLandingContent(activeSection, content[activeSection]);
      if (error) throw error;
    } catch (err) {
      setError('Erro ao salvar alterações');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Imagem muito grande. Máximo de 5MB.');
      return;
    }

    try {
      const { url, error } = await uploadLandingImage(file);
      if (error) throw error;
      updateContent('hero', { image: url });
    } catch (err) {
      setError('Erro ao fazer upload da imagem');
    }
  };

  const updateContent = (section, newContent) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...newContent
      }
    }));
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
          <h1 className="text-2xl font-bold text-gray-900">Landing Page</h1>
          <p className="text-gray-600">Edite o conteúdo da página inicial</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#11CD80] text-white px-4 py-2 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Salvar Alterações
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Section Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-4">
          {['hero', 'how_it_works', 'benefits', 'testimonials', 'cta'].map((section) => {
            const titles = {
              hero: 'Hero',
              how_it_works: 'Como Funciona',
              benefits: 'Benefícios',
              testimonials: 'Depoimentos',
              cta: 'CTA'
            };
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                  activeSection === section
                    ? 'border-[#11CD80] text-[#11CD80]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              > 
                {titles[section]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        {activeSection === 'hero' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => updateContent('hero', { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e) => updateContent('hero', { subtitle: e.target.value })}
                rows="3"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Características
              </label>
              {content.hero.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...content.hero.features];
                      newFeatures[index] = e.target.value;
                      updateContent('hero', { features: newFeatures });
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estatísticas
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={content.hero.stats.title}
                  onChange={(e) => updateContent('hero', { 
                    stats: { ...content.hero.stats, title: e.target.value }
                  })}
                  placeholder="Título"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
                <input
                  type="text"
                  value={content.hero.stats.value}
                  onChange={(e) => updateContent('hero', {
                    stats: { ...content.hero.stats, value: e.target.value }
                  })}
                  placeholder="Valor"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagem
              </label>
              {content.hero.image ? (
                <div className="relative">
                  <img
                    src={content.hero.image}
                    alt="Hero"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => updateContent('hero', { image: null })}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    className="hidden"
                    id="hero-image"
                  />
                  <label
                    htmlFor="hero-image"
                    className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Clique para adicionar uma imagem
                    </span>
                    <span className="text-xs text-gray-400">
                      PNG, JPG ou GIF (max. 5MB)
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === 'how_it_works' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={content.how_it_works.title}
                onChange={(e) => updateContent('how_it_works', { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <input
                type="text"
                value={content.how_it_works.subtitle}
                onChange={(e) => updateContent('how_it_works', { subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passos
              </label>
              {content.how_it_works.steps.map((step, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => {
                      const newSteps = [...content.how_it_works.steps];
                      newSteps[index] = { ...step, title: e.target.value };
                      updateContent('how_it_works', { steps: newSteps });
                    }}
                    placeholder="Título do passo"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => {
                      const newSteps = [...content.how_it_works.steps];
                      newSteps[index] = { ...step, description: e.target.value };
                      updateContent('how_it_works', { steps: newSteps });
                    }}
                    placeholder="Descrição do passo"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'benefits' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={content.benefits.title}
                onChange={(e) => updateContent('benefits', { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <input
                type="text"
                value={content.benefits.subtitle}
                onChange={(e) => updateContent('benefits', { subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefícios
              </label>
              {content.benefits.items.map((item, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...content.benefits.items];
                      newItems[index] = { ...item, title: e.target.value };
                      updateContent('benefits', { items: newItems });
                    }}
                    placeholder="Título do benefício"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...content.benefits.items];
                      newItems[index] = { ...item, description: e.target.value };
                      updateContent('benefits', { items: newItems });
                    }}
                    placeholder="Descrição do benefício"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'testimonials' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={content.testimonials.title}
                onChange={(e) => updateContent('testimonials', { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <input
                type="text"
                value={content.testimonials.subtitle}
                onChange={(e) => updateContent('testimonials', { subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vídeos
              </label>
              <div className="grid grid-cols-2 gap-4">
                {content.testimonials.videos.map((video, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      type="url"
                      value={`https://www.youtube.com/watch?v=${video.id}`}
                      onChange={(e) => {
                        const newVideos = [...content.testimonials.videos];
                        const videoId = e.target.value.split('v=')[1]?.split('&')[0] || e.target.value;
                        newVideos[index] = { ...video, id: videoId };
                        updateContent('testimonials', { videos: newVideos });
                      }}
                      placeholder="URL do vídeo do YouTube"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={video.title}
                      onChange={(e) => {
                        const newVideos = [...content.testimonials.videos];
                        newVideos[index] = { ...video, title: e.target.value };
                        updateContent('testimonials', { videos: newVideos });
                      }}
                      placeholder="Título do vídeo"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagens de Depoimentos
              </label>
              <div className="grid grid-cols-3 gap-4">
                {content.testimonials.images.map((image, index) => (
                  <div key={index} className="space-y-2">
                    {image ? (
                      <div className="relative">
                        <img
                          src={image.startsWith('http') ? image : `https://i.ibb.co/${image}`}
                          alt={`Depoimento ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => {
                            const newImages = [...content.testimonials.images];
                            newImages.splice(index, 1);
                            updateContent('testimonials', { images: newImages });
                          }}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const { url, error } = await uploadLandingImage(file);
                              if (error) {
                                setError('Erro ao fazer upload da imagem');
                                return;
                              }
                              const newImages = [...content.testimonials.images];
                              newImages[index] = url;
                              updateContent('testimonials', { images: newImages });
                            }
                          }}
                          className="hidden"
                          id={`testimonial-image-${index}`}
                        />
                        <label
                          htmlFor={`testimonial-image-${index}`}
                          className="flex flex-col items-center justify-center gap-2 cursor-pointer h-48"
                        >
                          <Upload className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-500 text-center">
                            Clique para adicionar imagem
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'cta' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={content.cta.title}
                onChange={(e) => updateContent('cta', { title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <input
                type="text"
                value={content.cta.subtitle}
                onChange={(e) => updateContent('cta', { subtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Botão Principal
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={content.cta.primary_button.text}
                  onChange={(e) => updateContent('cta', {
                    primary_button: { ...content.cta.primary_button, text: e.target.value }
                  })}
                  placeholder="Texto do botão"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
                <input
                  type="text"
                  value={content.cta.primary_button.url}
                  onChange={(e) => updateContent('cta', {
                    primary_button: { ...content.cta.primary_button, url: e.target.value }
                  })}
                  placeholder="URL do botão"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Botão Secundário
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={content.cta.secondary_button.text}
                  onChange={(e) => updateContent('cta', {
                    secondary_button: { ...content.cta.secondary_button, text: e.target.value }
                  })}
                  placeholder="Texto do botão"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
                <input
                  type="text"
                  value={content.cta.secondary_button.url}
                  onChange={(e) => updateContent('cta', {
                    secondary_button: { ...content.cta.secondary_button, url: e.target.value }
                  })}
                  placeholder="URL do botão"
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;