import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { 
  Save,
  Image,
  X,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { createPost, updatePost, getPost, uploadPostImage, generateSlug } from '../../lib/posts';
import { supabase } from '../../lib/supabase';

function NewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category_id: '',
    status: 'draft',
    featured: false,
    meta_title: '',
    meta_description: '',
    featured_image: null
  });

  useEffect(() => {
    fetchCategories();
    if (id) fetchPost();
  }, [id]);

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
      setError('Failed to load categories');
    }
  };

  const fetchPost = async () => {
    setLoading(true);
    try {
      const { data, error } = await getPost(id);
      if (error) throw error;
      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt,
          category_id: data.category_id,
          status: data.status,
          meta_title: data.meta_title,
          meta_description: data.meta_description,
          featured_image: data.featured_image
        });
      }
    } catch (err) {
      console.error('Error fetching post:', err.message);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleImageUpload = async (file) => {
    try {
      const { url, error } = await uploadPostImage(file);
      if (error) throw error;
      setFormData(prev => ({ ...prev, featured_image: url }));
    } catch (err) {
      console.error('Error uploading image:', err.message);
      setError('Failed to upload image');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    
    if (!formData.title) {
      setError('O título é obrigatório');
      setSaving(false);
      return;
    }

    if (!formData.category_id) {
      setError('Selecione uma categoria');
      setSaving(false);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const postData = {
        ...formData,
        author_id: user.id,
        published_at: formData.status === 'published' ? new Date().toISOString() : null
      };

      const { data, error } = id
        ? await updatePost(id, postData)
        : await createPost(postData);

      if (error) throw error;
      navigate('/admin/posts');
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err.message || 'Erro ao salvar o artigo. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{id ? 'Editar Artigo' : 'Novo Artigo'}</h1>
          <p className="text-gray-600">{id ? 'Edite o artigo selecionado' : 'Crie um novo artigo para o blog'}</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
            className={`px-4 py-2 rounded-lg transition-colors ${
              formData.status === 'draft'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Rascunho
          </button>
          <button 
            onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
            className={`px-4 py-2 rounded-lg transition-colors ${
              formData.status === 'published'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Publicar
          </button>
          <button
            onClick={handleSave} 
            disabled={saving}
            className="bg-[#11CD80] text-white px-4 py-2 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Salvar
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-100 text-red-800 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Título do artigo"
              className="w-full text-2xl font-bold text-gray-900 border-0 focus:outline-none focus:ring-0 placeholder-gray-400"
            />
          </div>

          {/* Editor */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Editor
              apiKey="f2yk1n9itegbpgzhsck416boeigz0opkrh3bu3z7tpkpjul4"
              value={formData.content}
              onEditorChange={handleEditorChange}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | image media link | help',
                content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }',
                branding: false,
                promotion: false,
                images_upload_handler: async function (blobInfo, success, failure) {
                  try {
                    const { url, error } = await uploadPostImage(blobInfo.blob());
                    if (error) throw error;
                    success(url);
                  } catch (err) {
                    failure('Falha ao fazer upload da imagem');
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categoria</h3>
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded text-[#11CD80] focus:ring-[#11CD80]"
                />
                Marcar como Destaque
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Artigos em destaque aparecem em primeiro lugar no blog
              </p>
            </div>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
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

          {/* Featured Image */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Imagem Destacada</h3>
            {formData.featured_image ? (
              <div className="relative">
                <img
                  src={formData.featured_image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => setFormData(prev => ({ ...prev, featured_image: null }))}
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
                  id="featured-image"
                />
                <label
                  htmlFor="featured-image"
                  className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                >
                  <Image className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Clique para adicionar uma imagem
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Título
                </label>
                <input
                  type="text"
                  placeholder="Título para SEO"
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Descrição
                </label>
                <textarea
                  placeholder="Descrição para SEO"
                  rows="3"
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resumo
                </label>
                <textarea
                  placeholder="Breve resumo do artigo"
                  rows="3"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;