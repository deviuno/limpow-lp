import React from 'react';
import { 
  Search, 
  MessageSquare,
  Check,
  X as XIcon, 
  Send
} from 'lucide-react';

const comments = [
  {
    id: 1,
    author: 'João Silva',
    content: 'Excelente artigo! Me ajudou muito a entender o processo.',
    post: 'Como limpar seu nome em 2024',
    date: '22 Fev 2024',
    status: 'Pendente',
    email: 'joao.silva@email.com'
  },
  {
    id: 2,
    author: 'Maria Santos',
    content: 'As dicas são muito práticas. Já comecei a aplicar!',
    post: '5 Dicas para manter o nome limpo',
    date: '21 Fev 2024',
    status: 'Aprovado',
    email: 'maria.santos@email.com'
  },
  {
    id: 3,
    author: 'Pedro Oliveira',
    content: 'Muito esclarecedor. Gostaria de saber mais sobre...',
    post: 'Entenda seus direitos como consumidor',
    date: '20 Fev 2024',
    status: 'Pendente',
    email: 'pedro.oliveira@email.com'
  }
];

function Comments() {
  const [replyingTo, setReplyingTo] = React.useState(null);
  const [replyContent, setReplyContent] = React.useState('');

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
    setReplyContent('');
  };

  const handleSubmitReply = () => {
    // Add logic to submit reply
    console.log(`Replying to comment ${replyingTo}: ${replyContent}`);
    setReplyingTo(null);
    setReplyContent('');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comentários</h1>
          <p className="text-gray-600">Gerencie os comentários do blog</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar comentários..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent"
          />
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent">
            <option value="">Todos os status</option>
            <option value="pending">Pendentes</option>
            <option value="approved">Aprovados</option>
            <option value="rejected">Rejeitados</option>
          </select>
        </div>
      </div>

      {/* Comments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Autor</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Comentário</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Artigo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{comment.author}</div>
                    <div className="text-sm text-gray-500">{comment.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-600 line-clamp-2">{comment.content}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-900">{comment.post}</p>
                </td>
                <td className="px-6 py-4 text-gray-600">{comment.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    comment.status === 'Aprovado'
                      ? 'bg-green-100 text-green-800'
                      : comment.status === 'Rejeitado'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {comment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleReply(comment.id)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <Check className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <XIcon className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reply Popup */}
      {replyingTo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Responder Comentário</h3>
              <button
                onClick={() => setReplyingTo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Digite sua resposta..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11CD80] focus:border-transparent mb-4"
              rows="4"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setReplyingTo(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitReply}
                className="bg-[#11CD80] text-white px-4 py-2 rounded-lg hover:bg-[#0fb46f] transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar Resposta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;