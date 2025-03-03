import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Target, Users, Zap, Gift, ArrowRight, Check } from 'lucide-react';

const partners = [
  { img: "//clubecerto.com.br/images/parceiros/LogoPetzCBC250x250.png", alt: "Petz" },
  { img: "//clubecerto.com.br/images/parceiros/COCOlogo.png", alt: "Coco Bambu" },
  { img: "//clubecerto.com.br/images/parceiros/clubeDrogaRaia.jpg", alt: "Droga Raia" },
  { img: "//clubecerto.com.br/images/parceiros/ligoShoestock.png", alt: "Shoestock" },
  { img: "//clubecerto.com.br/images/parceiros/clube-casasbahia.png", alt: "Casas Bahia" },
  { img: "//clubecerto.com.br/images/parceiros/clubedrogariaaraujo.jpg", alt: "Drogaria Araujo" },
  { img: "//clubecerto.com.br/images/parceiros/LOGOSAMSCLUB.png", alt: "Sam's Club" },
  { img: "//clubecerto.com.br/images/parceiros/clube-581.jpg", alt: "Clube 581" },
  { img: "//clubecerto.com.br/images/parceiros/clube-348.jpg", alt: "Clube 348" },
  { img: "//clubecerto.com.br/images/parceiros/ponto_pontofrio.jpg", alt: "Ponto Frio" },
  { img: "//clubecerto.com.br/images/parceiros/488.png", alt: "Marca 488" },
  { img: "//clubecerto.com.br/images/parceiros/clube-460.jpg", alt: "Clube 460" },
  { img: "//clubecerto.com.br/images/parceiros/clube-422.jpg", alt: "Clube 422" },
  { img: "//clubecerto.com.br/images/parceiros/clubeunidas.jpg", alt: "Unidas" },
  { img: "//clubecerto.com.br/images/parceiros/LogoOTEMPO250250.png", alt: "O Tempo" },
  { img: "//clubecerto.com.br/images/parceiros/clubepaguemenos.jpg", alt: "Pague Menos" },
  { img: "//clubecerto.com.br/images/parceiros/clubemagalu.jpg", alt: "Magalu" },
  { img: "//clubecerto.com.br/images/parceiros/djsnlcisjvisjncisdp.png", alt: "Marca Diversa" }
];

function Club() {
  const whatsappLink = "https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome";
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* Versão atualizada em 02/03/2025 - DEBUG */}
      <section className="bg-[#11CD80] relative overflow-hidden min-h-[560px] flex items-end">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#11CD80] to-[#125959]"></div>
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-0">
          <div className="grid md:grid-cols-2 items-center md:pb-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center md:text-left pb-8 md:pb-0"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Um clube de descontos
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400 block">
                  feito para você.
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-12">
                Nosso clube traz vantagens exclusivas, experiências imperdíveis e preços especiais para você.
              </p>
              <div className="mb-8 md:mb-0">
                <Link
                  to="/signup"
                  className="bg-white text-[#11CD80] px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center gap-2 font-semibold"
                >
                  Ver Descontos
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-full flex items-end justify-center md:justify-end"
            >
              <img 
                src="https://landingpageshotsites.s3.us-east-2.amazonaws.com/avai/casal.png" 
                alt="Casal" 
                className="w-auto h-[450px] object-contain object-bottom mt-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Como funciona o Clube</h2>
            <p className="text-xl text-gray-600">Processo simples e prático para você aproveitar</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Participe",
                description: "Faça parte do nosso Clube e tenha acesso aos benefícios. É prático!",
                icon: Users
              },
              {
                number: "02",
                title: "Escolha",
                description: "São centenas de benefícios que você pode escolher e usar quantas vezes quiser.",
                icon: Target
              },
              {
                number: "03",
                title: "Apresente",
                description: "Depois de escolher o benefício que você quer, é só aproveitar.",
                icon: Trophy
              },
              {
                number: "04",
                title: "Economize",
                description: "Pronto! Você já está economizando. Use quantas vezes quiser e economize todo dia.",
                icon: Gift
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 rounded-xl bg-[#11CD80]/10 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-[#11CD80]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Grandes marcas com descontos exclusivos
            </h2>
            <p className="text-xl text-gray-600">
              As melhores empresas confiam em nós
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
              >
                <img 
                  src={partner.img} 
                  alt={partner.alt} 
                  className="w-full h-16 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-900">
                Mais de 600.000 produtos e serviços
              </h2>
              <p className="text-xl text-gray-600">
                A maior variedade de estabelecimentos e produtos com desconto você encontra aqui.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="bg-[#11CD80] text-white px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors inline-flex items-center justify-center gap-2"
                >
                  Ver todos os descontos
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-6"
            >
              <img 
                src="https://node.clubecerto.com.br/superapp/images/companies/card/cfSVmBTuHpJMOeIL.png"
                alt="Cartão Frente"
                className="w-full rounded-xl shadow-lg"
              />
              <img 
                src="https://node.clubecerto.com.br/superapp/images/companies/card/cvSpL0jzRDd91Yxg.png"
                alt="Cartão Verso"
                className="w-full rounded-xl shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#125959] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://landingpageshotsites.s3.us-east-2.amazonaws.com/avai/fundo.jpg')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#125959]/95 to-[#11CD80]/90"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Central de Descontos
            </h2>
            <p className="text-2xl text-white/90 font-bold">
              0800 354 0007
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#11CD80] text-white px-8 py-4 rounded-xl hover:bg-[#0fb46f] transition-colors inline-flex items-center justify-center gap-2"
              >
                Falar com um Consultor
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Club;