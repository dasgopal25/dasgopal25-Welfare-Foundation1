import { useState, useEffect } from 'react';
import { getPublicBlogs } from '../../api/blogApi';
import BlogList from '../../components/blog/BlogList';
import { useLang } from '../../context/LanguageContext';
import { CATEGORIES } from '../../utils/constants';

export default function Blogs() {
  const { t, isBn } = useLang();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 9;

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (category !== 'all') params.category = category;
      if (search) params.search = search;
      const r = await getPublicBlogs(params);
      setBlogs(r.data.data);
      setTotal(r.data.total);
    } catch { }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBlogs(); }, [category, page]);
  useEffect(() => { const t = setTimeout(fetchBlogs, 400); return () => clearTimeout(t); }, [search]);

  return (
    <div className="pt-24 min-h-screen">
      <div className="bg-gradient-to-br from-forest to-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">{t('Our Blog','আমাদের ব্লগ')}</h1>
          <p className="text-green-100">{t('News, updates and stories from the foundation','ফাউন্ডেশনের সংবাদ, আপডেট ও গল্প')}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('Search blogs...','ব্লগ খুঁজুন...')}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm" />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c.value} onClick={() => { setCategory(c.value); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${category === c.value ? 'bg-forest text-white dark:bg-green-700' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-forest dark:hover:border-green-700'}`}>
                {isBn ? c.labelBn : c.label}
              </button>
            ))}
          </div>
        </div>
        <BlogList blogs={blogs} loading={loading} />
        {/* Pagination */}
        {total > limit && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: Math.ceil(total/limit) }, (_, i) => i+1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${page === p ? 'bg-forest text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
