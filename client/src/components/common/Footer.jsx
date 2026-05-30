import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: 'var(--c-primary-d, #0f2b1c)', color: '#fff' }}>
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--c-accent)' }}>
              <span className="text-white font-display font-bold text-xl">G</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">{t('Gazipur Kismat', 'গাজীপুর কিসমত')}</h3>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{t('Welfare Foundation', 'ওয়েলফেয়ার ফাউন্ডেশন')}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {t('Dedicated to social service and human welfare activities in Gazipur Kismat and surrounding areas since 2026.',
               '২০২৬ সাল থেকে গাজীপুর কিসমত ও আশেপাশের এলাকায় সামাজিক সেবা ও মানব কল্যাণে নিবেদিত।')}
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>📍 Gazipur Kismat, Dantan, Paschim Medinipur, 721426</p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4" style={{ color: 'var(--c-accent)' }}>
            {t('Quick Links', 'দ্রুত লিংক')}
          </h4>
          <ul className="space-y-2">
            {[['/', t('Home','হোম')],['/our-work',t('Our Work','আমাদের কাজ')],['/blogs',t('Blog','ব্লগ')],['/gallery',t('Gallery','গ্যালারি')],['/videos',t('Videos','ভিডিও')],['/contact',t('Contact','যোগাযোগ')]].map(([to,label]) => (
              <li key={to}>
                <Link to={to} className="text-sm transition-opacity hover:opacity-70" style={{ color: 'rgba(255,255,255,0.75)' }}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4" style={{ color: 'var(--c-accent)' }}>
            {t('Contact', 'যোগাযোগ')}
          </h4>
          <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
            <p>📧 welfarefoundationgazipurkismat@gmail.com</p>
            <p>📞 +91 9002036590</p>
          </div>
          <div className="flex gap-3 mt-6">
            {['f','in','yt'].map(s => (
              <a key={s} href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm text-white transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t py-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
          © {year} Gazipur Kismat Welfare Foundation. {t('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}
        </p>
      </div>
    </footer>
  );
}