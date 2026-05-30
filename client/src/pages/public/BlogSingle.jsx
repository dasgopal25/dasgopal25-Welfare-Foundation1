import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug } from '../../api/blogApi';
import BlogDetails from '../../components/blog/BlogDetails';
import Loader from '../../components/common/Loader';
import { useLang } from '../../context/LanguageContext';

export default function BlogSingle() {
  const { slug } = useParams();
  const { t } = useLang();
  const [blog, setBlog]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');

  useEffect(() => {
    setLoading(true);
    getBlogBySlug(slug).then(r => setBlog(r.data.data)).catch(() => setError('Blog not found')).finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="pt-24 min-h-screen" style={{ backgroundColor:'var(--c-bg)' }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-70"
          style={{ color:'var(--c-primary)' }}>
          ← {t('Back to Blogs','ব্লগে ফিরুন')}
        </Link>
        {loading && <Loader size="lg" text={t('Loading...','লোড হচ্ছে...')} />}
        {error && (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">📭</span>
            <p style={{ color:'var(--c-text-muted)' }}>{t('Blog not found.','ব্লগ পাওয়া যায়নি।')}</p>
          </div>
        )}
        {blog && !loading && <BlogDetails blog={blog} />}
      </div>
    </div>
  );
}