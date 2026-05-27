import { useState } from 'react';
import { submitContact } from '../../api/contactApi';
import { useLang } from '../../context/LanguageContext';

export default function ContactForm() {
  const { t } = useLang();
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'', type:'contact' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      setStatus('success');
      setForm({ name:'', email:'', phone:'', subject:'', message:'', type:'contact' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest/30 dark:focus:ring-green-500/30 focus:border-forest dark:focus:border-green-500 transition text-sm";

  return (
    <form onSubmit={submit} className="space-y-4">
      {status === 'success' && <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300 text-sm">{t('✅ Message sent successfully!','✅ বার্তা সফলভাবে পাঠানো হয়েছে!')}</div>}
      {status === 'error' && <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">{t('❌ Failed to send. Please try again.','❌ পাঠাতে ব্যর্থ হয়েছে।')}</div>}
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handle} required placeholder={t('Your Name *','আপনার নাম *')} className={inputClass} />
        <input name="email" type="email" value={form.email} onChange={handle} required placeholder={t('Email *','ইমেইল *')} className={inputClass} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="phone" value={form.phone} onChange={handle} placeholder={t('Phone','ফোন')} className={inputClass} />
        <input name="subject" value={form.subject} onChange={handle} placeholder={t('Subject','বিষয়')} className={inputClass} />
      </div>
      <textarea name="message" value={form.message} onChange={handle} required rows={5} placeholder={t('Your Message *','আপনার বার্তা *')} className={inputClass} />
      <button type="submit" disabled={loading} className="w-full py-3.5 bg-forest hover:bg-forest-light text-white font-semibold rounded-xl transition-colors disabled:opacity-60">
        {loading ? t('Sending...','পাঠানো হচ্ছে...') : t('Send Message','বার্তা পাঠান')}
      </button>
    </form>
  );
}
