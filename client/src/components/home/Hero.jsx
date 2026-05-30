import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';

export default function Hero({ settings = {} }) {
  const { t } = useLang();
  const title    = t(settings.hero_title    || 'Serving Humanity with Compassion', settings.hero_title_bn    || 'মমতার সাথে মানবতার সেবা');
  const subtitle = t(settings.hero_subtitle || 'Gazipur Kismat Welfare Foundation helps people through social service and human welfare activities.', settings.hero_subtitle_bn || 'গাজীপুর কিসমত ওয়েলফেয়ার ফাউন্ডেশন সামাজিক সেবা ও মানব কল্যাণ কার্যক্রমের মাধ্যমে মানুষকে সাহায্য করে।');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden theme-hero-bg">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage:'radial-gradient(circle at 25px 25px, white 2px, transparent 0)', backgroundSize:'50px 50px' }} />
      {/* Accent top/bottom lines */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background:'linear-gradient(to right, transparent, var(--c-accent), transparent)' }} />
      <div className="absolute bottom-0 left-0 w-full h-1" style={{ background:'linear-gradient(to right, transparent, var(--c-accent), transparent)' }} />
      {/* Decorative circles */}
      <div className="absolute top-20 right-16 w-72 h-72 rounded-full border border-white/10 animate-pulse pointer-events-none" />
      <div className="absolute bottom-24 left-16 w-44 h-44 rounded-full border-2 border-white/10 pointer-events-none" />
      <div className="absolute top-1/2 right-8 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white py-32">
        {/* Badge */}
        <div className="inline-block px-4 py-1.5 border rounded-full text-xs font-medium mb-8 animate-fadeIn"
          style={{ borderColor: 'var(--c-accent)', color: 'var(--c-accent)' }}>
          {t('Est. 2026 — Gazipur Kismat, Paschim Medinipur','প্রতিষ্ঠিত ২০২৬ — গাজীপুর কিসমত, পশ্চিম মেদিনীপুর')}
        </div>
        {/* Title */}
        <h1 className="font-display font-bold leading-tight mb-6 animate-fadeInUp"
          style={{ fontSize: 'clamp(2rem, 5vw, var(--font-size-4xl))' }}>
          {title}
        </h1>
        {/* Subtitle */}
        <p className="leading-relaxed mb-10 max-w-2xl mx-auto animate-fadeInUp text-white/85"
          style={{ fontSize: 'var(--font-size-lg)', animationDelay: '0.2s' }}>
          {subtitle}
        </p>
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay:'0.4s' }}>
          <Link to="/our-work"
            className="px-8 py-3.5 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ backgroundColor: 'var(--c-accent)' }}>
            {t('Our Activities','আমাদের কার্যক্রম')}
          </Link>
          <Link to="/join"
            className="px-8 py-3.5 border border-white/50 hover:border-white text-white font-semibold rounded-full transition-all hover:bg-white/10">
            {t('Join Foundation','ফাউন্ডেশনে যোগ দিন')}
          </Link>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/15 animate-fadeIn" style={{ animationDelay:'0.6s' }}>
          {[[t('Est.','প্রতিষ্ঠিত'), settings.established_year||'2026'],[t('Members','সদস্য'),'100+'],[t('Villages','গ্রাম'),'5+']].map(([label,value]) => (
            <div key={label}>
              <p className="font-display font-bold" style={{ fontSize:'var(--font-size-3xl)', color:'var(--c-accent)' }}>{value}</p>
              <p className="text-white/60 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-white/40 text-xs">{t('Scroll','স্ক্রোল')}</span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}