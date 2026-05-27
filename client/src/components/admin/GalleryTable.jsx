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
        <div key={img._id} className="group relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
          {img.image ? <img src={img.image} alt={img.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">📸</div>}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
            <p className="text-white text-xs text-center font-medium">{img.title}</p>
            <button onClick={() => handleDelete(img._id, img.title)} className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
