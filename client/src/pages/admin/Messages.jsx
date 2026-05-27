import { useState, useEffect } from 'react';
import { getMessages, markAsRead, deleteMessage } from '../../api/contactApi';
import { formatDate } from '../../utils/helpers';
import Loader from '../../components/common/Loader';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const fetchMessages = () => {
    setLoading(true);
    const params = {};
    if (filter !== 'all') params.type = filter;
    getMessages(params).then(r => setMessages(r.data.data)).catch(()=>{}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, [filter]);

  const handleRead = async (id) => {
    await markAsRead(id);
    setMessages(m => m.map(msg => msg._id === id ? { ...msg, isRead: true } : msg));
    if (selected?._id === id) setSelected(p => ({ ...p, isRead: true }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await deleteMessage(id);
    setMessages(m => m.filter(msg => msg._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  const open = (msg) => {
    setSelected(msg);
    if (!msg.isRead) handleRead(msg._id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest dark:text-green-400">Messages</h1>
          <p className="text-gray-500 text-sm mt-1">{messages.filter(m=>!m.isRead).length} unread</p>
        </div>
        <div className="flex gap-2">
          {['all','contact','join'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${filter===f ? 'bg-forest text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid lg:grid-cols-5 gap-4 h-[calc(100vh-200px)]">
        {/* List */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-y-auto">
          {loading ? <Loader /> : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <span className="text-4xl mb-3">📭</span>
              <p className="text-sm">No messages</p>
            </div>
          ) : messages.map(msg => (
            <div key={msg._id} onClick={() => open(msg)}
              className={`flex items-start gap-3 p-4 cursor-pointer border-b dark:border-gray-800 last:border-0 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${selected?._id === msg._id ? 'bg-gray-50 dark:bg-gray-800' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${msg.type === 'join' ? 'bg-gold/20 text-yellow-700' : 'bg-forest/10 text-forest dark:text-green-400'}`}>
                {msg.name[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium truncate ${!msg.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>{msg.name}</p>
                  {!msg.isRead && <span className="w-2 h-2 bg-forest rounded-full flex-shrink-0 ml-1" />}
                </div>
                <p className="text-xs text-gray-400 truncate">{msg.subject || msg.email}</p>
                <p className="text-xs text-gray-400">{formatDate(msg.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Detail */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 overflow-y-auto">
          {selected ? (
            <>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-forest dark:text-green-400 text-lg">{selected.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selected.email}</p>
                  {selected.phone && <p className="text-sm text-gray-500 dark:text-gray-400">{selected.phone}</p>}
                </div>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${selected.type === 'join' ? 'bg-gold/20 text-yellow-700 dark:text-yellow-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                    {selected.type === 'join' ? 'Join Request' : 'Contact'}
                  </span>
                  <button onClick={() => handleDelete(selected._id)} className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 transition-colors">Delete</button>
                </div>
              </div>
              <div className="space-y-4">
                {selected.subject && <div><p className="text-xs font-semibold text-gray-400 uppercase mb-1">Subject</p><p className="text-sm text-gray-700 dark:text-gray-300">{selected.subject}</p></div>}
                {selected.volunteerRole && <div><p className="text-xs font-semibold text-gray-400 uppercase mb-1">Role</p><p className="text-sm text-gray-700 dark:text-gray-300">{selected.volunteerRole}</p></div>}
                {selected.address && <div><p className="text-xs font-semibold text-gray-400 uppercase mb-1">Address</p><p className="text-sm text-gray-700 dark:text-gray-300">{selected.address}</p></div>}
                <div><p className="text-xs font-semibold text-gray-400 uppercase mb-1">Message</p><p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">{selected.message}</p></div>
                <p className="text-xs text-gray-400">{formatDate(selected.createdAt)}</p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="text-5xl mb-3">💬</span>
              <p className="text-sm">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
