import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { supabase } from '../lib/supabase';

function Footer() {
  const [settings, setSettings] = React.useState({
    facebook_url: '',
    instagram_url: '',
    linkedin_url: ''
  });

  React.useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('facebook_url, instagram_url, linkedin_url')
        .single();

      if (error) throw error;
      if (data) {
        setSettings(data);
      }
    } catch (err) {
      console.error('Error fetching settings:', err.message);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/">
              <img src="https://i.ibb.co/MZ2QtMN/limpow-logo.png" alt="Limpow Logo" className="h-8 mb-4" />
            </Link>
            <p className="text-gray-400 mb-4">Transformando vidas através da liberdade financeira</p>
            <div className="flex gap-4">
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#11CD80]/10 text-[#11CD80] hover:bg-[#11CD80] hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#11CD80]/10 text-[#11CD80] hover:bg-[#11CD80] hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#11CD80]/10 text-[#11CD80] hover:bg-[#11CD80] hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><Link to="/sobre" className="text-gray-400 hover:text-white transition-colors">Sobre</Link></li>
              <li><Link to="/carreiras" className="text-gray-400 hover:text-white transition-colors">Carreiras</Link></li>
              <li><Link to="/imprensa" className="text-gray-400 hover:text-white transition-colors">Imprensa</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/ferramentas" className="text-gray-400 hover:text-white transition-colors">Ferramentas</Link></li>
              <li><Link to="/api" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacidade" className="text-gray-400 hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link to="/termos" className="text-gray-400 hover:text-white transition-colors">Termos</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 LIMPOW. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;