import { useState } from 'react';
import { useLang } from '../../context/LanguageContext';

export default function GalleryGrid({ images }) {
  const { t, isBn } = useLang();
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map(img => (
          <div key={img._id} onClick={() => setSelected(img)} className="relative group cursor-pointer rounded-xl overflow-hidden bg-gradient-to-br from-forest/20 to-navy/20 aspect-square">
            {img.image ? (
              <img src={img.image} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800"><span className="text-4xl opacity-30">📸</span></div>
            )}
            <div className="absolute inset-0 bg-forest/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-xs font-medium">{isBn && img.titleBn ? img.titleBn : img.title}</p>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div onClick={() => setSelected(null)} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer">
          <div onClick={e => e.stopPropagation()} className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
            <img src={selected.image} alt={selected.title} className="w-full max-h-96 object-cover" />
            <div className="p-4">
              <h3 className="font-display font-bold text-forest dark:text-green-400">{isBn && selected.titleBn ? selected.titleBn : selected.title}</h3>
              {selected.caption && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{isBn && selected.captionBn ? selected.captionBn : selected.caption}</p>}
            </div>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70">✕</button>
          </div>
        </div>
      )}
    </>
  );
}
