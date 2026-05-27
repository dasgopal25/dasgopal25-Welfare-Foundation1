import { useState, useEffect } from 'react';
import { getDashboardStats } from '../../api/settingsApi';
import DashboardCard from '../../components/admin/DashboardCard';
import { formatDate, getCategoryLabel } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import Loader from '../../components/common/Loader';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(r => setStats(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader size="lg" text="Loading dashboard..." />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-forest dark:text-green-400">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome to Gazipur Kismat Admin Panel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Blogs" value={stats?.totalBlogs || 0} icon="📝" color="green" />
        <DashboardCard title="Published Blogs" value={stats?.publishedBlogs || 0} icon="✅" color="navy" />
        <DashboardCard title="Gallery Images" value={stats?.totalGallery || 0} icon="🖼️" color="gold" />
        <DashboardCard title="Unread Messages" value={stats?.unreadMessages || 0} icon="📬" color="red" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Blogs */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-forest dark:text-green-400">Recent Blogs</h2>
            <Link to="/admin/blogs" className="text-xs text-forest dark:text-green-400 hover:text-gold">View All →</Link>
          </div>
          <div className="space-y-3">
            {stats?.recentBlogs?.map(blog => (
              <div key={blog._id} className="flex items-center justify-between py-2 border-b dark:border-gray-800 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate max-w-xs">{blog.title}</p>
                  <p className="text-xs text-gray-400">{getCategoryLabel(blog.category)} · {formatDate(blog.createdAt)}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${blog.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                  {blog.published ? 'Live' : 'Draft'}
                </span>
              </div>
            ))}
            {!stats?.recentBlogs?.length && <p className="text-gray-400 text-sm text-center py-4">No blogs yet</p>}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-forest dark:text-green-400">Recent Messages</h2>
            <Link to="/admin/messages" className="text-xs text-forest dark:text-green-400 hover:text-gold">View All →</Link>
          </div>
          <div className="space-y-3">
            {stats?.recentMessages?.map(msg => (
              <div key={msg._id} className="flex items-start justify-between py-2 border-b dark:border-gray-800 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{msg.name}</p>
                    {!msg.isRead && <span className="w-2 h-2 bg-forest rounded-full" />}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{msg.subject || msg.email}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0 ${msg.type === 'join' ? 'bg-gold/20 text-yellow-700 dark:text-yellow-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                  {msg.type === 'join' ? 'Join' : 'Contact'}
                </span>
              </div>
            ))}
            {!stats?.recentMessages?.length && <p className="text-gray-400 text-sm text-center py-4">No messages yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
