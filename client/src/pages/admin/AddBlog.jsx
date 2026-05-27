import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminCreateBlog } from '../../api/blogApi';
import { CATEGORIES } from '../../utils/constants';

export default function AddBlog() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:'', titleBn:'', description:'', descriptionBn:'', content:'', contentBn:'', category:'general', featured:false, published:true, tags:'' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      await adminCreateBlog(fd);
      navigate('/admin/blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition";

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/blogs')} className="text-gray-500 hover:text-forest dark:hover:text-green-400 transition-colors">← Back</button>
        <h1 className="font-display text-2xl font-bold text-forest dark:text-green-400">Add New Blog</h1>
      </div>
      {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl text-sm">{error}</div>}
      <form onSubmit={submit} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
            <h2 className="font-display font-semibold text-forest dark:text-green-400">Content (English)</h2>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Title *</label>
              <input name="title" value={form.title} onChange={handle} required className={inputClass} placeholder="Blog title..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Short Description *</label>
              <textarea name="description" value={form.description} onChange={handle} required rows={3} className={inputClass} placeholder="Brief description..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Full Content *</label>
              <textarea name="content" value={form.content} onChange={handle} required rows={10} className={inputClass} placeholder="Write full blog content here (HTML supported)..." />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
            <h2 className="font-display font-semibold text-forest dark:text-green-400">Content (বাংলা)</h2>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">শিরোনাম (Bangla Title)</label>
              <input name="titleBn" value={form.titleBn} onChange={handle} className={inputClass} placeholder="বাংলা শিরোনাম..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">সংক্ষিপ্ত বিবরণ</label>
              <textarea name="descriptionBn" value={form.descriptionBn} onChange={handle} rows={3} className={inputClass} placeholder="সংক্ষিপ্ত বিবরণ..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">বিষয়বস্তু</label>
              <textarea name="contentBn" value={form.contentBn} onChange={handle} rows={10} className={inputClass} placeholder="সম্পূর্ণ বিষয়বস্তু লিখুন..." />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
            <h2 className="font-display font-semibold text-forest dark:text-green-400">Settings</h2>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Category</label>
              <select name="category" value={form.category} onChange={handle} className={inputClass}>
                {CATEGORIES.filter(c => c.value !== 'all').map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Tags (comma-separated)</label>
              <input name="tags" value={form.tags} onChange={handle} className={inputClass} placeholder="welfare, education, health" />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="published" checked={form.published} onChange={handle} className="w-4 h-4 accent-forest" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handle} className="w-4 h-4 accent-gold" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Featured</span>
              </label>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="font-display font-semibold text-forest dark:text-green-400 mb-4">Cover Image</h2>
            <label className="block w-full cursor-pointer">
              <div className={`w-full h-40 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors ${preview ? 'border-forest' : 'border-gray-200 dark:border-gray-700 hover:border-forest'}`}>
                {preview ? <img src={preview} alt="preview" className="w-full h-full object-cover" /> : (
                  <div className="text-center">
                    <span className="text-3xl block mb-2">📸</span>
                    <p className="text-xs text-gray-400">Click to upload image</p>
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-forest hover:bg-forest-light text-white font-semibold rounded-xl transition-colors disabled:opacity-60">
            {loading ? 'Publishing...' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  );
}
