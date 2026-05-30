import { useLang } from '../../context/LanguageContext';
import { formatDate, getCategoryLabel } from '../../utils/helpers';

export default function BlogDetails({ blog }) {
  const { t, isBn } = useLang();
  const title   = isBn && blog.titleBn   ? blog.titleBn   : blog.title;
  const content = isBn && blog.contentBn ? blog.contentBn : blog.content;

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-6">
        <span className="text-xs px-3 py-1 rounded-full font-medium text-white" style={{ backgroundColor:'var(--c-primary)' }}>
          {getCategoryLabel(blog.category)}
        </span>
      </div>
      <h1 className="font-display font-bold mb-4" style={{ color:'var(--c-primary)', fontSize:'clamp(1.75rem,4vw,var(--font-size-4xl))' }}>
        {title}
      </h1>
      <div className="flex items-center gap-4 text-sm mb-8 pb-8"
        style={{ color:'var(--c-text-muted)', borderBottom:'1px solid color-mix(in srgb, var(--c-primary) 10%, transparent)' }}>
        {blog.author && <span>✍️ {blog.author.name}</span>}
        <span>📅 {formatDate(blog.createdAt)}</span>
        <span>👁️ {blog.views} {t('views','ভিউ')}</span>
      </div>
      {blog.image && (
        <img src={blog.image} alt={title} className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8" />
      )}
      <div className="blog-content prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}