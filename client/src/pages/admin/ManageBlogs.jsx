import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminGetBlogs } from '../../api/blogApi';
import BlogTable from '../../components/admin/BlogTable';
import Loader from '../../components/common/Loader';

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchBlogs = () => {
    setLoading(true);
    adminGetBlogs({ page, limit, search })
      .then(r => { setBlogs(r.data.data); setTotal(r.data.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBlogs(); }, [page]);
  useEffect(() => { const t = setTimeout(fetchBlogs, 400); return () => clearTimeout(t); }, [search]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest dark:text-green-400">Manage Blogs</h1>
          <p className="text-gray-500 text-sm mt-1">{total} total blogs</p>
        </div>
        <Link to="/admin/blogs/add" className="px-5 py-2.5 bg-forest hover:bg-forest-light text-white font-semibold rounded-xl transition-colors text-sm">
          + Add Blog
        </Link>
      </div>
      <div className="mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search blogs..."
          className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30" />
      </div>
      {loading ? <Loader /> : <BlogTable blogs={blogs} onRefresh={fetchBlogs} />}
      {total > limit && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(total/limit) }, (_, i) => i+1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${page===p ? 'bg-forest text-white' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
