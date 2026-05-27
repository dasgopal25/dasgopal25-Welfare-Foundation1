import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/blogs', icon: '📝', label: 'Blogs' },
  { to: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
  { to: '/admin/messages', icon: '📬', label: 'Messages' },
  { to: '/admin/settings', icon: '⚙️', label: 'Settings' },
];

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <aside className="w-64 bg-forest-dark min-h-screen flex flex-col text-white">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center font-display font-bold">
            {user?.name?.[0] || 'A'}
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.name || 'Admin'}</p>
            <p className="text-green-200 text-xs">{user?.email}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map(link => (
          <NavLink key={link.to} to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-white/15 text-white' : 'text-green-100 hover:bg-white/10'
              }`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-green-100 hover:bg-white/10 transition-colors mb-1">
          <span>🌐</span> View Website
        </a>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-300 hover:bg-red-500/20 transition-colors">
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}
