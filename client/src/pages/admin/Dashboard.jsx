import { useState, useEffect } from 'react';
import { getDashboardStats } from '../../api/settingsApi';
import { adminGetVideos } from '../../api/videoApi';
import DashboardCard from '../../components/admin/DashboardCard';
import { formatDate, getCategoryLabel } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import Loader from '../../components/common/Loader';

export default function Dashboard() {
  const [stats, setStats]       = useState(null);
  const [videoCount, setVideoCount] = useState(0);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      getDashboardStats(),
      adminGetVideos(),
    ]).then(([sr, vr]) => {
      setStats(sr.data.data);
      setVideoCount(vr.data.data.length);
    }).catch(()=>{}).finally(()=>setLoading(false));
  }, []);

  if (loading) return <Loader size="lg" text="Loading dashboard..." />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold" style={{ color:'var(--c-primary)' }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color:'var(--c-text-muted)' }}>Welcome to Gazipur Kismat Admin Panel</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <DashboardCard title="Total Blogs"     value={stats?.totalBlogs||0}     icon="📝" color="green" />
        <DashboardCard title="Published"       value={stats?.publishedBlogs||0} icon="✅" color="navy" />
        <DashboardCard title="Videos"          value={videoCount}               icon="🎬" color="gold" />
        <DashboardCard title="Gallery Images"  value={stats?.totalGallery||0}   icon="🖼️" color="navy" />
        <DashboardCard title="Unread Messages" value={stats?.unreadMessages||0} icon="📬" color="red" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Blogs */}
        <div className="rounded-2xl p-6 border" style={{ backgroundColor:'var(--c-bg)', borderColor:'color-mix(in srgb, var(--c-primary) 12%, transparent)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold" style={{ color:'var(--c-primary)' }}>Recent Blogs</h2>
            <Link to="/admin/blogs" className="text-xs font-semibold hover:opacity-70 transition" style={{ color:'var(--c-primary)' }}>View All →</Link>
          </div>
          <div className="space-y-3">
            {stats?.recentBlogs?.map(blog => (
              <div key={blog._id} className="flex items-center justify-between py-2 border-b last:border-0"
                style={{ borderColor:'color-mix(in srgb, var(--c-primary) 8%, transparent)' }}>
                <div>
                  <p className="text-sm font-medium truncate max-w-xs" style={{ color:'var(--c-text)' }}>{blog.title}</p>
                  <p className="text-xs" style={{ color:'var(--c-text-muted)' }}>{getCategoryLabel(blog.category)} · {formatDate(blog.createdAt)}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${blog.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {blog.published ? 'Live' : 'Draft'}
                </span>
              </div>
            ))}
            {!stats?.recentBlogs?.length && <p className="text-sm text-center py-4" style={{ color:'var(--c-text-muted)' }}>No blogs yet</p>}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="rounded-2xl p-6 border" style={{ backgroundColor:'var(--c-bg)', borderColor:'color-mix(in srgb, var(--c-primary) 12%, transparent)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold" style={{ color:'var(--c-primary)' }}>Recent Messages</h2>
            <Link to="/admin/messages" className="text-xs font-semibold hover:opacity-70 transition" style={{ color:'var(--c-primary)' }}>View All →</Link>
          </div>
          <div className="space-y-3">
            {stats?.recentMessages?.map(msg => (
              <div key={msg._id} className="flex items-start justify-between py-2 border-b last:border-0"
                style={{ borderColor:'color-mix(in srgb, var(--c-primary) 8%, transparent)' }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium" style={{ color:'var(--c-text)' }}>{msg.name}</p>
                    {!msg.isRead && <span className="w-2 h-2 rounded-full" style={{ backgroundColor:'var(--c-primary)' }} />}
                  </div>
                  <p className="text-xs truncate" style={{ color:'var(--c-text-muted)' }}>{msg.subject || msg.email}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0 ${msg.type==='join' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                  {msg.type==='join' ? 'Join' : 'Contact'}
                </span>
              </div>
            ))}
            {!stats?.recentMessages?.length && <p className="text-sm text-center py-4" style={{ color:'var(--c-text-muted)' }}>No messages yet</p>}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          ['/admin/blogs/add','➕ Add Blog'],
          ['/admin/videos','🎬 Manage Videos'],
          ['/admin/gallery','🖼️ Gallery'],
          ['/admin/themes','🎨 Change Theme'],
        ].map(([to,label]) => (
          <Link key={to} to={to}
            className="p-4 rounded-xl text-sm font-semibold text-center transition-all hover:opacity-90 text-white"
            style={{ backgroundColor:'var(--c-primary)' }}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}