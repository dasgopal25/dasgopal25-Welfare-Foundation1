import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-forest-dark dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">G</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">{t('Gazipur Kismat', 'গাজীপুর কিসমত')}</h3>
              <p className="text-green-200 text-xs">{t('Welfare Foundation', 'ওয়েলফেয়ার ফাউন্ডেশন')}</p>
            </div>
          </div>
          <p className="text-green-100 text-sm leading-relaxed mb-4">
            {t('Dedicated to social service and human welfare activities in Gazipur Kismat and surrounding areas since 2026.',
               '২০২৬ সাল থেকে গাজীপুর কিসমত ও আশেপাশের এলাকায় সামাজিক সেবা ও মানব কল্যাণে নিবেদিত।')}
          </p>
          <p className="text-green-200 text-xs">📍 Gazipur Kismat, Dantan, Paschim Medinipur, 721426</p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-gold mb-4">{t('Quick Links', 'দ্রুত লিংক')}</h4>
          <ul className="space-y-2">
            {[['/', t('Home', 'হোম')], ['/our-work', t('Our Work', 'আমাদের কাজ')], ['/blogs', t('Blog', 'ব্লগ')], ['/gallery', t('Gallery', 'গ্যালারি')], ['/contact', t('Contact', 'যোগাযোগ')]].map(([to, label]) => (
              <li key={to}><Link to={to} className="text-green-100 hover:text-gold text-sm transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-gold mb-4">{t('Contact', 'যোগাযোগ')}</h4>
          <div className="space-y-2 text-sm text-green-100">
            <p>📧 welfarefoundationgazipurkismat@gmail.com</p>
            <p>📞 +91 9002036590</p>
          </div>
          <div className="flex gap-3 mt-6">
            <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors text-sm">f</a>
            <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors text-sm">in</a>
            <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors text-sm">yt</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <p className="text-center text-green-200 text-xs">
          © {year} Gazipur Kismat Welfare Foundation. {t('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}
        </p>
      </div>
    </footer>
  );
}
