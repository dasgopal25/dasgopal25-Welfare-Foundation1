import { useState } from 'react';
import { submitContact } from '../../api/contactApi';
import { useLang } from '../../context/LanguageContext';

export default function ContactForm() {
  const { t } = useLang();
  const [form, setForm]   = useState({ name:'', email:'', phone:'', subject:'', message:'', type:'contact' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const submit = async e => {
    e.preventDefault(); setLoading(true);
    try { await submitContact(form); setStatus('success'); setForm({ name:'', email:'', phone:'', subject:'', message:'', type:'contact' }); }
    catch { setStatus('error'); }
    finally { setLoading(false); }
  };

  const inputStyle = { width:'100%', padding:'0.75rem 1rem', borderRadius:'0.75rem', border:'1px solid color-mix(in srgb, var(--c-primary) 20%, transparent)', backgroundColor:'var(--c-bg)', color:'var(--c-text)', fontSize:'var(--font-size-base)', outline:'none', transition:'border-color 0.2s' };

  return (
    <form onSubmit={submit} className="space-y-4">
      {status === 'success' && <div className="p-4 rounded-xl text-sm" style={{ backgroundColor:'rgba(34,197,94,0.1)', color:'#16a34a', border:'1px solid rgba(34,197,94,0.2)' }}>{t('✅ Message sent successfully!','✅ বার্তা সফলভাবে পাঠানো হয়েছে!')}</div>}
      {status === 'error'   && <div className="p-4 rounded-xl text-sm" style={{ backgroundColor:'rgba(239,68,68,0.1)', color:'#dc2626', border:'1px solid rgba(239,68,68,0.2)' }}>{t('❌ Failed to send. Try again.','❌ পাঠাতে ব্যর্থ।')}</div>}
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name"  value={form.name}  onChange={handle} required placeholder={t('Your Name *','আপনার নাম *')} style={inputStyle} />
        <input name="email" type="email" value={form.email} onChange={handle} required placeholder={t('Email *','ইমেইল *')} style={inputStyle} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="phone"   value={form.phone}   onChange={handle} placeholder={t('Phone','ফোন')}    style={inputStyle} />
        <input name="subject" value={form.subject} onChange={handle} placeholder={t('Subject','বিষয়')} style={inputStyle} />
      </div>
      <textarea name="message" value={form.message} onChange={handle} required rows={5} placeholder={t('Your Message *','আপনার বার্তা *')} style={inputStyle} />
      <button type="submit" disabled={loading}
        className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor:'var(--c-primary)' }}>
        {loading ? t('Sending...','পাঠানো হচ্ছে...') : t('Send Message','বার্তা পাঠান')}
      </button>
    </form>
  );
}