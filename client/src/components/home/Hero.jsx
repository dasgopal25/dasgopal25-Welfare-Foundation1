import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';

export default function Hero({ settings = {} }) {
  const { t } = useLang();
  const title = t(
    settings.hero_title || 'Serving Humanity with Compassion',
    settings.hero_title_bn || 'মমতার সাথে মানবতার সেবা'
  );
  const subtitle = t(
    settings.hero_subtitle || 'Gazipur Kismat Welfare Foundation helps people through social service and human welfare activities.',
    settings.hero_subtitle_bn || 'গাজীপুর কিসমত ওয়েলফেয়ার ফাউন্ডেশন সামাজিক সেবা ও মানব কল্যাণ কার্যক্রমের মাধ্যমে মানুষকে সাহায্য করে।'
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-dark via-forest to-navy" />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, white 2px, transparent 0)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-16 w-72 h-72 rounded-full border border-white/10 animate-pulse pointer-events-none" />
      <div className="absolute bottom-24 left-16 w-44 h-44 rounded-full border border-gold/20 pointer-events-none" />
      <div className="absolute top-1/2 right-8 w-20 h-20 rounded-full bg-gold/10 pointer-events-none" />
      <div className="absolute top-1/3 left-8 w-12 h-12 rounded-full bg-white/5 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white py-32">
        {/* Badge */}
        <div className="inline-block px-4 py-1.5 border border-gold/50 rounded-full text-gold text-xs font-medium mb-8 animate-fadeIn">
          {t(
            'Est. 2026 — Gazipur Kismat, Paschim Medinipur',
            'প্রতিষ্ঠিত ২০২৬ — গাজীপুর কিসমত, পশ্চিম মেদিনীপুর'
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fadeInUp">
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className="text-green-100 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto animate-fadeInUp"
          style={{ animationDelay: '0.2s' }}
        >
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp"
          style={{ animationDelay: '0.4s' }}
        >
          <Link
            to="/our-work"
            className="px-8 py-3.5 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5"
          >
            {t('Our Activities', 'আমাদের কার্যক্রম')}
          </Link>
          <Link
            to="/join"
            className="px-8 py-3.5 border border-white/50 hover:border-white text-white font-semibold rounded-full transition-all hover:bg-white/10"
          >
            {t('Join Foundation', 'ফাউন্ডেশনে যোগ দিন')}
          </Link>
        </div>

        {/* Stats bar */}
        <div
          className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/10 animate-fadeIn"
          style={{ animationDelay: '0.6s' }}
        >
          {[
            [t('Est.', 'প্রতিষ্ঠিত'), settings.established_year || '2026'],
            [t('Members', 'সদস্য'), '100+'],
            [t('Villages', 'গ্রাম'), '5+'],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="font-display text-3xl font-bold text-gold">{value}</p>
              <p className="text-green-200 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-white/40 text-xs">{t('Scroll', 'স্ক্রোল')}</span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
