import { useLang } from '../../context/LanguageContext';

const activities = [
  { icon:'🎓', en:'Education Support',   bn:'শিক্ষা সহায়তা',   dEn:'Providing books, stationery, and scholarships to underprivileged students.', dBn:'সুবিধাবঞ্চিত শিক্ষার্থীদের বই, স্টেশনারি ও বৃত্তি প্রদান।' },
  { icon:'🏥', en:'Health Programs',     bn:'স্বাস্থ্য কর্মসূচি', dEn:'Free medical camps and health awareness drives in rural areas.', dBn:'গ্রামীণ এলাকায় বিনামূল্যে চিকিৎসা শিবির।' },
  { icon:'🏘️', en:'Village Development', bn:'গ্রাম উন্নয়ন',     dEn:'Infrastructure improvement and sanitation drives in villages.', dBn:'গ্রামে অবকাঠামো উন্নয়ন ও স্যানিটেশন প্রচারণা।' },
  { icon:'🤝', en:'Social Welfare',      bn:'সামাজিক কল্যাণ',   dEn:'Support for the elderly, women, and differently-abled members.', dBn:'বয়স্ক, মহিলা ও প্রতিবন্ধীদের সহায়তা।' },
  { icon:'🌾', en:'Farmer Support',      bn:'কৃষক সহায়তা',     dEn:'Agricultural assistance and training for local farmers.', dBn:'স্থানীয় কৃষকদের কৃষি সহায়তা ও প্রশিক্ষণ।' },
  { icon:'🆘', en:'Relief Activities',   bn:'ত্রাণ কার্যক্রম',  dEn:'Emergency relief distribution during natural disasters.', dBn:'প্রাকৃতিক দুর্যোগে জরুরি ত্রাণ বিতরণ।' },
];

export default function WorkingSection() {
  const { t } = useLang();
  return (
    <section className="py-20" style={{ backgroundColor:'var(--c-bg)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color:'var(--c-accent)' }}>
            {t('What We Do','আমরা কি করি')}
          </span>
          <h2 className="font-display font-bold mt-2" style={{ color:'var(--c-primary)', fontSize:'var(--font-size-3xl)' }}>
            {t('Our Activities','আমাদের কার্যক্রম')}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map(a => (
            <div key={a.en}
              className="group p-6 rounded-2xl transition-all duration-300 cursor-default"
              style={{ backgroundColor:'var(--c-bg-alt)', border:'1px solid color-mix(in srgb, var(--c-primary) 8%, transparent)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--c-primary) 30%, transparent)';
                e.currentTarget.style.boxShadow = '0 8px 30px color-mix(in srgb, var(--c-primary) 12%, transparent)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--c-primary) 8%, transparent)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
              <span className="text-4xl block mb-4 transition-transform duration-300 group-hover:scale-110">{a.icon}</span>
              <h3 className="font-display font-semibold text-lg mb-2" style={{ color:'var(--c-primary)' }}>
                {t(a.en, a.bn)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color:'var(--c-text-muted)' }}>
                {t(a.dEn, a.dBn)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}