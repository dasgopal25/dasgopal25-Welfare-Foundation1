import { Link } from 'react-router-dom';
import { adminDeleteBlog } from '../../api/blogApi';
import { getCategoryLabel, formatDate } from '../../utils/helpers';

export default function BlogTable({ blogs, onRefresh }) {
  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      try { await adminDeleteBlog(id); onRefresh(); }
      catch { alert('Failed to delete'); }
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {['Title','Category','Date','Status','Actions'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {blogs.map(blog => (
            <tr key={blog._id} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100 max-w-xs truncate">{blog.title}</td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{getCategoryLabel(blog.category)}</td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{formatDate(blog.createdAt)}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${blog.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                  {blog.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link to={`/admin/blogs/edit/${blog._id}`} className="px-3 py-1 bg-forest text-white rounded-lg text-xs hover:bg-forest-light transition-colors">Edit</Link>
                  <button onClick={() => handleDelete(blog._id, blog.title)} className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition-colors">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
