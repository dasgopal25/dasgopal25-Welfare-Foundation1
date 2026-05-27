import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminGetBlog, adminUpdateBlog } from '../../api/blogApi';
import { CATEGORIES } from '../../utils/constants';
import Loader from '../../components/common/Loader';

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:'', titleBn:'', description:'', descriptionBn:'', content:'', contentBn:'', category:'general', featured:false, published:true, tags:'' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    adminGetBlog(id).then(r => {
      const b = r.data.data;
      setForm({ title:b.title||'', titleBn:b.titleBn||'', description:b.description||'', descriptionBn:b.descriptionBn||'', content:b.content||'', contentBn:b.contentBn||'', category:b.category||'general', featured:b.featured||false, published:b.published!==false, tags:(b.tags||[]).join(', ') });
      setPreview(b.image || '');
    }).catch(() => setError('Failed to load blog')).finally(() => setLoading(false));
  }, [id]);

  const handle = e => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImage = e => {
    const file = e.target.files[0];
    if (file) { setImage(file); setPreview(URL.createObjectURL(file)); }
  };

  const submit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      await adminUpdateBlog(id, fd);
      navigate('/admin/blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition";

  if (loading) return <Loader size="lg" text="Loading blog..." />;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/blogs')} className="text-gray-500 hover:text-forest dark:hover:text-green-400">← Back</button>
        <h1 className="font-display text-2xl font-bold text-forest dark:text-green-400">Edit Blog</h1>
      </div>
      {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl text-sm">{error}</div>}
      <form onSubmit={submit} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
            <h2 className="font-display font-semibold text-forest dark:text-green-400">Content (English)</h2>
            <input name="title" value={form.title} onChange={handle} required placeholder="Title *" className={inputClass} />
            <textarea name="description" value={form.description} onChange={handle} required rows={3} placeholder="Description *" className={inputClass} />
            <textarea name="content" value={form.content} onChange={handle} required rows={10} placeholder="Full content..." className={inputClass} />
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
            <h2 className="font-display font-semibold text-forest dark:text-green-400">Content (বাংলা)</h2>
            <input name="titleBn" value={form.titleBn} onChange={handle} placeholder="বাংলা শিরোনাম" className={inputClass} />
            <textarea name="descriptionBn" value={form.descriptionBn} onChange={handle} rows={3} placeholder="সংক্ষিপ্ত বিবরণ" className={inputClass} />
            <textarea name="contentBn" value={form.contentBn} onChange={handle} rows={10} placeholder="সম্পূর্ণ বিষয়বস্তু" className={inputClass} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
            <h2 className="font-display font-semibold text-forest dark:text-green-400">Settings</h2>
            <select name="category" value={form.category} onChange={handle} className={inputClass}>
              {CATEGORIES.filter(c => c.value !== 'all').map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <input name="tags" value={form.tags} onChange={handle} placeholder="Tags (comma-separated)" className={inputClass} />
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="published" checked={form.published} onChange={handle} className="w-4 h-4 accent-forest" />
                <span className="text-sm dark:text-gray-300">Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handle} className="w-4 h-4 accent-gold" />
                <span className="text-sm dark:text-gray-300">Featured</span>
              </label>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="font-display font-semibold text-forest dark:text-green-400 mb-4">Cover Image</h2>
            <label className="block w-full cursor-pointer">
              <div className={`w-full h-40 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden ${preview ? 'border-forest' : 'border-gray-200 dark:border-gray-700 hover:border-forest'}`}>
                {preview ? <img src={preview} alt="preview" className="w-full h-full object-cover" /> : (
                  <div className="text-center"><span className="text-3xl block mb-2">📸</span><p className="text-xs text-gray-400">Click to change image</p></div>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          </div>
          <button type="submit" disabled={saving} className="w-full py-3.5 bg-forest hover:bg-forest-light text-white font-semibold rounded-xl transition-colors disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
