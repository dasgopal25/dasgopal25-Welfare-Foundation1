import { useState, useEffect } from 'react';
import { getPublicGallery } from '../../api/galleryApi';
import GalleryGrid from '../../components/gallery/GalleryGrid';
import Loader from '../../components/common/Loader';
import { useLang } from '../../context/LanguageContext';

export default function Gallery() {
  const { t } = useLang();
  const [images, setImages]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicGallery().then(r => setImages(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-24 min-h-screen" style={{ backgroundColor:'var(--c-bg)' }}>
      <div className="theme-hero-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display font-bold mb-3" style={{ fontSize:'clamp(2rem,5vw,var(--font-size-4xl))' }}>{t('Gallery','গ্যালারি')}</h1>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'var(--font-size-lg)' }}>{t('Moments from our activities and events','আমাদের কার্যক্রম ও ইভেন্টের মুহূর্তসমূহ')}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? <Loader size="lg" text={t('Loading gallery...','গ্যালারি লোড হচ্ছে...')} />
          : images.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-6xl block mb-4">🖼️</span>
              <p style={{ color:'var(--c-text-muted)' }}>{t('No images yet.','এখনো কোনো ছবি নেই।')}</p>
            </div>
          ) : <GalleryGrid images={images} />}
      </div>
    </div>
  );
}