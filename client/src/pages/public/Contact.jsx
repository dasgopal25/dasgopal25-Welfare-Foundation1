import ContactForm from '../../components/contact/ContactForm';
import { useLang } from '../../context/LanguageContext';

export default function Contact() {
  const { t } = useLang();
  return (
    <div className="pt-24 min-h-screen">
      <div className="bg-gradient-to-br from-forest to-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">{t('Contact Us', 'যোগাযোগ করুন')}</h1>
          <p className="text-green-100">{t('Get in touch with us', 'আমাদের সাথে যোগাযোগ করুন')}</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-forest dark:text-green-400 mb-6">{t('Reach Us', 'আমাদের সাথে যোগাযোগ')}</h2>
            <div className="space-y-5">
              {[
                ['📍', t('Address', 'ঠিকানা'), 'Gazipur Kismat, Dantan, Paschim Medinipur, West Bengal - 721426'],
                ['📧', t('Email', 'ইমেইল'), 'welfarefoundationgazipurkismat@gmail.com'],
                ['📞', t('Phone', 'ফোন'), '+91 9002036590'],
                ['🕐', t('Office Hours', 'অফিসের সময়'), t('Mon–Sat: 9AM – 6PM', 'সোম–শনি: সকাল ৯টা – বিকেল ৬টা')],
              ].map(([icon, label, value]) => (
                <div key={label} className="flex gap-4">
                  <span className="text-2xl mt-0.5">{icon}</span>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm">{label}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Map placeholder */}
            <div className="mt-8 h-48 bg-gradient-to-br from-forest/10 to-navy/10 dark:from-forest/20 dark:to-navy/20 rounded-2xl flex items-center justify-center border border-forest/20 dark:border-green-800">
              <div className="text-center">
                <span className="text-4xl block mb-2">🗺️</span>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t('Gazipur Kismat, Dantan', 'গাজীপুর কিসমত, দাঁতন')}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{t('Paschim Medinipur, 721426', 'পশ্চিম মেদিনীপুর, ৭২১৪২৬')}</p>
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="font-display text-xl font-bold text-forest dark:text-green-400 mb-6">{t('Send a Message', 'বার্তা পাঠান')}</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
