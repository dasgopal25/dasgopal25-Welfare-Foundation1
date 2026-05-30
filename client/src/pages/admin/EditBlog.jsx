import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminGetBlog, adminUpdateBlog } from '../../api/blogApi';
import { CATEGORIES } from '../../utils/constants';
import Loader from '../../components/common/Loader';

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:'', titleBn:'', description:'', descriptionBn:'', content:'', contentBn:'', category:'general', featured:false, published:true, tags:'' });
  const [image, setImage]   = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');

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
    e.preventDefault(); setSaving(true); setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      await adminUpdateBlog(id, fd);
      navigate('/admin/blogs');
    } catch (err) { setError(err.response?.data?.message || 'Failed to update'); }
    finally { setSaving(false); }
  };

  const cardStyle = { backgroundColor:'var(--c-bg)', border:'1px solid color-mix(in srgb, var(--c-primary) 12%, transparent)', borderRadius:'1rem', padding:'1.5rem' };
  const inputStyle = { width:'100%', padding:'0.75rem 1rem', borderRadius:'0.75rem', border:'1px solid color-mix(in srgb, var(--c-primary) 20%, transparent)', backgroundColor:'var(--c-bg-alt)', color:'var(--c-text)', fontSize:'0.875rem', outline:'none' };
  const labelStyle = { display:'block', fontSize:'0.75rem', fontWeight:'600', marginBottom:'0.375rem', color:'var(--c-text-muted)' };

  if (loading) return <Loader size="lg" text="Loading blog..." />;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/blogs')} style={{ color:'var(--c-text-muted)' }}>← Back</button>
        <h1 className="font-display text-2xl font-bold" style={{ color:'var(--c-primary)' }}>Edit Blog</h1>
      </div>

      {error && <div className="mb-4 p-3 rounded-xl text-sm" style={{ backgroundColor:'rgba(239,68,68,0.1)', color:'#dc2626', border:'1px solid rgba(239,68,68,0.2)' }}>{error}</div>}

      <form onSubmit={submit} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div style={cardStyle}>
            <h2 className="font-display font-semibold mb-4" style={{ color:'var(--c-primary)' }}>Content (English)</h2>
            <div className="space-y-4">
              <div><label style={labelStyle}>Title *</label><input name="title" value={form.title} onChange={handle} required style={inputStyle} /></div>
              <div><label style={labelStyle}>Short Description *</label><textarea name="description" value={form.description} onChange={handle} required rows={3} style={inputStyle} /></div>
              <div><label style={labelStyle}>Full Content *</label><textarea name="content" value={form.content} onChange={handle} required rows={10} style={inputStyle} /></div>
            </div>
          </div>
          <div style={cardStyle}>
            <h2 className="font-display font-semibold mb-4" style={{ color:'var(--c-primary)' }}>Content (বাংলা)</h2>
            <div className="space-y-4">
              <div><label style={labelStyle}>শিরোনাম</label><input name="titleBn" value={form.titleBn} onChange={handle} style={inputStyle} /></div>
              <div><label style={labelStyle}>সংক্ষিপ্ত বিবরণ</label><textarea name="descriptionBn" value={form.descriptionBn} onChange={handle} rows={3} style={inputStyle} /></div>
              <div><label style={labelStyle}>বিষয়বস্তু</label><textarea name="contentBn" value={form.contentBn} onChange={handle} rows={10} style={inputStyle} /></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div style={cardStyle}>
            <h2 className="font-display font-semibold mb-4" style={{ color:'var(--c-primary)' }}>Settings</h2>
            <div className="space-y-4">
              <div>
                <label style={labelStyle}>Category</label>
                <select name="category" value={form.category} onChange={handle} style={inputStyle}>
                  {CATEGORIES.filter(c => c.value !== 'all').map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div><label style={labelStyle}>Tags (comma-separated)</label><input name="tags" value={form.tags} onChange={handle} style={inputStyle} /></div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color:'var(--c-text)' }}>
                  <input type="checkbox" name="published" checked={form.published} onChange={handle} className="w-4 h-4" /> Published
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color:'var(--c-text)' }}>
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handle} className="w-4 h-4" /> Featured
                </label>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 className="font-display font-semibold mb-4" style={{ color:'var(--c-primary)' }}>Cover Image</h2>
            <label className="block w-full cursor-pointer">
              <div className="w-full h-40 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden"
                style={{ borderColor: preview ? 'var(--c-primary)' : 'color-mix(in srgb, var(--c-primary) 25%, transparent)', backgroundColor:'var(--c-bg-alt)' }}>
                {preview
                  ? <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  : <div className="text-center"><span className="text-3xl block mb-2">📸</span><p className="text-xs" style={{ color:'var(--c-text-muted)' }}>Click to change</p></div>}
              </div>
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          </div>

          <button type="submit" disabled={saving}
            className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor:'var(--c-primary)' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}