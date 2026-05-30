import { useLang } from '../../context/LanguageContext';
import WorkingSection from '../../components/home/WorkingSection';

export default function OurWork() {
  const { t } = useLang();
  return (
    <div className="pt-24 min-h-screen" style={{ backgroundColor:'var(--c-bg)' }}>
      {/* Banner */}
      <div className="theme-hero-bg text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display font-bold mb-4" style={{ fontSize:'clamp(2rem,5vw,var(--font-size-4xl))' }}>
            {t('Our Work','আমাদের কাজ')}
          </h1>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'var(--font-size-lg)' }}>
            {t('Dedicated to community service and social welfare','সমাজসেবা ও মানব কল্যাণে নিবেদিত')}
          </p>
        </div>
      </div>

      {/* Activities grid */}
      <WorkingSection />

      {/* Current Projects */}
      <section className="py-16" style={{ backgroundColor:'var(--c-bg-alt)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display font-bold mb-8 text-center" style={{ color:'var(--c-primary)', fontSize:'var(--font-size-2xl)' }}>
            {t('Current Projects','বর্তমান প্রকল্প')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title:t('School Supplies Drive','স্কুল সামগ্রী অভিযান'),  desc:t('Distributing notebooks, pens and bags to 200+ students.','২০০+ শিক্ষার্থীকে খাতা, কলম ও ব্যাগ বিতরণ।'), status:t('Active','সক্রিয়'),   dot:'#16a34a' },
              { title:t('Village Cleanliness','গ্রাম পরিষ্কার অভিযান'),  desc:t('Weekly cleanliness drives in 5 villages.','৫টি গ্রামে সাপ্তাহিক পরিষ্কার অভিযান।'),            status:t('Ongoing','চলমান'),  dot:'#2563eb' },
              { title:t('Free Health Check-up','বিনামূল্যে স্বাস্থ্য পরীক্ষা'), desc:t('Monthly free medical camps for villagers.','গ্রামবাসীদের জন্য মাসিক বিনামূল্যে চিকিৎসা শিবির।'), status:t('Monthly','মাসিক'),   dot:'#7c3aed' },
              { title:t('Flood Relief Work','বন্যা ত্রাণ কার্যক্রম'),   desc:t('Emergency assistance during flood seasons.','বন্যার মৌসুমে জরুরি সহায়তা।'),                      status:t('Seasonal','মৌসুমী'), dot:'#d97706' },
            ].map(p => (
              <div key={p.title} className="rounded-2xl p-6"
                style={{ backgroundColor:'var(--c-bg)', border:'1px solid color-mix(in srgb, var(--c-primary) 10%, transparent)' }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold" style={{ color:'var(--c-primary)' }}>{p.title}</h3>
                  <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ml-2"
                    style={{ backgroundColor:`${p.dot}18`, color: p.dot }}>
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: p.dot }} />
                    {p.status}
                  </span>
                </div>
                <p className="text-sm" style={{ color:'var(--c-text-muted)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-16" style={{ backgroundColor:'var(--c-bg)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon:'🎯', label:t('Our Mission','আমাদের লক্ষ্য'), text:t('To serve and uplift the underprivileged communities of Gazipur Kismat through education, health, and welfare programs.','শিক্ষা, স্বাস্থ্য ও কল্যাণমূলক কর্মসূচির মাধ্যমে গাজীপুর কিসমতের সুবিধাবঞ্চিত সম্প্রদায়কে সেবা করা।') },
              { icon:'👁️', label:t('Our Vision','আমাদের দৃষ্টিভঙ্গি'), text:t('A society where every person lives with dignity, access to education, healthcare, and equal opportunities.','একটি সমাজ যেখানে প্রতিটি মানুষ মর্যাদার সাথে, শিক্ষা ও স্বাস্থ্যসেবার সুযোগ নিয়ে বাঁচে।') },
            ].map(item => (
              <div key={item.label} className="p-8 rounded-2xl text-center"
                style={{ backgroundColor:'var(--c-bg-alt)', border:'1px solid color-mix(in srgb, var(--c-primary) 10%, transparent)' }}>
                <span className="text-5xl block mb-4">{item.icon}</span>
                <h3 className="font-display font-bold mb-3" style={{ color:'var(--c-primary)', fontSize:'var(--font-size-xl)' }}>{item.label}</h3>
                <p className="leading-relaxed" style={{ color:'var(--c-text-muted)', fontSize:'var(--font-size-base)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}