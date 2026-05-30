import { useState, useEffect } from 'react';
import { adminGetGallery, adminAddImage } from '../../api/galleryApi';
import GalleryTable from '../../components/admin/GalleryTable';
import Loader from '../../components/common/Loader';

export default function ManageGallery() {
  const [images, setImages]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title:'', titleBn:'', caption:'', captionBn:'', category:'general', featured:false });
  const [file, setFile]         = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError]       = useState('');

  const fetchImages = () => {
    setLoading(true);
    adminGetGallery().then(r => setImages(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { fetchImages(); }, []);

  const handleFile = e => {
    const f = e.target.files[0];
    if (f) { setFile(f); setFilePreview(URL.createObjectURL(f)); }
  };

  const submit = async e => {
    e.preventDefault();
    if (!file) return setError('Please select an image');
    setUploading(true); setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('image', file);
      await adminAddImage(fd);
      setShowForm(false);
      setForm({ title:'', titleBn:'', caption:'', captionBn:'', category:'general', featured:false });
      setFile(null); setFilePreview('');
      fetchImages();
    } catch (err) { setError(err.response?.data?.message || 'Upload failed'); }
    finally { setUploading(false); }
  };

  const cardStyle = { backgroundColor:'var(--c-bg)', border:'1px solid color-mix(in srgb, var(--c-primary) 12%, transparent)', borderRadius:'1rem', padding:'1.5rem', marginBottom:'1.5rem' };
  const inputStyle = { width:'100%', padding:'0.625rem 1rem', borderRadius:'0.75rem', border:'1px solid color-mix(in srgb, var(--c-primary) 20%, transparent)', backgroundColor:'var(--c-bg-alt)', color:'var(--c-text)', fontSize:'0.875rem', outline:'none' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color:'var(--c-primary)' }}>Manage Gallery</h1>
          <p className="text-sm mt-1" style={{ color:'var(--c-text-muted)' }}>{images.length} images</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 text-white font-semibold rounded-xl transition-all hover:opacity-90 text-sm"
          style={{ backgroundColor: showForm ? '#6b7280' : 'var(--c-primary)' }}>
          {showForm ? '✕ Cancel' : '+ Add Image'}
        </button>
      </div>

      {showForm && (
        <div style={cardStyle}>
          <h2 className="font-display font-semibold mb-4" style={{ color:'var(--c-primary)' }}>Upload New Image</h2>
          {error && <div className="mb-3 p-3 rounded-xl text-sm" style={{ backgroundColor:'rgba(239,68,68,0.1)', color:'#dc2626' }}>{error}</div>}
          <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <input value={form.title} onChange={e => setForm(p => ({...p, title:e.target.value}))} required placeholder="Title *" style={inputStyle} />
              <input value={form.titleBn} onChange={e => setForm(p => ({...p, titleBn:e.target.value}))} placeholder="বাংলা শিরোনাম" style={inputStyle} />
              <input value={form.caption} onChange={e => setForm(p => ({...p, caption:e.target.value}))} placeholder="Caption" style={inputStyle} />
              <input value={form.category} onChange={e => setForm(p => ({...p, category:e.target.value}))} placeholder="Category" style={inputStyle} />
              <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color:'var(--c-text)' }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({...p, featured:e.target.checked}))} className="w-4 h-4" />
                Featured
              </label>
            </div>
            <div>
              <label className="block cursor-pointer">
                <div className="h-48 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden"
                  style={{ borderColor: filePreview ? 'var(--c-primary)' : 'color-mix(in srgb, var(--c-primary) 25%, transparent)', backgroundColor:'var(--c-bg-alt)' }}>
                  {filePreview
                    ? <img src={filePreview} className="w-full h-full object-cover" />
                    : <div className="text-center"><span className="text-3xl mb-2 block">📸</span><p className="text-xs" style={{ color:'var(--c-text-muted)' }}>Click to upload</p></div>}
                </div>
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
              <button type="submit" disabled={uploading}
                className="w-full mt-3 py-3 text-white font-semibold rounded-xl transition-all hover:opacity-90 disabled:opacity-60 text-sm"
                style={{ backgroundColor:'var(--c-primary)' }}>
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? <Loader /> : <GalleryTable images={images} onRefresh={fetchImages} />}
    </div>
  );
}