import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { formatDate, truncate, getCategoryColor, getCategoryLabel } from '../../utils/helpers';

export default function BlogCard({ blog }) {
  const { t } = useLang();
  return (
    <Link to={`/blogs/${blog.slug}`} className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
      <div className="h-48 bg-gradient-to-br from-forest to-navy relative overflow-hidden flex-shrink-0">
        {blog.image ? (
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-30"><span className="text-white text-4xl">📰</span></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(blog.category)}`}>{getCategoryLabel(blog.category)}</span>
        </div>
        {blog.featured && (
          <div className="absolute top-3 right-3 bg-gold text-white text-xs px-2 py-1 rounded-full">⭐ {t('Featured','বৈশিষ্ট্যযুক্ত')}</div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-2">{formatDate(blog.createdAt)}</p>
        <h3 className="font-display font-bold text-forest dark:text-green-400 mb-2 group-hover:text-gold transition-colors line-clamp-2">{blog.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 flex-1">{truncate(blog.description, 120)}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-400">👁️ {blog.views || 0} {t('views','ভিউ')}</span>
          <span className="text-xs font-semibold text-forest dark:text-green-400 group-hover:text-gold transition-colors">{t('Read More →','আরো পড়ুন →')}</span>
        </div>
      </div>
    </Link>
  );
}
