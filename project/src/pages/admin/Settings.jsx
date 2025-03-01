import React, { useState } from 'react';
import { Save, Lock, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { changePassword } from '../../lib/auth';
import { getSettings, updateSettings } from '../../lib/settings';

const tabs = [
  { id: 'security', icon: Lock, label: 'Segurança', description: 'Altere sua senha de acesso' },
  { id: 'ai', icon: Sparkles, label: 'Inteligência Artificial', description: 'Configure a integração com OpenAI' },
  { id: 'general', icon: Save, label: 'Geral', description: 'Configurações gerais do blog' },
  { id: 'seo', icon: AlertCircle, label: 'SEO', description: 'Otimização para motores de busca' },
  { id: 'social', icon: AlertCircle, label: 'Redes Sociais', description: 'Links para redes sociais' }
];

function Settings() {
  const [activeTab, setActiveTab] = useState('security');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [savingSettings, setSavingSettings] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [settingsError, setSettingsError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [settingsSuccess, setSettingsSuccess] = React.useState(false);
  const [settings, setSettings] = React.useState({
    openai_api_key: '',
    blog_name: null,
    blog_description: null,
    blog_url: null,
    posts_per_page: 10,
    meta_title: null,
    meta_description: null,
    meta_keywords: null,
    facebook_url: null,
    instagram_url: null,
    linkedin_url: null
  });

  React.useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await getSettings();
      if (error) throw error;
      if (data) {
        setSettings(data);
      }
    } catch (err) {
      console.error('Error fetching settings:', err.message);
      setSettingsError('Erro ao carregar configurações');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const { success, error } = await changePassword(currentPassword, newPassword);
      
      if (error) {
        setError(error);
        return;
      }

      if (success) {
        setSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError('Erro ao alterar a senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsError(null);
    setSettingsSuccess(false);

    try {
      const { error } = await updateSettings(settings);
      if (error) throw error;
      setSettingsSuccess(true);
    } catch (err) {
      setSettingsError('Erro ao salvar configurações. Tente novamente.');
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div className="p-6 flex gap-6">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left p-4 border-b border-gray-100 last:border-0 transition-colors ${
                activeTab === tab.id 
                  ? 'bg-[#11CD80]/10 border-[#11CD80]' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activeTab === tab.id 
                    ? 'bg-[#11CD80]/20' 
                    : 'bg-gray-100'
                }`}>
                  <tab.icon className={`w-5 h-5 ${
                    activeTab === tab.id 
                      ? 'text-[#11CD80]' 
                      : 'text-gray-500'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-medium ${
                    activeTab === tab.id 
                      ? 'text-[#11CD80]' 
                      : 'text-gray-700'
                  }`}>{tab.label}</h3>
                  <p className="text-sm text-gray-500">{tab.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-3xl">
        {/* Password Settings */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#11CD80]/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#11CD80]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Alterar Senha</h2>
                <p className="text-gray-600">Atualize sua senha de acesso</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Senha alterada com sucesso!
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha Atual
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#11CD80] text-white px-6 py-3 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Alterando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Alterar Senha
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* AI Settings */}
        {activeTab === 'ai' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#11CD80]/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#11CD80]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Configurações da OpenAI</h2>
                <p className="text-gray-600">Configure a integração com a OpenAI para geração de artigos</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chave da API
                </label>
                <input
                  type="password"
                  value={settings.openai_api_key || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, openai_api_key: e.target.value }))}
                  placeholder="sk-..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Obtenha sua chave da API em{' '}
                  <a 
                    href="https://platform.openai.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#11CD80] hover:text-[#0fb46f]"
                  >
                    platform.openai.com/api-keys
                  </a>
                </p>
              </div>
              <button
                onClick={handleSettingsSubmit}
                disabled={savingSettings}
                className="w-full bg-[#11CD80] text-white px-6 py-3 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
              >
                {savingSettings ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Salvar Configurações
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Blog Settings */}
        {activeTab === 'general' && (
          <form onSubmit={handleSettingsSubmit} className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Configurações Gerais</h2>
            
            {settingsError && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {settingsError}
              </div>
            )}

            {settingsSuccess && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Configurações salvas com sucesso!
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Blog
                </label>
                <input
                  type="text"
                  value={settings.blog_name || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, blog_name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  rows="3"
                  value={settings.blog_description || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, blog_description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL do Blog
                </label>
                <input
                  type="url"
                  value={settings.blog_url || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, blog_url: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Artigos por Página
                </label>
                <input
                  type="number"
                  value={settings.posts_per_page}
                  onChange={(e) => setSettings(prev => ({ ...prev, posts_per_page: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#11CD80] text-white px-6 py-3 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2 w-full"
              disabled={savingSettings}
            >
              {savingSettings ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salvar Configurações
                </>
              )}
            </button>
          </form>
        )}

        {/* SEO Settings */}
        {activeTab === 'seo' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Configurações SEO</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Título
                </label>
                <input
                  type="text"
                  value={settings.meta_title || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, meta_title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Descrição
                </label>
                <textarea
                  rows="3"
                  value={settings.meta_description || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, meta_description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palavras-chave
                </label>
                <input
                  type="text"
                  value={settings.meta_keywords || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, meta_keywords: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
              </div>
            </form>
          </div>
        )}

        {/* Social Media Settings */}
        {activeTab === 'social' && (
          <form onSubmit={handleSettingsSubmit} className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Redes Sociais</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.facebook_url || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, facebook_url: e.target.value }))}
                  placeholder="URL da página do Facebook"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.instagram_url || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, instagram_url: e.target.value }))}
                  placeholder="URL do perfil do Instagram"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.linkedin_url || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, linkedin_url: e.target.value }))}
                  placeholder="URL da página do LinkedIn"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={savingSettings}
                className="w-full bg-[#11CD80] text-white px-6 py-3 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {savingSettings ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Salvar Configurações
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Settings;