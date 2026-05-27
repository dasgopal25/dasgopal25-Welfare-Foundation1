import JoinForm from '../../components/contact/JoinForm';
import { useLang } from '../../context/LanguageContext';

export default function Join() {
  const { t } = useLang();
  return (
    <div className="pt-24 min-h-screen">
      <div className="bg-gradient-to-br from-forest to-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">{t('Join Our Foundation', 'ফাউন্ডেশনে যোগ দিন')}</h1>
          <p className="text-green-100">{t('Be part of our mission to serve the community', 'সমাজসেবার মিশনে আমাদের অংশীদার হন')}</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="font-display text-xl font-bold text-forest dark:text-green-400 mb-6">{t('Volunteer Application', 'স্বেচ্ছাসেবী আবেদন')}</h2>
          <JoinForm />
        </div>
      </div>
    </div>
  );
}
