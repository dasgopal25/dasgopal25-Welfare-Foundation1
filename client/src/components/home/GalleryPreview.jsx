import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublicGallery } from '../../api/galleryApi';
import { useLang } from '../../context/LanguageContext';

const PLACEHOLDER_ICONS = ['🌾', '🤝', '📚', '🏥', '🏘️', '🌿'];
const PLACEHOLDER_LABELS_EN = ['Village Work', 'Community', 'Education', 'Health Camp', 'Development', 'Nature'];
const PLACEHOLDER_LABELS_BN = ['গ্রামীণ কাজ', 'সম্প্রদায়', 'শিক্ষা', 'স্বাস্থ্য শিবির', 'উন্নয়ন', 'প্রকৃতি'];
const GRAD_COLORS = [
  'from-forest-dark to-forest',
  'from-navy to-forest',
  'from-forest to-navy',
  'from-navy-dark to-navy',
  'from-forest to-forest-light',
  'from-navy to-forest-dark',
];

export default function GalleryPreview() {
  const { t, isBn } = useLang();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all public gallery (not just featured) to maximise shown images
    getPublicGallery()
      .then(r => setImages(r.data.data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Always build a 6-slot array: fill real images first, rest are placeholders
  const slots = Array.from({ length: 6 }, (_, i) => {
    if (images[i]) return { ...images[i], isReal: true };
    return {
      _id: `ph-${i}`,
      isReal: false,
      icon: PLACEHOLDER_ICONS[i],
      label: isBn ? PLACEHOLDER_LABELS_BN[i] : PLACEHOLDER_LABELS_EN[i],
      grad: GRAD_COLORS[i],
    };
  });

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              {t('Gallery', 'গ্যালারি')}
            </span>
            <h2 className="font-display text-3xl font-bold text-forest dark:text-green-400 mt-1">
              {t('Our Moments', 'আমাদের মুহূর্ত')}
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-sm font-semibold text-forest dark:text-green-400 hover:text-gold transition-colors"
          >
            {t('View All →', 'সব দেখুন →')}
          </Link>
        </div>

        {/* Grid — slot 0 is big (col-span-2 / row-span-2) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[160px] md:auto-rows-[180px]">
          {slots.map((slot, i) => (
            <div
              key={slot._id}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer
                ${i === 0 ? 'col-span-2 row-span-2' : ''}
              `}
            >
              {slot.isReal ? (
                /* ── Real image ── */
                <>
                  <img
                    src={slot.image}
                    alt={slot.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-forest/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white font-semibold text-sm drop-shadow">{slot.title}</span>
                  </div>
                </>
              ) : (
                /* ── Placeholder tile ── */
                <div className={`w-full h-full bg-gradient-to-br ${slot.grad} flex flex-col items-center justify-center gap-3 transition-transform duration-300 group-hover:scale-105`}>
                  <span className={`${i === 0 ? 'text-7xl' : 'text-4xl'} drop-shadow-lg`}>
                    {slot.icon}
                  </span>
                  <span className={`text-white/80 font-medium text-center px-2 ${i === 0 ? 'text-base' : 'text-xs'}`}>
                    {slot.label}
                  </span>
                  {/* Decorative dots */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                </div>
              )}

              {/* Gold corner accent on hover */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t-[28px] border-l-[28px] border-t-gold/70 border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Upload CTA if no real images */}
        {images.length === 0 && !loading && (
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
            {t('Add photos from the admin gallery to display here.', 'অ্যাডমিন গ্যালারি থেকে ছবি যোগ করুন।')}
          </p>
        )}
      </div>
    </section>
  );
}
