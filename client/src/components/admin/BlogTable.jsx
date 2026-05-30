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

  const thStyle = {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: '600',
    backgroundColor: 'var(--c-bg-alt)',
    color: 'var(--c-text-muted)',
    borderBottom: '1px solid color-mix(in srgb, var(--c-primary) 12%, transparent)',
  };

  const tdStyle = {
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    borderBottom: '1px solid color-mix(in srgb, var(--c-primary) 8%, transparent)',
    color: 'var(--c-text)',
    backgroundColor: 'var(--c-bg)',
  };

  return (
    <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'color-mix(in srgb, var(--c-primary) 12%, transparent)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr>
            {['Title', 'Category', 'Date', 'Status', 'Actions'].map(h => (
              <th key={h} style={thStyle}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog._id} className="transition-colors" style={{ backgroundColor: 'var(--c-bg)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--c-bg-alt)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--c-bg)'}>
              <td style={{ ...tdStyle, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500' }}>{blog.title}</td>
              <td style={{ ...tdStyle, color: 'var(--c-text-muted)' }}>{getCategoryLabel(blog.category)}</td>
              <td style={{ ...tdStyle, color: 'var(--c-text-muted)' }}>{formatDate(blog.createdAt)}</td>
              <td style={tdStyle}>
                <span className="px-2 py-1 rounded-full text-xs font-medium"
                  style={blog.published
                    ? { backgroundColor: 'rgba(34,197,94,0.15)', color: '#16a34a' }
                    : { backgroundColor: 'color-mix(in srgb, var(--c-text-muted) 15%, transparent)', color: 'var(--c-text-muted)' }}>
                  {blog.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td style={tdStyle}>
                <div className="flex items-center gap-2">
                  <Link to={`/admin/blogs/edit/${blog._id}`}
                    className="px-3 py-1 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-80"
                    style={{ backgroundColor: 'var(--c-primary)' }}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(blog._id, blog.title)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}