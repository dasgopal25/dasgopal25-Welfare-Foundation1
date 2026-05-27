import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug } from '../../api/blogApi';
import BlogDetails from '../../components/blog/BlogDetails';
import Loader from '../../components/common/Loader';
import { useLang } from '../../context/LanguageContext';

export default function BlogSingle() {
  const { slug } = useParams();
  const { t } = useLang();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getBlogBySlug(slug)
      .then(r => setBlog(r.data.data))
      .catch(() => setError('Blog not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-forest dark:text-green-400 hover:text-gold transition-colors mb-8">
          ← {t('Back to Blogs', 'ব্লগে ফিরুন')}
        </Link>
        {loading && <Loader size="lg" text={t('Loading...', 'লোড হচ্ছে...')} />}
        {error && (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">📭</span>
            <p className="text-gray-500 dark:text-gray-400">{t('Blog not found.', 'ব্লগ পাওয়া যায়নি।')}</p>
            <Link to="/blogs" className="mt-4 inline-block text-forest dark:text-green-400 hover:text-gold">{t('← Go Back', '← ফিরে যান')}</Link>
          </div>
        )}
        {blog && !loading && <BlogDetails blog={blog} />}
      </div>
    </div>
  );
}
