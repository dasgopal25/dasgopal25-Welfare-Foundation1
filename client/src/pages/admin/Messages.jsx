import { useState, useEffect } from 'react';
import { getMessages, markAsRead, deleteMessage } from '../../api/contactApi';
import { formatDate } from '../../utils/helpers';
import Loader from '../../components/common/Loader';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('all');
  const [selected, setSelected] = useState(null);

  const fetchMessages = () => {
    setLoading(true);
    const params = {};
    if (filter !== 'all') params.type = filter;
    getMessages(params).then(r => setMessages(r.data.data)).catch(() => {}).finally(() => setLoading(false));
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

  const cardStyle = { backgroundColor:'var(--c-bg)', border:'1px solid color-mix(in srgb, var(--c-primary) 12%, transparent)', borderRadius:'1rem' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color:'var(--c-primary)' }}>Messages</h1>
          <p className="text-sm mt-1" style={{ color:'var(--c-text-muted)' }}>
            {messages.filter(m => !m.isRead).length} unread
          </p>
        </div>
        <div className="flex gap-2">
          {['all','contact','join'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize"
              style={filter === f
                ? { backgroundColor:'var(--c-primary)', color:'#fff' }
                : { backgroundColor:'var(--c-bg)', color:'var(--c-text)', border:'1px solid color-mix(in srgb, var(--c-primary) 20%, transparent)' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4" style={{ height:'calc(100vh - 200px)' }}>
        {/* Message list */}
        <div className="lg:col-span-2 overflow-y-auto" style={cardStyle}>
          {loading ? <Loader /> : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48" style={{ color:'var(--c-text-muted)' }}>
              <span className="text-4xl mb-3">📭</span>
              <p className="text-sm">No messages</p>
            </div>
          ) : messages.map(msg => (
            <div key={msg._id} onClick={() => open(msg)}
              className="flex items-start gap-3 p-4 cursor-pointer transition-colors"
              style={{
                borderBottom: '1px solid color-mix(in srgb, var(--c-primary) 8%, transparent)',
                backgroundColor: selected?._id === msg._id ? 'var(--c-bg-alt)' : 'var(--c-bg)',
              }}
              onMouseEnter={e => { if (selected?._id !== msg._id) e.currentTarget.style.backgroundColor = 'var(--c-bg-alt)'; }}
              onMouseLeave={e => { if (selected?._id !== msg._id) e.currentTarget.style.backgroundColor = 'var(--c-bg)'; }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                style={{ backgroundColor: msg.type === 'join' ? 'var(--c-accent)' : 'var(--c-primary)' }}>
                {msg.name[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate" style={{ color: !msg.isRead ? 'var(--c-text)' : 'var(--c-text-muted)', fontWeight: !msg.isRead ? '600' : '400' }}>
                    {msg.name}
                  </p>
                  {!msg.isRead && <span className="w-2 h-2 rounded-full flex-shrink-0 ml-1" style={{ backgroundColor:'var(--c-primary)' }} />}
                </div>
                <p className="text-xs truncate" style={{ color:'var(--c-text-muted)' }}>{msg.subject || msg.email}</p>
                <p className="text-xs" style={{ color:'var(--c-text-muted)' }}>{formatDate(msg.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message detail */}
        <div className="lg:col-span-3 p-6 overflow-y-auto" style={cardStyle}>
          {selected ? (
            <>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-lg" style={{ color:'var(--c-primary)' }}>{selected.name}</h2>
                  <p className="text-sm" style={{ color:'var(--c-text-muted)' }}>{selected.email}</p>
                  {selected.phone && <p className="text-sm" style={{ color:'var(--c-text-muted)' }}>{selected.phone}</p>}
                </div>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 rounded-full"
                    style={selected.type === 'join'
                      ? { backgroundColor:'color-mix(in srgb, var(--c-accent) 15%, transparent)', color:'var(--c-accent)' }
                      : { backgroundColor:'rgba(59,130,246,0.1)', color:'#3b82f6' }}>
                    {selected.type === 'join' ? 'Join Request' : 'Contact'}
                  </span>
                  <button onClick={() => handleDelete(selected._id)}
                    className="text-xs px-2 py-1 rounded-full transition-colors"
                    style={{ backgroundColor:'rgba(239,68,68,0.1)', color:'#dc2626' }}>
                    Delete
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {selected.subject && (
                  <div>
                    <p className="text-xs font-semibold uppercase mb-1" style={{ color:'var(--c-text-muted)' }}>Subject</p>
                    <p className="text-sm" style={{ color:'var(--c-text)' }}>{selected.subject}</p>
                  </div>
                )}
                {selected.volunteerRole && (
                  <div>
                    <p className="text-xs font-semibold uppercase mb-1" style={{ color:'var(--c-text-muted)' }}>Role</p>
                    <p className="text-sm" style={{ color:'var(--c-text)' }}>{selected.volunteerRole}</p>
                  </div>
                )}
                {selected.address && (
                  <div>
                    <p className="text-xs font-semibold uppercase mb-1" style={{ color:'var(--c-text-muted)' }}>Address</p>
                    <p className="text-sm" style={{ color:'var(--c-text)' }}>{selected.address}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold uppercase mb-1" style={{ color:'var(--c-text-muted)' }}>Message</p>
                  <p className="text-sm leading-relaxed p-4 rounded-xl" style={{ color:'var(--c-text)', backgroundColor:'var(--c-bg-alt)' }}>
                    {selected.message}
                  </p>
                </div>
                <p className="text-xs" style={{ color:'var(--c-text-muted)' }}>{formatDate(selected.createdAt)}</p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full" style={{ color:'var(--c-text-muted)' }}>
              <span className="text-5xl mb-3">💬</span>
              <p className="text-sm">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}