import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Facebook, Twitter, Linkedin, Share2, ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';
import { SEO } from '../lib/seo';

async function recordView(postId) {
  try {
    const { error } = await supabase
      .from('posts_views')
      .insert([{ post_id: postId }]);

    if (error) throw error;
  } catch (err) {
    console.error('Error recording view:', err.message);
  }
}

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);
  const [prevPost, setPrevPost] = React.useState(null);
  const [nextPost, setNextPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [relatedPosts, setRelatedPosts] = React.useState([]);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      fetchPost();
    }
  }, []);

  // Fetch current post and navigation posts
  const fetchPost = async () => {
    try {
      // Fetch current post
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        setPost(data);
        fetchRelatedPosts(data.category_id, data.id);
        recordView(id);

        // Fetch previous post
        const { data: prevData, error: prevError } = await supabase
          .from('posts')
          .select('id, title')
          .eq('status', 'published')
          .filter('published_at', 'lt', data.published_at)
          .order('published_at', { ascending: false })
          .limit(1);
        
        if (prevData && prevData.length > 0) {
          setPrevPost(prevData[0]);
        }

        // Fetch next post
        const { data: nextData, error: nextError } = await supabase
          .from('posts')
          .select('id, title')
          .eq('status', 'published')
          .filter('published_at', 'gt', data.published_at)
          .order('published_at', { ascending: true })
          .limit(1);
        
        if (nextData && nextData.length > 0) {
          setNextPost(nextData[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching post:', err.message);
      setError('Erro ao carregar o artigo');
    } finally {
      setLoading(false);
    }
  };

  // Fetch related posts
  const fetchRelatedPosts = async (categoryId, currentPostId) => {
    try {
      // First try to get posts from the same category
      let { data: categoryPosts } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          featured_image,
          published_at,
          category:categories(*)
        `)
        .eq('status', 'published')
        .eq('category_id', categoryId)
        .neq('id', currentPostId)
        .order('published_at', { ascending: false })
        .limit(3);

      // If we don't have enough posts from the same category, get posts from other categories
      if (categoryPosts.length < 3) {
        const remainingCount = 3 - categoryPosts.length;
        const { data: otherPosts } = await supabase
          .from('posts')
          .select(`
            id,
            title,
            featured_image,
            published_at,
            category:categories(*)
          `)
          .eq('status', 'published')
          .neq('category_id', categoryId)
          .neq('id', currentPostId)
          .order('published_at', { ascending: false })
          .limit(remainingCount);

        categoryPosts = [...categoryPosts, ...otherPosts];
      }

      setRelatedPosts(categoryPosts);
    } catch (err) {
      console.error('Error fetching related posts:', err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {post && (
        <SEO
          title={post.title}
          description={post.excerpt}
          image={post.featured_image}
          article={true}
          publishedTime={post.published_at}
          modifiedTime={post.updated_at}
          category={post.category?.name}
        />
      )}
      {/* Hero Section */}
      <section className="bg-[#125959] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center">
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                {error}
              </div>
            ) : post && (
              <>
                <span className="inline-block bg-[#11CD80] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                  {post.category?.name}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {post.title}
                </h1>
              </>
            )}
            <div className="flex items-center justify-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Por Equipe Limpow</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>22 Fev 2024</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 min de leitura</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/blog" className="text-gray-500 hover:text-[#11CD80] transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/categorias" className="text-gray-500 hover:text-[#11CD80] transition-colors">
              Guias
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#11CD80]">Como limpar seu nome em 2024</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <article className="bg-white rounded-2xl shadow-lg p-8">
                {/* Featured Image */}
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200"
                    alt="Como limpar seu nome"
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                {/* Share buttons */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Compartilhar:</span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#11CD80]/10 text-[#11CD80] hover:bg-[#11CD80] hover:text-white transition-colors">
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#11CD80]/10 text-[#11CD80] hover:bg-[#11CD80] hover:text-white transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#11CD80]/10 text-[#11CD80] hover:bg-[#11CD80] hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#11CD80]/10 text-[#11CD80] hover:bg-[#11CD80] hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Article content */}
                <div className="prose max-w-none">
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-8 h-8 border-4 border-[#11CD80] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : error ? (
                    <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                      {error}
                    </div>
                  ) : post && (
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  )}
                </div>
                {/* Navigation */}
                <div className="mt-12 flex items-center justify-between pt-8 border-t border-gray-100">
                  {prevPost && (
                    <button
                      onClick={() => {
                        navigate(`/post/${prevPost.id}`);
                        window.scrollTo(0, 0);
                      }}
                      className="flex items-center gap-2 text-[#11CD80] hover:text-[#0fb46f] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Artigo anterior
                    </button>
                  )}
                  {!prevPost && !nextPost && (
                    <div></div>
                  )}
                  {nextPost && (
                    <button
                      onClick={() => {
                        navigate(`/post/${nextPost.id}`);
                        window.scrollTo(0, 0);
                      }}
                      className="flex items-center gap-2 text-[#11CD80] hover:text-[#0fb46f] transition-colors"
                    >
                      Próximo artigo
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </article>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              {/* Related posts */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Artigos Relacionados</h3>
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="flex gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      onClick={() => {
                        navigate(`/post/${post.id}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <img
                        src={post.featured_image || 'https://via.placeholder.com/200x200'}
                        alt={post.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(post.published_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-[#125959] rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Precisa de ajuda?</h3>
                <p className="text-white/90 mb-6">
                  Nossa equipe está pronta para ajudar você a limpar seu nome e recuperar seu crédito.
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#11CD80] text-white font-medium px-6 py-3 rounded-xl hover:bg-[#0fb46f] transition-colors text-center"
                >
                  Falar com Especialista
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPost;