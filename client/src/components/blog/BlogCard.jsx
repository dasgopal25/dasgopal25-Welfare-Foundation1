import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { formatDate, truncate, getCategoryLabel } from '../../utils/helpers';

export default function BlogCard({ blog }) {
  const { t } = useLang();
  return (
    <Link to={`/blogs/${blog.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{ backgroundColor:'var(--c-bg)', border:'1px solid color-mix(in srgb, var(--c-primary) 8%, transparent)' }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 32px color-mix(in srgb, var(--c-primary) 14%, transparent)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
      <div className="h-48 relative overflow-hidden theme-hero-bg flex-shrink-0">
        {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
        <div className="absolute inset-0" style={{ background:'linear-gradient(to top, rgba(0,0,0,0.3), transparent)' }} />
        <div className="absolute top-3 left-3">
          <span className="text-xs px-2 py-1 rounded-full font-medium text-white" style={{ backgroundColor:'var(--c-primary)' }}>
            {getCategoryLabel(blog.category)}
          </span>
        </div>
        {blog.featured && (
          <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium text-white" style={{ backgroundColor:'var(--c-accent)' }}>
            ⭐ {t('Featured','বৈশিষ্ট্যযুক্ত')}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs mb-2" style={{ color:'var(--c-text-muted)' }}>{formatDate(blog.createdAt)}</p>
        <h3 className="font-display font-bold mb-2 line-clamp-2 group-hover:opacity-80 transition-opacity"
          style={{ color:'var(--c-primary)', fontSize:'var(--font-size-base)' }}>
          {blog.title}
        </h3>
        <p className="text-sm flex-1" style={{ color:'var(--c-text-muted)' }}>{truncate(blog.description, 120)}</p>
        <div className="flex items-center justify-between mt-4 pt-4"
          style={{ borderTop:'1px solid color-mix(in srgb, var(--c-primary) 8%, transparent)' }}>
          <span className="text-xs" style={{ color:'var(--c-text-muted)' }}>👁️ {blog.views || 0} {t('views','ভিউ')}</span>
          <span className="text-xs font-semibold group-hover:opacity-70 transition-opacity" style={{ color:'var(--c-primary)' }}>
            {t('Read More →','আরো পড়ুন →')}
          </span>
        </div>
      </div>
    </Link>
  );
}