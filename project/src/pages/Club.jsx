import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy,
  Target,
  Users,
  Zap,
  Gift,
  ArrowRight,
  Check
} from 'lucide-react';

const benefits = [
  {
    icon: Trophy,
    title: "Mentoria Exclusiva",
    description: "Acesso a mentores especialistas em finanças e investimentos."
  },
  {
    icon: Target,
    title: "Metas Personalizadas",
    description: "Acompanhamento personalizado dos seus objetivos financeiros."
  },
  {
    icon: Users,
    title: "Comunidade VIP",
    description: "Faça parte de uma comunidade engajada em crescimento financeiro."
  },
  {
    icon: Zap,
    title: "Conteúdo Premium",
    description: "Acesso antecipado a conteúdos exclusivos e ferramentas."
  },
  {
    icon: Gift,
    title: "Benefícios Especiais",
    description: "Descontos e vantagens exclusivas com nossos parceiros."
  }
];

const waitingListProfiles = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"
];

function Club() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#125959] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1800')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center md:text-left"
            >
              <span className="inline-block bg-[#11CD80] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                Em breve
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Faça Parte do
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 block">
                  Clube Limpow
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Uma comunidade exclusiva para quem quer alcançar a verdadeira liberdade financeira.
                Seja um dos primeiros membros!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#11CD80] text-white px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2"
                >
                  Entrar para Lista VIP
                  <ArrowRight className="w-5 h-5" />
                </a>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex -space-x-3">
                    {waitingListProfiles.map((profile, index) => (
                      <div 
                        key={index} 
                        className="w-8 h-8 rounded-full border-2 border-[#125959] overflow-hidden"
                      >
                        <img 
                          src={profile} 
                          alt={`Profile ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span>+1.847 pessoas na lista VIP</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Club Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <img 
                src="https://i.ibb.co/KpPcmZBN/sgsdfgsdg-left.png" 
                alt="Limpow Club"
                className="w-[280px] md:w-[384px] mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Benefícios Exclusivos
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para alcançar seus objetivos financeiros
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#11CD80]/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#11CD80]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#125959] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1800')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Pronto para transformar sua vida financeira?
            </h2>
            <p className="text-xl text-white/90">
              Entre para a lista VIP e seja um dos primeiros membros do Clube Limpow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#11CD80] text-white text-lg font-semibold px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2"
              >
                Quero Fazer Parte
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
              {[
                "Acesso prioritário",
                "Desconto exclusivo",
                "Bônus de lançamento"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#11CD80]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Club;