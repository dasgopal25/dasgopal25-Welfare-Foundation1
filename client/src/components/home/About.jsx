import { useLang } from '../../context/LanguageContext';

export default function About() {
  const { t } = useLang();
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">{t('About Us','আমাদের সম্পর্কে')}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-forest dark:text-green-400 mt-2 mb-6">
              {t('Who We Are','আমরা কারা')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t('Gazipur Kismat Welfare Foundation is a non-governmental organization established in 2026, dedicated to social service and human welfare in Gazipur Kismat and surrounding villages.',
                 'গাজীপুর কিসমত ওয়েলফেয়ার ফাউন্ডেশন ২০২৬ সালে প্রতিষ্ঠিত একটি বেসরকারি সংস্থা।')}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {t('We work in education, health, village development, and providing relief to those in need.',
                 'আমরা শিক্ষা, স্বাস্থ্য, গ্রাম উন্নয়ন এবং অসহায়দের সহায়তায় কাজ করি।')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                [t('Mission','লক্ষ্য'), t('Serve and uplift underprivileged communities','সুবিধাবঞ্চিত সম্প্রদায়কে সেবা করা'), '🎯'],
                [t('Vision','দৃষ্টিভঙ্গি'), t('A society where everyone lives with dignity','মর্যাদার সমাজ গড়া'), '👁️'],
              ].map(([title, desc, icon]) => (
                <div key={title} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <span className="text-2xl">{icon}</span>
                  <h4 className="font-display font-semibold text-forest dark:text-green-400 mt-2 mb-1 text-sm">{title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-forest to-navy rounded-2xl h-80 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle, white 1px, transparent 0)',backgroundSize:'20px 20px'}} />
            <div className="text-center text-white z-10 px-6">
              <p className="font-display text-5xl font-bold text-gold">2026</p>
              <p className="text-green-100 mt-2 text-sm">{t('Year Established','প্রতিষ্ঠার বছর')}</p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                {[['5+',t('Programs','প্রোগ্রাম')],['100+',t('Members','সদস্য')],['10+',t('Villages','গ্রাম')]].map(([v,l]) => (
                  <div key={l} className="bg-white/10 rounded-lg p-3">
                    <p className="font-bold text-lg">{v}</p>
                    <p className="text-green-200 text-xs">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
