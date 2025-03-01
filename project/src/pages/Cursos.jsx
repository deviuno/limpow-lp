import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award, 
  AlignCenterVertical,
  ArrowRight,
  Check
} from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: "Conteúdo Exclusivo",
    description: "Aprenda com especialistas em finanças e gestão de dívidas."
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Interaja com outros alunos e compartilhe experiências."
  },
  {
    icon: Award,
    title: "Certificado Digital",
    description: "Receba certificado de conclusão reconhecido pelo mercado."
  },
  {
    icon: AlignCenterVertical,
    title: "Mentorias ao Vivo",
    description: "Sessões exclusivas com mentores especializados."
  },
  {
    icon: GraduationCap,
    title: "Suporte Dedicado",
    description: "Tire suas dúvidas e receba orientação personalizada."
  }
];

const waitingListProfiles = [
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop"
];

function Cursos() {
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
                Aprenda a
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 block">
                  Investir Melhor
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Cursos práticos e objetivos para você dominar suas finanças e 
                conquistar a liberdade financeira. Seja um dos primeiros a ter acesso!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#11CD80] text-white px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2"
                >
                  Lista de Espera
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
                  <span>+1.238 pessoas na fila</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Course Platform Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <img 
                src="https://i.ibb.co/Y4yHzhjT/sdfgsgdshrtj-left.png" 
                alt="Limpow Cursos"
                className="w-[280px] md:w-[384px] mx-auto"
              />
            </motion.div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Por que escolher a Limpow Cursos?
            </h2>
            <p className="text-xl text-gray-600">
              Educação financeira de qualidade e acessível para todos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#11CD80]/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#11CD80]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
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
              Pronto para transformar sua relação com o dinheiro?
            </h2>
            <p className="text-xl text-white/90">
              Entre para a lista de espera e seja um dos primeiros a ter acesso aos nossos cursos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#11CD80] text-white text-lg font-semibold px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2"
              >
                Garantir Minha Vaga
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
              {[
                "Desconto de lançamento",
                "Bônus exclusivos",
                "Acesso antecipado"
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

export default Cursos;