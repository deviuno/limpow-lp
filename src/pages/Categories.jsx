import React from 'react';
import { motion } from 'framer-motion';
import { Book, Shield, Lightbulb, Scale, HandshakeIcon, GraduationCap, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'guias',
    name: 'Guias',
    description: 'Guias completos sobre limpeza de nome e recuperação de crédito',
    icon: Book,
    count: 12,
    color: '#11CD80',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400'
  },
  {
    id: 'dicas',
    name: 'Dicas',
    description: 'Dicas práticas para manter suas finanças em dia',
    icon: Lightbulb,
    count: 8,
    color: '#FDE047',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400'
  },
  {
    id: 'legal',
    name: 'Legal',
    description: 'Informações sobre seus direitos e deveres como consumidor',
    icon: Scale,
    count: 6,
    color: '#60A5FA',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400'
  },
  {
    id: 'negociacao',
    name: 'Negociação',
    description: 'Estratégias e técnicas para negociar suas dívidas',
    icon: HandshakeIcon,
    count: 9,
    color: '#F472B6',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400'
  },
  {
    id: 'educacao',
    name: 'Educação',
    description: 'Conteúdo educativo sobre finanças pessoais',
    icon: GraduationCap,
    count: 15,
    color: '#818CF8',
    image: 'https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?w=400'
  },
  {
    id: 'planejamento',
    name: 'Planejamento',
    description: 'Dicas e ferramentas para planejar sua vida financeira',
    icon: LineChart,
    count: 7,
    color: '#34D399',
    image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=400'
  }
];

function Categories() {
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
              Categorias
            </h1>
            <p className="text-xl text-white/90">
              Explore nosso conteúdo organizado por temas para encontrar exatamente o que você precisa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link 
                  to={`/categoria/${category.id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${category.color}15` }}
                          >
                            <category.icon 
                              className="w-5 h-5"
                              style={{ color: category.color }}
                            />
                          </div>
                          <h3 className="text-xl font-bold text-white">
                            {category.name}
                          </h3>
                        </div>
                        <span className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                          {category.count} artigos
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Categories;