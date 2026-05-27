import { useState, useEffect } from 'react';
import { adminGetGallery, adminAddImage } from '../../api/galleryApi';
import GalleryTable from '../../components/admin/GalleryTable';
import Loader from '../../components/common/Loader';

export default function ManageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title:'', titleBn:'', caption:'', captionBn:'', category:'general', featured:false });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const fetchImages = () => {
    setLoading(true);
    adminGetGallery().then(r => setImages(r.data.data)).catch(()=>{}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchImages(); }, []);

  const handleFile = e => {
    const f = e.target.files[0];
    if (f) { setFile(f); setFilePreview(URL.createObjectURL(f)); }
  };

  const submit = async e => {
    e.preventDefault();
    if (!file) return setError('Please select an image');
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('image', file);
      await adminAddImage(fd);
      setShowForm(false);
      setForm({ title:'', titleBn:'', caption:'', captionBn:'', category:'general', featured:false });
      setFile(null); setFilePreview('');
      fetchImages();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest dark:text-green-400">Manage Gallery</h1>
          <p className="text-gray-500 text-sm mt-1">{images.length} images</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-5 py-2.5 bg-forest hover:bg-forest-light text-white font-semibold rounded-xl transition-colors text-sm">
          {showForm ? '✕ Cancel' : '+ Add Image'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 mb-6">
          <h2 className="font-display font-semibold text-forest dark:text-green-400 mb-4">Upload New Image</h2>
          {error && <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl text-sm">{error}</div>}
          <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <input name="title" value={form.title} onChange={e => setForm(p=>({...p,title:e.target.value}))} required placeholder="Title *" className={inputClass} />
              <input name="titleBn" value={form.titleBn} onChange={e => setForm(p=>({...p,titleBn:e.target.value}))} placeholder="বাংলা শিরোনাম" className={inputClass} />
              <input name="caption" value={form.caption} onChange={e => setForm(p=>({...p,caption:e.target.value}))} placeholder="Caption" className={inputClass} />
              <input name="category" value={form.category} onChange={e => setForm(p=>({...p,category:e.target.value}))} placeholder="Category" className={inputClass} />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(p=>({...p,featured:e.target.checked}))} className="w-4 h-4 accent-gold" />
                <span className="text-sm dark:text-gray-300">Featured</span>
              </label>
            </div>
            <div>
              <label className="block cursor-pointer">
                <div className={`h-48 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden ${filePreview ? 'border-forest' : 'border-gray-200 dark:border-gray-700 hover:border-forest'}`}>
                  {filePreview ? <img src={filePreview} className="w-full h-full object-cover" /> : (
                    <div className="text-center"><span className="text-3xl mb-2 block">📸</span><p className="text-xs text-gray-400">Click to upload</p></div>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
              <button type="submit" disabled={uploading} className="w-full mt-3 py-3 bg-forest hover:bg-forest-light text-white font-semibold rounded-xl transition-colors disabled:opacity-60 text-sm">
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
