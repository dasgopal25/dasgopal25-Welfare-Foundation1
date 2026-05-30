import { useState, useEffect } from 'react';
import { getPublicSettings } from '../../api/settingsApi';
import Hero from '../../components/home/Hero';
import About from '../../components/home/About';
import WorkingSection from '../../components/home/WorkingSection';
import GalleryPreview from '../../components/home/GalleryPreview';
import VideoSection from '../../components/home/VideoSection';
import FeaturedBlogs from '../../components/home/FeaturedBlogs';
import { useLang } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t } = useLang();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    getPublicSettings().then(r => setSettings(r.data.data)).catch(() => {});
  }, []);

  return (
    <>
      <Hero settings={settings} />
      <About />
      <WorkingSection />
      <GalleryPreview />
      <VideoSection />
      <FeaturedBlogs />

      {/* Join CTA */}
      <section className="py-20 text-white text-center theme-hero-bg">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display font-bold mb-4" style={{ fontSize:'var(--font-size-3xl)' }}>
            {t('Join Our Mission','আমাদের মিশনে যোগ দিন')}
          </h2>
          <p className="mb-8 text-white/80" style={{ fontSize:'var(--font-size-lg)' }}>
            {t('Together we can make a difference in our community.','একসাথে আমরা আমাদের সমাজে পরিবর্তন আনতে পারি।')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join"
              className="px-8 py-3.5 rounded-full font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor:'var(--c-accent)' }}>
              {t('Become a Volunteer','স্বেচ্ছাসেবী হন')}
            </Link>
            <Link to="/contact"
              className="px-8 py-3.5 border border-white/50 hover:border-white text-white font-semibold rounded-full transition-all hover:bg-white/10">
              {t('Contact Us','যোগাযোগ করুন')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}