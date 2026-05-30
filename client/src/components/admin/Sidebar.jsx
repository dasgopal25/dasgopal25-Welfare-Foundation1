import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/blogs',     icon: '📝', label: 'Blogs' },
  { to: '/admin/videos',    icon: '🎬', label: 'Videos' },
  { to: '/admin/gallery',   icon: '🖼️', label: 'Gallery' },
  { to: '/admin/messages',  icon: '📬', label: 'Messages' },
  { to: '/admin/settings',  icon: '⚙️', label: 'Settings' },
  { to: '/admin/themes',    icon: '🎨', label: 'Themes', highlight: true },
];

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <aside className="w-64 min-h-screen flex flex-col text-white" style={{ backgroundColor:'var(--c-primary-d, #0f2b1c)' }}>
      {/* User info */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold"
            style={{ backgroundColor:'var(--c-accent)' }}>
            {user?.name?.[0] || 'A'}
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.name || 'Admin'}</p>
            <p className="text-xs" style={{ color:'rgba(255,255,255,0.5)' }}>{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map(link => (
          <NavLink key={link.to} to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
            {link.highlight && (
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor:'var(--c-accent)' }}>New</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-white/10">
        <a href="/" target="_blank" rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors mb-1">
          <span>🌐</span> View Website
        </a>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-300 hover:bg-red-500/20 transition-colors">
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}