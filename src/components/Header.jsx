import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

function Header() {
  const location = useLocation();
  const isInBlogSection = location.pathname.startsWith('/blog') || 
                         location.pathname.startsWith('/post') || 
                         location.pathname.startsWith('/categorias');

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={isInBlogSection ? "/blog" : "/"} className="flex-shrink-0">
            <img src="https://i.ibb.co/8LjXS6LR/limpow-logo-blog.png" alt="Limpow Blog" className="h-8" />
          </Link>
          
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex md:space-x-8">
              <Link to={isInBlogSection ? "/blog" : "/"} className="text-gray-900 hover:text-[#11CD80] transition-colors">
                Home
              </Link>
              <Link to="/categorias" className="text-gray-900 hover:text-[#11CD80] transition-colors">
                Categorias
              </Link>
              <Link to="/app" className="text-gray-900 hover:text-[#11CD80] transition-colors">
                App Limpow
              </Link>
              <Link to="/club" className="text-gray-900 hover:text-[#11CD80] transition-colors">
                Limpow Club
              </Link>
              <Link to="/cursos" className="text-gray-900 hover:text-[#11CD80] transition-colors">
                Limpow Cursos
              </Link>
              <Link to="/contato" className="text-gray-900 hover:text-[#11CD80] transition-colors">
                Contato
              </Link>
            </nav>
            
            <a 
              href="https://api.whatsapp.com/send?phone=5511950871211&text=Oi,%20quero%20limpar%20meu%20nome"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#11CD80] text-white px-6 py-2 rounded-xl hover:bg-[#0fb46f] transition-colors"
            >
              Limpar meu Nome
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;