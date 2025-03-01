import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { SEO } from '../lib/seo';
import { recordCTAClick } from '../lib/analytics';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-rotate featured posts every 5 seconds
    if (featuredPosts.length > 1) {
      const interval = setInterval(() => {
        setCurrentFeaturedIndex((prev) => 
          prev === featuredPosts.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredPosts.length]);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories([{ id: 'all', name: 'Todos' }, ...data]);
    } catch (err) {
      console.error('Error fetching categories:', err.message);
      setError('Erro ao carregar categorias');
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // First fetch featured posts
      let featuredQuery = supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('status', 'published')
        .eq('featured', true)
        .order('published_at', { ascending: false });

      // Then fetch other posts
      let postsQuery = supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('status', 'published')
        .eq('featured', false)
        .order('published_at', { ascending: false });

      if (selectedCategory !== "Todos") {
        postsQuery = postsQuery.eq('category_id', selectedCategory);
        featuredQuery = featuredQuery.eq('category_id', selectedCategory);
      }

      if (searchTerm) {
        const searchFilter = `title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`;
        postsQuery = postsQuery.or(searchFilter);
        featuredQuery = featuredQuery.or(searchFilter);
      }

      const [featuredResult, postsResult] = await Promise.all([
        featuredQuery,
        postsQuery
      ]);

      if (featuredResult.error) throw featuredResult.error;
      if (postsResult.error) throw postsResult.error;

      // Set featured posts and all posts
      if (featuredResult.data) {
        setFeaturedPosts(featuredResult.data);
      }
      setPosts(postsResult.data || []);
    } catch (err) {
      console.error('Error fetching posts:', err.message);
      setError('Erro ao carregar artigos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchTerm, selectedCategory]);

  const handlePostClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  const handleCTAClick = (text, location) => {
    recordCTAClick(location, text);
  };

  const handlePrevFeatured = () => {
    setCurrentFeaturedIndex((prev) => 
      prev === 0 ? featuredPosts.length - 1 : prev - 1
    );
  };

  const handleNextFeatured = () => {
    setCurrentFeaturedIndex((prev) => 
      prev === featuredPosts.length - 1 ? 0 : prev + 1
    );
  };

  const currentFeaturedPost = featuredPosts[currentFeaturedIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Blog"
        description="Descubra dicas valiosas, histórias inspiradoras e guias práticos para conquistar sua liberdade financeira."
      />
      {/* Featured Post Section */}
      <section className="bg-[#125959] relative overflow-hidden">
        <div className="absolute inset-0">
          {currentFeaturedPost?.featured_image ? (
            <div 
              className="absolute inset-0 opacity-10 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentFeaturedPost.featured_image})` }}
            ></div>
          ) : (
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1800')] opacity-10 bg-cover bg-center"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block bg-[#11CD80] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              {featuredPosts.length > 0 ? 'Em Destaque' : 'Blog Limpow'}
            </span>
            {featuredPosts.length > 0 ? (
              <motion.div
                key={currentFeaturedPost.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 
                  className="text-4xl md:text-5xl font-bold text-white mb-6 cursor-pointer hover:text-white/90 transition-colors"
                  onClick={() => handlePostClick(currentFeaturedPost.id)}
                >
                  {currentFeaturedPost.title}
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  {currentFeaturedPost.excerpt}
                </p>
                <button
                  onClick={() => handlePostClick(currentFeaturedPost.id)}
                  className="inline-flex items-center gap-2 bg-[#11CD80] text-white px-6 py-3 rounded-xl hover:bg-[#0fb46f] transition-colors"
                >
                  Continuar Lendo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Conteúdo que Transforma Vidas
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Descubra dicas valiosas, histórias inspiradoras e guias práticos para conquistar sua liberdade financeira.
                </p>
              </>
            )}
          </motion.div>
          {featuredPosts.length > 1 && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
              <button
                onClick={handlePrevFeatured}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextFeatured}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-48 px-4 py-2 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent bg-white text-gray-700 font-medium cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-[#11CD80] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg">
              {error}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum artigo encontrado</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="relative h-48">
                    <img
                      src={post.featured_image || 'https://via.placeholder.com/800x400'}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="bg-[#11CD80]/10 text-[#11CD80] px-3 py-1 rounded-full">
                        {post.category?.name}
                      </span>
                      <span>{post.views} visualizações</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {formatDate(post.published_at || post.created_at)}
                      </span>
                      <button className="text-[#11CD80] font-medium flex items-center gap-1 hover:text-[#0fb46f] transition-colors">
                        Ler mais
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#125959] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">Pronto para limpar seu nome?</h2>
            <p className="text-xl text-white/90">
              Não perca mais tempo! Junte-se aos milhares de brasileiros que já reconquistaram sua liberdade financeira.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCTAClick('Começar Agora', 'blog-cta')}
                className="bg-[#11CD80] text-white text-lg font-semibold px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors"
              >
                Começar Agora
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCTAClick('Falar com Consultor', 'blog-cta')}
                className="bg-transparent border-2 border-white text-white text-lg font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
              >
                Falar com Consultor
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Blog;