import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { 
  Shield, 
  Users, 
  UserCheck,
  Clock,
  HeadphonesIcon,
  Award,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ChevronRight,
  Star
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; 
import { supabase } from '../lib/supabase';
import { SEO } from '../lib/seo';

const StatCard = ({ icon: Icon, number, label, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-[#11CD80]/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#11CD80]" />
      </div>
      <div>
        <p className="text-2xl font-bold text-[#11CD80]">{number}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
    <div className="w-12 h-12 rounded-xl bg-[#11CD80]/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#11CD80]" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

function Institutional() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Limpow - Transformando Vidas Através da Liberdade Financeira"
        description="A Limpow é especialista em ajudar pessoas a limpar o nome, recuperar crédito e conquistar a liberdade financeira. Conheça nossas soluções!"
      />

      {/* Hero Section */}
      <section className="bg-[#125959] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1800')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transformando Vidas Através da
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 block">
                Liberdade Financeira
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Ajudamos você a limpar seu nome, recuperar seu crédito e conquistar seus sonhos.
              Junte-se aos mais de 52 mil brasileiros que já transformaram suas vidas com a Limpow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#11CD80] text-white px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2"
              >
                Falar com Especialista
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/sobre"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-colors"
              >
                Conheça a Limpow
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nosso Impacto em Números</h2>
            <p className="text-xl text-gray-600">Mais de 52 mil brasileiros já transformaram suas vidas financeiras com a Limpow</p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            <StatCard 
              icon={Users}
              number="52K+"
              label="Vidas Transformadas"
              description="Brasileiros que recuperaram sua liberdade financeira com a Limpow"
            />
            <StatCard 
              icon={UserCheck}
              number="98%"
              label="Clientes Satisfeitos"
              description="Avaliação positiva dos nossos clientes em pesquisas de satisfação"
            />
            <StatCard 
              icon={Clock}
              number="15d"
              label="Prazo Médio"
              description="Tempo médio para limpar seu nome e recuperar seu crédito"
            />
            <StatCard 
              icon={HeadphonesIcon}
              number="24/7"
              label="Suporte Disponível"
              description="Atendimento humanizado disponível todos os dias, 24h por dia"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que escolher a Limpow?</h2>
            <p className="text-xl text-gray-600">Conheça os diferenciais que fazem da Limpow a escolha certa para você</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="Processo 100% Legal"
              description="Todas as negociações são feitas dentro da lei, garantindo sua segurança e tranquilidade."
            />
            <FeatureCard
              icon={Clock}
              title="Atendimento 24/7"
              description="Suporte humanizado disponível 24 horas por dia, 7 dias por semana."
            />
            <FeatureCard
              icon={Award}
              title="Garantia de Resultado"
              description="Se não conseguirmos limpar seu nome, devolvemos seu dinheiro."
            />
            <FeatureCard
              icon={Users}
              title="Time Especializado"
              description="Profissionais experientes e dedicados ao seu caso."
            />
            <FeatureCard
              icon={CheckCircle}
              title="Processo Simplificado"
              description="Resolva tudo em 3 passos simples, sem burocracia."
            />
            <FeatureCard
              icon={Star}
              title="Melhor Avaliação"
              description="4.9/5 estrelas com mais de 10 mil avaliações."
            />
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossas Soluções</h2>
            <p className="text-xl text-gray-600">Soluções completas para sua liberdade financeira</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <img 
                src="https://i.ibb.co/nq1GyTYp/gsdfhgsdhsdfh-left.png"
                alt="App Limpow"
                className="h-48 mx-auto mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">App Limpow</h3>
              <p className="text-gray-600 mb-6">Gerencie suas finanças e acompanhe seu progresso direto do seu celular.</p>
              <Link 
                to="/app"
                className="text-[#11CD80] font-medium hover:text-[#0fb46f]"
              >
                Saiba mais
              </Link>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <img 
                src="https://i.ibb.co/KpPcmZBN/sgsdfgsdg-left.png"
                alt="Limpow Club"
                className="h-48 mx-auto mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Limpow Club</h3>
              <p className="text-gray-600 mb-6">Benefícios exclusivos e descontos especiais para membros.</p>
              <Link 
                to="/club"
                className="text-[#11CD80] font-medium hover:text-[#0fb46f]"
              >
                Saiba mais
              </Link>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <img 
                src="https://i.ibb.co/Y4yHzhjT/sdfgsgdshrtj-left.png"
                alt="Atendimento Médico"
                className="h-48 mx-auto mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Atendimento Médico</h3>
              <p className="text-gray-600 mb-6">Consulte-se com especialistas online 24h por dia. Mais de 15 especialidades disponíveis.</p>
              <Link 
                to="/telemedicina"
                className="text-[#11CD80] font-medium hover:text-[#0fb46f]"
              >
                Saiba mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h2>
            <p className="text-xl text-gray-600">Estamos aqui para ajudar você</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#11CD80]/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[#11CD80]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefone</h3>
              <p className="text-gray-600">(11) 4002-8922</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#11CD80]/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#11CD80]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">contato@limpow.com.br</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#11CD80]/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#11CD80]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Endereço</h3>
              <p className="text-gray-600">Av. Paulista, 1000 - São Paulo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Últimas do Blog</h2>
            <p className="text-xl text-gray-600">Confira nossos artigos mais recentes</p>
          </motion.div>

          <LatestPosts />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#125959] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Pronto para reconquistar sua liberdade financeira?
            </h2>
            <p className="text-xl text-white/90">
              Junte-se aos milhares de brasileiros que já transformaram suas vidas com a Limpow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#11CD80] text-white px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Latest Posts Component
function LatestPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          featured_image,
          published_at,
          category:categories(name)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#11CD80] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {posts.map((post) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => navigate(`/blog/${post.slug}`)}
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
              <span>{new Date(post.published_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-end">
              <button className="text-[#11CD80] font-medium flex items-center gap-1 hover:text-[#0fb46f] transition-colors">
                Ler mais
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export default Institutional;