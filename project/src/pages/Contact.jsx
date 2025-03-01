import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: "Telefone",
    info: "(11) 4002-8922",
    description: "Segunda a Sexta, 8h às 18h"
  },
  {
    icon: Mail,
    title: "Email",
    info: "contato@limpow.com.br",
    description: "Resposta em até 24h"
  },
  {
    icon: MapPin,
    title: "Endereço",
    info: "São Paulo, SP",
    description: "Av. Paulista, 1000 - Bela Vista"
  }
];

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#125959] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-white/90">
              Estamos aqui para ajudar você a reconquistar sua liberdade financeira
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#11CD80]/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-[#11CD80]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Envie sua mensagem</h2>
                    <p className="text-gray-600">Responderemos o mais breve possível</p>
                  </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assunto
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
                      placeholder="Digite sua mensagem..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#11CD80] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors flex items-center justify-center gap-2"
                  >
                    Enviar Mensagem
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Support Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#11CD80]/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#11CD80]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Horário de Atendimento</h2>
                    <p className="text-gray-600">Estamos aqui para você</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Segunda a Sexta</h3>
                    <p className="text-gray-600">08:00 - 18:00</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Sábado</h3>
                    <p className="text-gray-600">09:00 - 13:00</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Domingo</h3>
                    <p className="text-gray-600">Fechado</p>
                  </div>
                </div>
              </div>

              {/* Contact Methods */}
              {contactInfo.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#11CD80]/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-[#11CD80]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-[#11CD80]">{item.info}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-100 rounded-2xl overflow-hidden h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0998847991897!2d-46.65620508449547!3d-23.564611167596592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1645754562348!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
        </div> </section>
    </div>
  );
}

export default Contact;