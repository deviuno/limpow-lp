import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../lib/auth';
import { 
  LayoutDashboard, 
  FileText, 
  Pen,
  Sparkles,
  File,
  Layout,
  FolderOpen, 
  Settings,
  CreditCard,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/posts', icon: FileText, label: 'Artigos' },
  { path: '/admin/writer-virtual', icon: Pen, label: 'Escritor Virtual' },
  { path: '/admin/ai-generator', icon: Sparkles, label: 'Gerador IA' },
  { path: '/admin/landing', icon: Layout, label: 'Landing Page' },
  { path: '/admin/pages', icon: File, label: 'Páginas' },
  { path: '/admin/categories', icon: FolderOpen, label: 'Categorias' },
  { path: '/admin/plans', icon: CreditCard, label: 'Planos' },
  { path: '/admin/settings', icon: Settings, label: 'Configurações' },
];

function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      logout();
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-lg"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col
        `}
      >
        <div className="p-6">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <img src="https://i.ibb.co/8LjXS6LR/limpow-logo-blog.png" alt="Limpow Blog" className="h-8" />
          </Link>
        </div>

        <nav className="flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 transition-colors
                ${location.pathname === item.path ? 'bg-[#11CD80]/10 text-[#11CD80]' : ''}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 transition-colors w-full rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;