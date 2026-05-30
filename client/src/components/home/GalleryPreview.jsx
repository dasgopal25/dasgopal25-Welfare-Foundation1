import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublicGallery } from '../../api/galleryApi';
import { useLang } from '../../context/LanguageContext';

const PLACEHOLDER_ICONS = ['🌾','🤝','📚','🏥','🏘️','🌿'];
const LABELS_EN = ['Village Work','Community','Education','Health Camp','Development','Nature'];
const LABELS_BN = ['গ্রামীণ কাজ','সম্প্রদায়','শিক্ষা','স্বাস্থ্য শিবির','উন্নয়ন','প্রকৃতি'];

export default function GalleryPreview() {
  const { t, isBn } = useLang();
  const [images, setImages] = useState([]);

  useEffect(() => {
    getPublicGallery().then(r => setImages(r.data.data.slice(0, 6))).catch(() => {});
  }, []);

  const slots = Array.from({ length: 6 }, (_, i) =>
    images[i] ? { ...images[i], isReal:true } : { _id:`ph-${i}`, isReal:false, icon:PLACEHOLDER_ICONS[i], label: isBn ? LABELS_BN[i] : LABELS_EN[i] }
  );

  return (
    <section className="py-20" style={{ backgroundColor:'var(--c-bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color:'var(--c-accent)' }}>
              {t('Gallery','গ্যালারি')}
            </span>
            <h2 className="font-display font-bold mt-1" style={{ color:'var(--c-primary)', fontSize:'var(--font-size-3xl)' }}>
              {t('Our Moments','আমাদের মুহূর্ত')}
            </h2>
          </div>
          <Link to="/gallery" className="text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color:'var(--c-primary)' }}>
            {t('View All →','সব দেখুন →')}
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[160px] md:auto-rows-[180px]">
          {slots.map((slot, i) => (
            <div key={slot._id}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
              {slot.isReal ? (
                <>
                  <img src={slot.image} alt={slot.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
                    style={{ background:'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                    <span className="text-white font-semibold text-sm">{slot.title}</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 transition-transform duration-300 group-hover:scale-105 theme-hero-bg">
                  <span className={`${i === 0 ? 'text-7xl' : 'text-4xl'}`}>{slot.icon}</span>
                  <span className={`text-white/75 font-medium text-center px-3 ${i === 0 ? 'text-base' : 'text-xs'}`}>{slot.label}</span>
                  <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage:'radial-gradient(circle, white 1px, transparent 0)', backgroundSize:'20px 20px' }} />
                </div>
              )}
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-0 h-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ borderTop:'28px solid var(--c-accent)', borderRight:'28px solid transparent' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}