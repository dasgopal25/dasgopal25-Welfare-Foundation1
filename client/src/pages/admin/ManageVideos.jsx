import { useState, useEffect } from 'react';
import { adminGetVideos, adminCreateVideo, adminUpdateVideo, adminDeleteVideo } from '../../api/videoApi';

const CATEGORIES = ['general','events','social-work','education','donation'];

const extractId = (url) => {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : '';
};

export default function ManageVideos() {
  const [videos, setVideos]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [error, setError]       = useState('');
  const [saving, setSaving]     = useState(false);
  const [form, setForm] = useState({ title:'', titleBn:'', description:'', descriptionBn:'', youtubeUrl:'', category:'general', featured:false, published:true, order:0 });

  const fetchVideos = () => {
    setLoading(true);
    adminGetVideos().then(r=>setVideos(r.data.data)).catch(()=>{}).finally(()=>setLoading(false));
  };

  useEffect(()=>{ fetchVideos(); },[]);

  const openAdd = () => { setEditing(null); setForm({ title:'',titleBn:'',description:'',descriptionBn:'',youtubeUrl:'',category:'general',featured:false,published:true,order:0 }); setShowForm(true); setError(''); };
  const openEdit = (v) => { setEditing(v); setForm({ title:v.title,titleBn:v.titleBn||'',description:v.description||'',descriptionBn:v.descriptionBn||'',youtubeUrl:v.youtubeUrl||'',category:v.category,featured:v.featured,published:v.published,order:v.order }); setShowForm(true); setError(''); };

  const handle = e => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type==='checkbox' ? checked : value }));
  };

  const submit = async e => {
    e.preventDefault();
    if (!form.youtubeUrl) return setError('YouTube URL is required');
    const yid = extractId(form.youtubeUrl);
    if (!yid) return setError('Invalid YouTube URL');
    setSaving(true); setError('');
    try {
      if (editing) await adminUpdateVideo(editing._id, form);
      else await adminCreateVideo(form);
      setShowForm(false); setEditing(null); fetchVideos();
    } catch(err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const del = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    await adminDeleteVideo(id); fetchVideos();
  };

  const previewId = form.youtubeUrl ? extractId(form.youtubeUrl) : '';

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition"
    + " bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color:'var(--c-primary)' }}>Manage Videos</h1>
          <p className="text-sm mt-1" style={{ color:'var(--c-text-muted)' }}>{videos.length} videos</p>
        </div>
        <button onClick={openAdd} className="px-5 py-2.5 text-white font-semibold rounded-xl transition text-sm"
          style={{ backgroundColor:'var(--c-primary)' }}>+ Add Video</button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor:'rgba(0,0,0,0.6)' }}>
          <div className="w-full max-w-2xl rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor:'var(--c-bg)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-lg" style={{ color:'var(--c-primary)' }}>
                {editing ? 'Edit Video' : 'Add New Video'}
              </h2>
              <button onClick={()=>setShowForm(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor:'var(--c-primary)' }}>✕</button>
            </div>
            {error && <div className="mb-4 p-3 rounded-xl text-sm bg-red-50 text-red-700">{error}</div>}
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="title" value={form.title} onChange={handle} required placeholder="Title (EN) *" className={inputClass} style={{ borderColor:'color-mix(in srgb, var(--c-primary) 25%, transparent)' }} />
                <input name="titleBn" value={form.titleBn} onChange={handle} placeholder="শিরোনাম (বাংলা)" className={inputClass} style={{ borderColor:'color-mix(in srgb, var(--c-primary) 25%, transparent)' }} />
              </div>
              <div>
                <input name="youtubeUrl" value={form.youtubeUrl} onChange={handle} required
                  placeholder="YouTube URL (e.g. https://youtube.com/watch?v=xxxxx) *"
                  className={inputClass} style={{ borderColor:'color-mix(in srgb, var(--c-primary) 25%, transparent)' }} />
              </div>
              {/* Thumbnail preview */}
              {previewId && (
                <div className="rounded-xl overflow-hidden aspect-video max-h-36 w-full">
                  <img src={`https://img.youtube.com/vi/${previewId}/hqdefault.jpg`} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <textarea name="description" value={form.description} onChange={handle} rows={2} placeholder="Description (EN)" className={inputClass} style={{ borderColor:'color-mix(in srgb, var(--c-primary) 25%, transparent)' }} />
                <textarea name="descriptionBn" value={form.descriptionBn} onChange={handle} rows={2} placeholder="বিবরণ (বাংলা)" className={inputClass} style={{ borderColor:'color-mix(in srgb, var(--c-primary) 25%, transparent)' }} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <select name="category" value={form.category} onChange={handle} className={inputClass} style={{ borderColor:'color-mix(in srgb, var(--c-primary) 25%, transparent)' }}>
                  {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <input type="number" name="order" value={form.order} onChange={handle} placeholder="Order (0=first)" className={inputClass} style={{ borderColor:'color-mix(in srgb, var(--c-primary) 25%, transparent)' }} />
                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="checkbox" name="published" checked={form.published} onChange={handle} className="w-4 h-4" />
                    Published
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="checkbox" name="featured" checked={form.featured} onChange={handle} className="w-4 h-4" />
                    Featured
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-3 text-white font-semibold rounded-xl transition disabled:opacity-60"
                  style={{ backgroundColor:'var(--c-primary)' }}>
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Video'}
                </button>
                <button type="button" onClick={()=>setShowForm(false)} className="px-6 py-3 rounded-xl border font-semibold text-sm"
                  style={{ borderColor:'var(--c-primary)', color:'var(--c-primary)' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Videos table */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor:'var(--c-primary)', borderTopColor:'transparent' }} /></div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">🎬</span>
          <p style={{ color:'var(--c-text-muted)' }}>No videos yet. Add your first video!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map(v => (
            <div key={v._id} className="rounded-2xl overflow-hidden border transition-shadow hover:shadow-md"
              style={{ backgroundColor:'var(--c-bg)', borderColor:'color-mix(in srgb, var(--c-primary) 15%, transparent)' }}>
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                {v.thumbnail
                  ? <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-4xl">🎬</div>
                }
                <div className="absolute top-2 right-2 flex gap-1">
                  {v.featured && <span className="px-2 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor:'var(--c-accent)' }}>★ Featured</span>}
                  <span className={`px-2 py-0.5 rounded-full text-xs text-white ${v.published ? 'bg-green-500' : 'bg-gray-400'}`}>{v.published?'Live':'Draft'}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm truncate mb-1" style={{ color:'var(--c-primary)' }}>{v.title}</p>
                <p className="text-xs truncate mb-3" style={{ color:'var(--c-text-muted)' }}>{v.youtubeUrl}</p>
                <div className="flex gap-2">
                  <button onClick={()=>openEdit(v)} className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-white transition"
                    style={{ backgroundColor:'var(--c-primary)' }}>Edit</button>
                  <button onClick={()=>del(v._id,v.title)} className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-white bg-red-500 hover:bg-red-600 transition">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}