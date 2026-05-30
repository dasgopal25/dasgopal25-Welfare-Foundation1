import ContactForm from '../../components/contact/ContactForm';
import { useLang } from '../../context/LanguageContext';

export default function Contact() {
  const { t } = useLang();
  return (
    <div className="pt-24 min-h-screen" style={{ backgroundColor:'var(--c-bg)' }}>
      <div className="theme-hero-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display font-bold mb-3" style={{ fontSize:'clamp(2rem,5vw,var(--font-size-4xl))' }}>{t('Contact Us','যোগাযোগ করুন')}</h1>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'var(--font-size-lg)' }}>{t('Get in touch with us','আমাদের সাথে যোগাযোগ করুন')}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div>
            <h2 className="font-display font-bold mb-6" style={{ color:'var(--c-primary)', fontSize:'var(--font-size-2xl)' }}>
              {t('Reach Us','আমাদের সাথে যোগাযোগ')}
            </h2>
            <div className="space-y-5">
              {[
                ['📍', t('Address','ঠিকানা'),      'Gazipur Kismat, Dantan, Paschim Medinipur, West Bengal - 721426'],
                ['📧', t('Email','ইমেইল'),          'welfarefoundationgazipurkismat@gmail.com'],
                ['📞', t('Phone','ফোন'),            '+91 9002036590'],
                ['🕐', t('Office Hours','অফিসের সময়'), t('Mon–Sat: 9AM – 6PM','সোম–শনি: সকাল ৯টা – বিকেল ৬টা')],
              ].map(([icon, label, value]) => (
                <div key={label} className="flex gap-4">
                  <span className="text-2xl mt-0.5">{icon}</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color:'var(--c-text)' }}>{label}</p>
                    <p className="text-sm" style={{ color:'var(--c-text-muted)' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Map placeholder */}
            <div className="mt-8 h-48 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor:'var(--c-bg-alt)', border:'1px solid color-mix(in srgb, var(--c-primary) 15%, transparent)' }}>
              <div className="text-center">
                <span className="text-4xl block mb-2">🗺️</span>
                <p className="text-sm" style={{ color:'var(--c-text-muted)' }}>{t('Gazipur Kismat, Dantan','গাজীপুর কিসমত, দাঁতন')}</p>
                <p className="text-xs" style={{ color:'var(--c-text-muted)' }}>Paschim Medinipur, 721426</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl p-8 shadow-sm"
            style={{ backgroundColor:'var(--c-bg-alt)', border:'1px solid color-mix(in srgb, var(--c-primary) 10%, transparent)' }}>
            <h2 className="font-display font-bold mb-6" style={{ color:'var(--c-primary)', fontSize:'var(--font-size-xl)' }}>
              {t('Send a Message','বার্তা পাঠান')}
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}