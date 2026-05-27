import BlogCard from './BlogCard';
import Loader from '../common/Loader';
import { useLang } from '../../context/LanguageContext';

export default function BlogList({ blogs, loading }) {
  const { t } = useLang();
  if (loading) return <Loader size="lg" text={t('Loading blogs...','ব্লগ লোড হচ্ছে...')} />;
  if (!blogs.length) return (
    <div className="text-center py-16">
      <span className="text-6xl block mb-4">📭</span>
      <p className="text-gray-500 dark:text-gray-400">{t('No blogs found.','কোনো ব্লগ পাওয়া যায়নি।')}</p>
    </div>
  );
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
    </div>
  );
}
