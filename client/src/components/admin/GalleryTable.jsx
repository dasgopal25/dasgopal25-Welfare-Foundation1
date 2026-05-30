import { adminDeleteImage } from '../../api/galleryApi';

export default function GalleryTable({ images, onRefresh }) {
  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      try { await adminDeleteImage(id); onRefresh(); }
      catch { alert('Failed to delete'); }
    }
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map(img => (
        <div key={img._id} className="group relative rounded-xl overflow-hidden aspect-square"
          style={{ backgroundColor: 'var(--c-bg-alt)', border: '1px solid color-mix(in srgb, var(--c-primary) 12%, transparent)' }}>
          {img.image
            ? <img src={img.image} alt={img.title} className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-4xl" style={{ color: 'var(--c-text-muted)' }}>📸</div>
          }
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2"
            style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}>
            <p className="text-white text-xs text-center font-medium">{img.title}</p>
            <button onClick={() => handleDelete(img._id, img.title)}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs transition-colors">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}