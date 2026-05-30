import JoinForm from '../../components/contact/JoinForm';
import { useLang } from '../../context/LanguageContext';

export default function Join() {
  const { t } = useLang();
  return (
    <div className="pt-24 min-h-screen" style={{ backgroundColor:'var(--c-bg)' }}>
      <div className="theme-hero-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display font-bold mb-3" style={{ fontSize:'clamp(2rem,5vw,var(--font-size-4xl))' }}>
            {t('Join Our Foundation','ফাউন্ডেশনে যোগ দিন')}
          </h1>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'var(--font-size-lg)' }}>
            {t('Be part of our mission to serve the community','সমাজসেবার মিশনে আমাদের অংশীদার হন')}
          </p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="rounded-2xl p-8 shadow-sm"
          style={{ backgroundColor:'var(--c-bg-alt)', border:'1px solid color-mix(in srgb, var(--c-primary) 10%, transparent)' }}>
          <h2 className="font-display font-bold mb-6" style={{ color:'var(--c-primary)', fontSize:'var(--font-size-xl)' }}>
            {t('Volunteer Application','স্বেচ্ছাসেবী আবেদন')}
          </h2>
          <JoinForm />
        </div>
      </div>
    </div>
  );
}