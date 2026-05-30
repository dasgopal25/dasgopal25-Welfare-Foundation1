import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedBlogs } from '../../api/blogApi';
import { useLang } from '../../context/LanguageContext';
import { formatDate, truncate, getCategoryLabel } from '../../utils/helpers';

export default function FeaturedBlogs() {
  const { t } = useLang();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getFeaturedBlogs().then(r => setBlogs(r.data.data)).catch(() => {});
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section className="py-20" style={{ backgroundColor:'var(--c-bg)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color:'var(--c-accent)' }}>
              {t('Latest News','সর্বশেষ সংবাদ')}
            </span>
            <h2 className="font-display font-bold mt-1" style={{ color:'var(--c-primary)', fontSize:'var(--font-size-3xl)' }}>
              {t('Featured Blogs','বৈশিষ্ট্যযুক্ত ব্লগ')}
            </h2>
          </div>
          <Link to="/blogs" className="text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color:'var(--c-primary)' }}>
            {t('View All →','সব দেখুন →')}
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <Link key={blog._id} to={`/blogs/${blog.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
              style={{ backgroundColor:'var(--c-bg-alt)', border:'1px solid color-mix(in srgb, var(--c-primary) 8%, transparent)' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 32px color-mix(in srgb, var(--c-primary) 14%, transparent)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
              <div className="h-48 relative overflow-hidden theme-hero-bg">
                {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                <div className="absolute top-3 left-3">
                  <span className="text-xs px-2 py-1 rounded-full font-medium text-white"
                    style={{ backgroundColor:'var(--c-primary)' }}>
                    {getCategoryLabel(blog.category)}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs mb-2" style={{ color:'var(--c-text-muted)' }}>{formatDate(blog.createdAt)}</p>
                <h3 className="font-display font-bold mb-2 group-hover:opacity-80 transition-opacity"
                  style={{ color:'var(--c-primary)', fontSize:'var(--font-size-base)' }}>
                  {blog.title}
                </h3>
                <p className="text-sm flex-1" style={{ color:'var(--c-text-muted)' }}>{truncate(blog.description, 100)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}