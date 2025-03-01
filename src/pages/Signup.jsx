import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Mail,
  Lock,
  User,
  CheckCircle,
  Shield,
  Clock,
  Users,
  Star,
  ArrowRight
} from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: "Processo 100% Legal",
    description: "Todas as negociações são feitas dentro da lei"
  },
  {
    icon: Clock,
    title: "Atendimento 24/7",
    description: "Suporte humanizado disponível a qualquer hora"
  },
  {
    icon: Users,
    title: "Time Especializado",
    description: "Profissionais experientes e dedicados"
  },
  {
    icon: Star,
    title: "Melhor Avaliação",
    description: "4.9/5 estrelas com mais de 10 mil avaliações"
  }
];

function Signup() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#125959] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1800')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Home
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Comece sua jornada para a
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 block">
                  Liberdade Financeira
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Junte-se aos mais de 52 mil brasileiros que já transformaram suas vidas com a Limpow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex -space-x-3">
                    {[
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
                      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
                      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
                      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"
                    ].map((profile, index) => (
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
                  <span>+52.378 pessoas transformadas</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-2xl"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Crie sua conta gratuitamente
                </h2>
                <p className="text-gray-600">
                  É rápido e fácil
                </p>
              </div>

              {/* Social Login */}
              {/* Form */}
              <form className="space-y-6">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                      placeholder="Nome completo"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                      placeholder="Senha"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="rounded text-[#11CD80] focus:ring-[#11CD80]"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Li e concordo com os <Link to="/termos" className="text-[#11CD80] hover:text-[#0fb46f]">Termos de Uso</Link> e <Link to="/privacidade" className="text-[#11CD80] hover:text-[#0fb46f]">Política de Privacidade</Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#11CD80] text-white px-6 py-3 rounded-xl hover:bg-[#0fb46f] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Criar Conta
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-sm text-gray-600">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-[#11CD80] hover:text-[#0fb46f] font-medium">
                    Faça login
                  </Link>
                </p>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">ou continue com</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="flex gap-4">
                  <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    <span className="font-medium text-gray-700">Google</span>
                  </button>
                  <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
                    <span className="font-medium text-gray-700">Facebook</span>
                  </button>
                </div>
              </form>
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
              Benefícios exclusivos
            </h2>
            <p className="text-xl text-gray-600">
              Ao se cadastrar você terá acesso a diversos benefícios
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 rounded-xl bg-[#11CD80]/10 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-[#11CD80]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
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
              Mais de 52 mil vidas transformadas
            </h2>
            <p className="text-xl text-white/90">
              Junte-se aos milhares de brasileiros que já conquistaram sua liberdade financeira
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
              {[
                "Atendimento humanizado 24/7",
                "Processo 100% dentro da lei",
                "Garantia de resultado"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#11CD80]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#11CD80] text-white px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              Criar Conta Grátis!
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Signup;