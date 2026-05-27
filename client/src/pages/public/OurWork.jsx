import { useLang } from '../../context/LanguageContext';
import WorkingSection from '../../components/home/WorkingSection';

export default function OurWork() {
  const { t } = useLang();
  return (
    <div className="pt-24">
      <div className="bg-gradient-to-br from-forest to-navy text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{t('Our Work','আমাদের কাজ')}</h1>
          <p className="text-green-100 text-lg">{t('Dedicated to community service and social welfare','সমাজসেবা ও মানব কল্যাণে নিবেদিত')}</p>
        </div>
      </div>
      <WorkingSection />
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-forest dark:text-green-400 mb-8 text-center">{t('Current Projects','বর্তমান প্রকল্প')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: t('School Supplies Drive','স্কুল সামগ্রী অভিযান'), desc: t('Distributing notebooks, pens and bags to 200+ students.','২০০+ শিক্ষার্থীকে খাতা, কলম ও ব্যাগ বিতরণ।'), status: t('Active','সক্রিয়'), color: 'green' },
              { title: t('Village Cleanliness Campaign','গ্রাম পরিষ্কার অভিযান'), desc: t('Weekly cleanliness drives in 5 villages.','৫টি গ্রামে সাপ্তাহিক পরিষ্কার অভিযান।'), status: t('Ongoing','চলমান'), color: 'blue' },
              { title: t('Free Health Check-up','বিনামূল্যে স্বাস্থ্য পরীক্ষা'), desc: t('Monthly free medical camps for villagers.','গ্রামবাসীদের জন্য মাসিক বিনামূল্যে চিকিৎসা শিবির।'), status: t('Monthly','মাসিক'), color: 'purple' },
              { title: t('Flood Relief Work','বন্যা ত্রাণ কার্যক্রম'), desc: t('Emergency assistance during flood seasons.','বন্যার মৌসুমে জরুরি সহায়তা।'), status: t('Seasonal','মৌসুমী'), color: 'orange' },
            ].map(p => (
              <div key={p.title} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold text-forest dark:text-green-400">{p.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full bg-${p.color}-100 text-${p.color}-700 dark:bg-${p.color}-900/30 dark:text-${p.color}-400`}>{p.status}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
