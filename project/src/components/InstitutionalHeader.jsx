import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function InstitutionalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'App', path: '/app' },
    { label: 'Club', path: '/club' },
    { label: 'Cursos', path: '/cursos' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contato', path: '/contato' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="https://i.ibb.co/8LjXS6LR/limpow-logo-blog.png" alt="Limpow" className="h-8" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-[#11CD80] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#11CD80] text-white px-6 py-2 rounded-xl hover:bg-[#0fb46f] transition-colors"
            >
              Limpar meu Nome
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col py-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-gray-600 hover:bg-gray-50"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="mx-4 mt-2 bg-[#11CD80] text-white px-6 py-3 rounded-xl hover:bg-[#0fb46f] transition-colors text-center"
            >
              Limpar meu Nome
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default InstitutionalHeader;