import React from 'react';
import { Save, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { changePassword } from '../../lib/auth';
import { getSettings, updateSettings } from '../../lib/settings';

function Settings() {
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
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do blog</p>
      </div>

      <div className="max-w-3xl">
        {/* Password Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
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

        {/* Blog Settings */}
        <form onSubmit={handleSettingsSubmit} className="bg-white rounded-xl p-6 shadow-sm mb-6">
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

        {/* SEO Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
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

        {/* Social Media Settings */}
        <form onSubmit={handleSettingsSubmit} className="bg-white rounded-xl p-6 shadow-sm mb-6">
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
      </div>
    </div>
  );
}

export default Settings;