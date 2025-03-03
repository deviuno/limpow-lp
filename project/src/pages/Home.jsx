import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { recordCTAClick } from '../lib/analytics';
import { SEO } from '../lib/seo';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  MessageCircle, 
  Lock, 
  Percent, 
  Star, 
  ChevronRight, 
  Users,
  Headphones
} from 'lucide-react';
import { getPlans } from '../lib/plans';

// Component definitions
const Feature = ({ icon: Icon, text }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-3"
  >
    <div className="w-10 h-10 rounded-full bg-[#11CD80] flex items-center justify-center">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <span className="text-white font-medium">{text}</span>
  </motion.div>
);

const StatsCard = ({ position, icon, title, value }) => (
  <div className={`absolute ${position} bg-white rounded-2xl p-4 shadow-xl`}>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const RatingCard = ({ position }) => (
  <div className={`absolute ${position} bg-white rounded-2xl p-4 shadow-xl`}>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
        <Star className="w-6 h-6 text-yellow-600" />
      </div>
      <div>
        <div className="flex gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-sm text-gray-600">4.9/5 (10mil+ avaliações)</p>
      </div>
    </div>
  </div>
);

function PlanCard({ plan, highlighted }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-2xl p-8 
        ${highlighted 
          ? "bg-[#125959] text-white scale-105 shadow-xl" 
          : "bg-white text-gray-900 shadow-lg border-2 border-[#f5f7f9]"
        }
      `}
    >
      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
      <div className="flex items-baseline mb-6">
        <span className="text-4xl font-bold">R$ {(plan.price / 100).toFixed(2)}</span>
        <span className="text-sm ml-2 opacity-80">/único</span>
      </div>
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#11CD80]" />
            <span className={highlighted ? "text-white/90" : "text-gray-600"}>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href={plan.button_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          block w-full py-3 rounded-xl font-medium transition-colors text-center
          ${highlighted 
            ? "bg-[#11CD80] text-white hover:bg-[#0fb46f]"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }
        `}
      >
        Escolher Plano
      </a>
    </motion.div>
  );
}

function Home() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCTAClick = (text, location) => {
    recordCTAClick(location, text);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await getPlans();
      if (error) throw error;
      setPlans(data);
    } catch (err) {
      console.error('Error fetching plans:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = "https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome";

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Limpe seu nome e Reconquiste o seu Poder de Compra"
        description="Seu nome limpo e sua vida financeira transformada em até 15 dias. Junte-se aos milhares de brasileiros que já recomeçaram com o LIMPOW!"
      />
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[#125959]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1800')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959] via-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <img src="https://i.ibb.co/MZ2QtMN/limpow-logo.png" alt="Limpow Logo" className="h-20 mb-8" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Limpe seu nome e Reconquiste o seu<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                Poder de Compra
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mb-12">
              Seu nome limpo e sua vida financeira transformada em até 15 dias. Junte-se aos 52.378 brasileiros que já recomeçaram com o LIMPOW!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-4">
                <Feature icon={CheckCircle} text="Análise gratuita em 5 minutos" />
                <Feature icon={CheckCircle} text="Atendimento humanizado 24/7" />
                <Feature icon={CheckCircle} text="Garantia de resultado ou seu dinheiro de volta" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCTAClick('QUERO LIMPAR MEU NOME AGORA!', 'home-hero')}
                  className="bg-[#11CD80] text-white text-lg font-semibold px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#11CD80]/20"
                >
                  QUERO LIMPAR MEU NOME AGORA!
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="relative">
                <StatsCard
                  position="-top-8 -left-8"
                  icon={<Users className="w-6 h-6 text-green-600" />}
                  title="Vidas Transformada"
                  value="52.378+"
                />
                
                <RatingCard position="-bottom-8 -right-8" />
                
                <img 
                  src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=800&q=80" 
                  alt="Cliente Feliz"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="fill-white" viewBox="0 0 1440 120">
            <path d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,85.3C672,96,768,96,864,85.3C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Resultados que Transformam Vidas</h2>
            <p className="text-xl text-gray-600">Conheça o impacto da Limpow na vida de milhares de brasileiros</p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center">
                <div className="text-[#11CD80] mb-2">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">52K+</h3>
                <p className="text-gray-700 font-medium">Vidas Transformadas</p>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Brasileiros que recuperaram sua liberdade financeira com a Limpow
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center">
                <div className="text-[#11CD80] mb-2">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">98%</h3>
                <p className="text-gray-700 font-medium">Clientes Satisfeitos</p>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Avaliação positiva dos nossos clientes em pesquisas de satisfação
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center">
                <div className="text-[#11CD80] mb-2">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">15d</h3>
                <p className="text-gray-700 font-medium">Prazo Médio</p>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Tempo médio para limpar seu nome e recuperar seu crédito
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center">
                <div className="text-[#11CD80] mb-2">
                  <Headphones className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
                <p className="text-gray-700 font-medium">Suporte Disponível</p>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Atendimento humanizado disponível todos os dias, 24h por dia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona?</h2>
            <p className="text-xl text-gray-600">Processo simples e transparente em apenas 3 passos</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-[#f5f7f9]"
            >
              <div className="w-16 h-16 rounded-xl bg-[#11CD80]/10 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#11CD80]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Cadastro Rápido</h3>
              <p className="text-gray-600">Em apenas 3 minutos, você estará mais perto de limpar seu nome.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-[#f5f7f9]"
            >
              <div className="w-16 h-16 rounded-xl bg-[#11CD80]/10 flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-[#11CD80]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Análise Completa</h3>
              <p className="text-gray-600">Nossa equipe dedicada cuida de tudo para você, sem complicações.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-[#f5f7f9]"
            >
              <div className="w-16 h-16 rounded-xl bg-[#11CD80]/10 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-[#11CD80]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Nome Limpo</h3>
              <p className="text-gray-600">Acompanhe o processo de perto e celebre sua liberdade financeira.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Por que escolher Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que escolher o LIMPOW?</h2>
            <p className="text-xl text-gray-600">Benefícios exclusivos para sua tranquilidade</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Segurança Total", desc: "Seus dados protegidos com a mais alta tecnologia" },
              { icon: MessageCircle, title: "Suporte 24/7", desc: "Atendimento humanizado a qualquer momento" },
              { icon: Lock, title: "Processo Legal", desc: "100% dentro da lei e com garantia de resultado" },
              { icon: Percent, title: "Melhor Preço", desc: "Valores justos e parcelamento facilitado" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 hover:bg-[#11CD80]/5 transition-colors border-2 border-[#f5f7f9]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#11CD80]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#11CD80]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Planos que cabem no seu bolso</h2>
            <p className="text-xl text-gray-600">Escolha o melhor plano para sua necessidade</p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-[#11CD80] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} highlighted={plan.highlighted} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">O que dizem nossos clientes</h2>
            <p className="text-xl text-gray-600">Histórias reais de pessoas que transformaram suas vidas</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {[
              { id: "8aYkvrvuRgA", title: "Depoimento 1" },
              { id: "7xYCg9dp1SE", title: "Depoimento 2" }
            ].map((video, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow border-2 border-[#f5f7f9] aspect-[9/16] w-full md:w-[384px] mx-auto"
              >
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?modestbranding=1&controls=1&showinfo=0&rel=0`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "56wjQq4/2cf5412b-6b69-4d75-8fee-8a63e36f2bb7",
              "hdNWBwg/8d2bf022-3f7a-4c55-bcff-b9342b140445",
              "7vgr5gf/34ef6257-e262-4a6d-b8f5-da07ad160083",
              "VL3RvMr/bb5bc77e-ba69-42aa-b6fb-efd53a54631b",
              "rtxT5zK/d54fe6d6-2a67-4bd2-aa04-b6c9eaccf4c5",
              "0MV6pDN/ef333021-d295-4aab-a9da-071226ace6ef"
            ].map((id, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow border-2 border-[#f5f7f9]"
              >
                <img
                  src={`https://i.ibb.co/${id}.jpg`}
                  alt={`Depoimento ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl font-bold text-white">Pronto para reconquistar sua liberdade financeira?</h2>
            <p className="text-xl text-white/90">Junte-se aos milhares de brasileiros que já limparam seu nome com a LIMPOW</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCTAClick('Começar Agora', 'home-cta')}
                className="bg-white text-[#125959] text-lg font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Começar Agora
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCTAClick('Falar com Consultor', 'home-cta')}
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

export default Home;