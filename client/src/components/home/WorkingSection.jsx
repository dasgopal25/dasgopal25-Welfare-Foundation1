import { useLang } from '../../context/LanguageContext';

const activities = [
  { icon: '🎓', titleEn: 'Education Support', titleBn: 'শিক্ষা সহায়তা', descEn: 'Providing books, stationery, and scholarships to underprivileged students.', descBn: 'সুবিধাবঞ্চিত শিক্ষার্থীদের বই, স্টেশনারি ও বৃত্তি প্রদান।' },
  { icon: '🏥', titleEn: 'Health Programs', titleBn: 'স্বাস্থ্য কর্মসূচি', descEn: 'Free medical camps and health awareness drives in rural areas.', descBn: 'গ্রামীণ এলাকায় বিনামূল্যে চিকিৎসা শিবির ও স্বাস্থ্য সচেতনতা।' },
  { icon: '🏘️', titleEn: 'Village Development', titleBn: 'গ্রাম উন্নয়ন', descEn: 'Infrastructure improvement and sanitation drives in villages.', descBn: 'গ্রামে অবকাঠামো উন্নয়ন ও স্যানিটেশন প্রচারণা।' },
  { icon: '🤝', titleEn: 'Social Welfare', titleBn: 'সামাজিক কল্যাণ', descEn: 'Support for the elderly, women, and differently-abled community members.', descBn: 'বয়স্ক, মহিলা ও প্রতিবন্ধীদের সহায়তা।' },
  { icon: '🌾', titleEn: 'Farmer Support', titleBn: 'কৃষক সহায়তা', descEn: 'Agricultural assistance and training programs for local farmers.', descBn: 'স্থানীয় কৃষকদের কৃষি সহায়তা ও প্রশিক্ষণ।' },
  { icon: '🆘', titleEn: 'Relief Activities', titleBn: 'ত্রাণ কার্যক্রম', descEn: 'Emergency relief distribution during natural disasters and crises.', descBn: 'প্রাকৃতিক দুর্যোগে জরুরি ত্রাণ বিতরণ।' },
];

export default function WorkingSection() {
  const { t } = useLang();
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">{t('What We Do','আমরা কি করি')}</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-forest dark:text-green-400 mt-2">
            {t('Our Activities','আমাদের কার্যক্রম')}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((a) => (
            <div key={a.titleEn} className="group p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-forest/30 dark:hover:border-green-700 hover:shadow-lg transition-all duration-300">
              <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform">{a.icon}</span>
              <h3 className="font-display font-semibold text-forest dark:text-green-400 text-lg mb-2">{t(a.titleEn,a.titleBn)}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{t(a.descEn,a.descBn)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
