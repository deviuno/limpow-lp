import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2,
  Eye,
  AlertTriangle,
  X,
  Loader2
} from 'lucide-react';

function Posts() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [deletePostId, setDeletePostId] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const navigate = useNavigate();

  // Fetch data when filters change
  React.useEffect(() => {
    fetchPosts();
  }, [searchTerm, categoryFilter, statusFilter]);

  React.useEffect(() => {
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

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false });

      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      if (categoryFilter) {
        query = query.eq('category_id', categoryFilter);
      }
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err.message);
      setError('Erro ao carregar artigos');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (postId) => {
    navigate(`/admin/posts/edit/${postId}`);
  };

  const handleDelete = (postId) => {
    setDeletePostId(postId);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', deletePostId);

      if (error) throw error;
      setPosts(posts.filter(post => post.id !== deletePostId));
      setDeletePostId(null);
    } catch (err) {
      console.error('Error deleting post:', err.message);
      setError('Erro ao excluir artigo');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Artigos</h1>
          <p className="text-gray-600">Gerencie os artigos do blog</p>
        </div>
        <Link 
          to="/admin/posts/new"
          className="bg-[#11CD80] text-white px-4 py-2 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Artigo
        </Link>
      </div>

      {/* Filters */}
      <form onSubmit={handleSearch} className="bg-white rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value === '') {
                fetchPosts();
              }
            }}
            placeholder="Buscar artigos..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
          >
            <option value="">Todos os status</option>
            <option value="published">Publicados</option>
            <option value="draft">Rascunhos</option>
          </select>
          <button
            type="submit"
            className="bg-[#11CD80] text-white px-4 py-2 rounded-lg hover:bg-[#0fb46f] transition-colors"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Filtrando...
              </div>
            ) : (
              'Filtrar'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Título</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Categoria</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Destaque</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Visualizações</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[#11CD80] animate-spin" />
                  </div>
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                  Nenhum artigo encontrado
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div 
                      className="font-medium text-gray-900 hover:text-[#11CD80] cursor-pointer"
                      onClick={() => handleEdit(post.id)}
                    >
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#11CD80]/10 text-[#11CD80]">
                      {post.category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {post.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#11CD80]/10 text-[#11CD80]">
                        Destaque
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(post.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Eye className="w-4 h-4" />
                      {post.views || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(post.id)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Popup */}
      {deletePostId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Confirmar Exclusão</h3>
              </div>
              <button
                onClick={() => setDeletePostId(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeletePostId(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Excluir Artigo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;