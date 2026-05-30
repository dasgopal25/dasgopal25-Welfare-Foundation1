import { useState } from 'react';
import { useLang } from '../../context/LanguageContext';

export default function GalleryGrid({ images }) {
  const { isBn } = useLang();
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map(img => (
          <div key={img._id} onClick={() => setSelected(img)}
            className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square"
            style={{ backgroundColor:'var(--c-bg-alt)', border:'1px solid color-mix(in srgb, var(--c-primary) 8%, transparent)' }}>
            {img.image ? (
              <img src={img.image} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl" style={{ color:'var(--c-text-muted)' }}>📸</div>
            )}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3"
              style={{ background:'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }}>
              <p className="text-white text-xs font-medium">{isBn && img.titleBn ? img.titleBn : img.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor:'rgba(0,0,0,0.85)' }}>
          <div onClick={e => e.stopPropagation()}
            className="max-w-2xl w-full rounded-2xl overflow-hidden relative"
            style={{ backgroundColor:'var(--c-bg)' }}>
            <img src={selected.image} alt={selected.title} className="w-full max-h-96 object-cover" />
            <div className="p-4">
              <h3 className="font-display font-bold" style={{ color:'var(--c-primary)' }}>
                {isBn && selected.titleBn ? selected.titleBn : selected.title}
              </h3>
              {selected.caption && (
                <p className="text-sm mt-1" style={{ color:'var(--c-text-muted)' }}>
                  {isBn && selected.captionBn ? selected.captionBn : selected.caption}
                </p>
              )}
            </div>
            <button onClick={() => setSelected(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
              style={{ backgroundColor:'rgba(0,0,0,0.5)' }}>✕</button>
          </div>
        </div>
      )}
    </>
  );
}