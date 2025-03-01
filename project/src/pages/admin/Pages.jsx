import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { Save, File } from 'lucide-react';

const pages = [
  {
    id: 'home',
    title: 'Home',
    description: 'Página inicial do site'
  },
  {
    id: 'privacidade',
    title: 'Privacidade',
    description: 'Política de Privacidade'
  },
  {
    id: 'termos',
    title: 'Termos',
    description: 'Termos de Uso'
  },
  {
    id: 'cookies',
    title: 'Cookies',
    description: 'Política de Cookies'
  }
];

function Pages() {
  const { id } = useParams();
  const [content, setContent] = React.useState('');
  const isEditing = !!id;

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleSave = () => {
    // Add logic to save page content
    console.log('Saving page content:', content);
  };

  if (isEditing) {
    const page = pages.find(p => p.id === id);
    if (!page) return null;

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Editar Página: {page.title}</h1>
            <p className="text-gray-600">{page.description}</p>
          </div>
          <button
            onClick={handleSave}
            className="bg-[#11CD80] text-white px-4 py-2 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Editor
            apiKey="f2yk1n9itegbpgzhsck416boeigz0opkrh3bu3z7tpkpjul4"
            value={content}
            onEditorChange={handleEditorChange}
            init={{
              height: 800,
              menubar: true,
              readonly: false,
              plugins: [ 
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | image media link | help',
              content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }',
              branding: false,
              promotion: false
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Páginas</h1>
        <p className="text-gray-600">Gerencie as páginas estáticas do site</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <div key={page.id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#11CD80]/10 flex items-center justify-center">
                <File className="w-6 h-6 text-[#11CD80]" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{page.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{page.description}</p>
            <Link
              to={`/admin/pages/edit/${page.id}`}
              className="inline-flex items-center gap-2 text-[#11CD80] hover:text-[#0fb46f] transition-colors"
            >
              Editar página
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pages;