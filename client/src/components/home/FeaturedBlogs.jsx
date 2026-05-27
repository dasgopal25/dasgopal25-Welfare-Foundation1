import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedBlogs } from '../../api/blogApi';
import { useLang } from '../../context/LanguageContext';
import { formatDate, truncate, getCategoryColor, getCategoryLabel } from '../../utils/helpers';

export default function FeaturedBlogs() {
  const { t } = useLang();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getFeaturedBlogs().then(r => setBlogs(r.data.data)).catch(()=>{});
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">{t('Latest News','সর্বশেষ সংবাদ')}</span>
            <h2 className="font-display text-3xl font-bold text-forest dark:text-green-400 mt-1">{t('Featured Blogs','বৈশিষ্ট্যযুক্ত ব্লগ')}</h2>
          </div>
          <Link to="/blogs" className="text-sm font-semibold text-forest dark:text-green-400 hover:text-gold transition-colors">{t('View All →','সব দেখুন →')}</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <Link key={blog._id} to={`/blogs/${blog.slug}`} className="group bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
              <div className="h-48 bg-gradient-to-br from-forest to-navy relative overflow-hidden">
                {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(blog.category)}`}>{getCategoryLabel(blog.category)}</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-2">{formatDate(blog.createdAt)}</p>
                <h3 className="font-display font-bold text-forest dark:text-green-400 mb-2 group-hover:text-gold transition-colors">{blog.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{truncate(blog.description, 100)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
