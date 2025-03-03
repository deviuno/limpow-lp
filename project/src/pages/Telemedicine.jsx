import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Video,
  Home,
  Brain,
  Plus,
  ArrowRight,
  ChevronDown,
  Clock,
  Phone,
  Mail,
  Building2
} from 'lucide-react';
import { SEO } from '../lib/seo';

const partners = [
  { name: "Partner 2", logo: "https://www.saude.clubecerto.com.br/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpartner2.0f217473.png&w=256&q=75" },
  { name: "Partner 3", logo: "https://www.saude.clubecerto.com.br/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpartner3.dabe2e66.png&w=384&q=75" },
  { name: "Partner 5", logo: "https://www.saude.clubecerto.com.br/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpartner5.f615f6fc.png&w=384&q=75" },
  { name: "Partner 2", logo: "https://www.saude.clubecerto.com.br/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpartner2.0f217473.png&w=256&q=75" },
  { name: "Partner 5", logo: "https://www.saude.clubecerto.com.br/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpartner5.f615f6fc.png&w=384&q=75" }
];

const services = [
  {
    icon: Video,
    title: "Telemedicina",
    description: "Consulte-se com especialistas sem sair de casa. Atendimento online 24h.",
    buttonText: "ACESSAR"
  },
  {
    icon: Home,
    title: "Home Care",
    description: "Cuidados médicos e assistenciais para pacientes que precisam de atendimento domiciliar.",
    buttonText: "ACESSAR"
  },
  {
    icon: Brain,
    title: "Telepsicologia",
    description: "Acompanhamento psicológico online com profissionais qualificados.",
    buttonText: "ACESSAR"
  }
];

const faqs = [
  {
    question: "Como ser atendido na hora pela telemedicina?",
    answer: "Basta acessar nossa plataforma, escolher a especialidade desejada e iniciar uma consulta com um médico disponível. O atendimento é imediato e seguro."
  },
  {
    question: "Quais as especialidades da telemedicina?",
    answer: "Oferecemos mais de 15 especialidades, incluindo Clínica Geral, Pediatria, Psiquiatria, Dermatologia, Ginecologia, entre outras."
  },
  {
    question: "As consultas de telemedicina são pagas?",
    answer: "Sim, mas oferecemos preços acessíveis e diferentes formas de pagamento. Consulte nossos planos e valores."
  },
  {
    question: "Quais são os horários de atendimento da telemedicina?",
    answer: "Nossa plataforma de telemedicina funciona 24 horas por dia, 7 dias por semana."
  },
  {
    question: "Como faço para marcar uma consulta presencial?",
    answer: "Você pode agendar uma consulta presencial através do nosso WhatsApp ou ligando para nossa central de atendimento."
  }
];

function Telemedicine() {
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Telemedicina Limpow - Consultas Online 24h"
        description="Consulte-se com especialistas sem sair de casa. Atendimento online 24h, mais de 15 especialidades médicas e preços acessíveis."
      />

      {/* Hero Section */}
      <section className="bg-[#125959] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Aqui, cuidar da saúde da sua família é muito
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 block">
                  mais em conta.
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Cuidamos do que mais importa: a sua saúde e de quem você ama. É só melhor, sem peso no seu bolso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/signup"
                  className="bg-[#11CD80] text-white px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2"
                >
                  Conhecer Serviços
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
            >
              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-[#125959] px-4 py-2 rounded-full shadow-lg z-10"
              >
                <span className="font-medium">Atendimento 24h</span>
              </motion.div>
              {/* Bottom Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-4 left-4 bg-[#11CD80]/80 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg z-10"
              >
                <span className="font-medium">+15 Especialidades</span>
              </motion.div>
              <img 
                src="https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=800" 
                alt="Dr. Limpow"
                className="w-full h-[600px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Grande rede de parceiros credenciados:
          </h2>
          <div className="grid md:grid-cols-5 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Atendimentos a um clique.
            </h2>
            <p className="text-xl text-gray-600">
              Nossa Assistencial Saúde oferece real e verdadeira economia e descontos aos usuários. São diversos serviços e produtos ofertados com condições imperdíveis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 rounded-xl bg-[#11CD80]/10 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-[#11CD80]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  to="/signup"
                  className="bg-[#11CD80] text-white px-6 py-3 rounded-xl hover:bg-[#0fb46f] transition-colors w-full inline-block text-center"
                >
                  {service.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pharmacy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-[#125959] px-4 py-2 rounded-full shadow-lg z-10"
              >
                <span className="font-medium">Rede Credenciada</span>
              </motion.div>
              {/* Bottom Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-4 left-4 bg-[#11CD80]/80 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg z-10"
              >
                <span className="font-medium">Até 70% OFF</span>
              </motion.div>
              <img 
                src="https://images.unsplash.com/photo-1563213126-a4273aed2016?w=800&h=600&fit=crop&q=80"
                alt="Farmácia Parceira"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ATÉ 70% DE DESCONTO EM MEDICAMENTOS
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Atualmente, a Droga Raia / Drogasil tem mais de 400 lojas credenciadas pelo Brasil. E são mais de 1.400 lojas. E em todas as unidades você tem descontos!
              </p>
              <Link
                to="/signup" 
                className="bg-[#11CD80] text-white px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors inline-block"
              >
                Ver Farmácias Parceiras
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                MAIS DE 15 ESPECIALIDADES EM TELEMEDICINA
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                A Telemedicina permite que pessoas em áreas remotas, rurais ou com dificuldades de locomoção, tenham acesso rápido a atendimento médico. Além disso, essa modalidade de serviço médico virtual proporciona maior flexibilidade de horários e evita deslocamentos desnecessários por agendamentos tradicionais em clínicas físicas.
              </p>
              <Link
                to="/signup"
                className="bg-[#11CD80] text-white px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                Acessar Telemedicina
              </Link>
            </motion.div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-[#125959] px-4 py-2 rounded-full shadow-lg z-10"
              >
                <span className="font-medium">Atendimento Online</span>
              </motion.div>
              {/* Bottom Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-4 left-4 bg-[#11CD80]/80 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg z-10"
              >
                <span className="font-medium">15+ Especialidades</span>
              </motion.div>
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80"
                alt="Telemedicina"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#125959] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Contato</h2>
            <p className="text-xl text-white/90">Entre em contato conosco</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Phone className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Telefone</h3>
              <p className="text-white/90">(11) 4002-5566</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Mail className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-white/90">comercial@limpow.com.br</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Building2 className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Endereço</h3>
              <p className="text-white/90">São Paulo - SP</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Telemedicine;