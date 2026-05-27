import { useState } from 'react';
import { submitContact } from '../../api/contactApi';
import { useLang } from '../../context/LanguageContext';

export default function JoinForm() {
  const { t } = useLang();
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', volunteerRole:'', message:'', type:'join' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      setStatus('success');
      setForm({ name:'', email:'', phone:'', address:'', volunteerRole:'', message:'', type:'join' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition text-sm";

  return (
    <form onSubmit={submit} className="space-y-4">
      {status === 'success' && <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-xl text-green-700 dark:text-green-300 text-sm">{t('✅ Application submitted!','✅ আবেদন জমা হয়েছে!')}</div>}
      {status === 'error' && <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl text-red-700 dark:text-red-300 text-sm">{t('❌ Failed. Please try again.','❌ ব্যর্থ হয়েছে।')}</div>}
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handle} required placeholder={t('Full Name *','পুরো নাম *')} className={inputClass} />
        <input name="email" type="email" value={form.email} onChange={handle} required placeholder={t('Email *','ইমেইল *')} className={inputClass} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="phone" value={form.phone} onChange={handle} required placeholder={t('Phone *','ফোন *')} className={inputClass} />
        <select name="volunteerRole" value={form.volunteerRole} onChange={handle} className={inputClass}>
          <option value="">{t('Select Role','ভূমিকা নির্বাচন করুন')}</option>
          <option value="volunteer">{t('Volunteer','স্বেচ্ছাসেবী')}</option>
          <option value="donor">{t('Donor','দাতা')}</option>
          <option value="educator">{t('Educator','শিক্ষক')}</option>
          <option value="health-worker">{t('Health Worker','স্বাস্থ্যকর্মী')}</option>
          <option value="other">{t('Other','অন্যান্য')}</option>
        </select>
      </div>
      <input name="address" value={form.address} onChange={handle} placeholder={t('Address','ঠিকানা')} className={inputClass} />
      <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder={t('Why do you want to join? (optional)','কেন যোগ দিতে চান? (ঐচ্ছিক)')} className={inputClass} />
      <button type="submit" disabled={loading} className="w-full py-3.5 bg-gold hover:bg-gold-dark text-white font-semibold rounded-xl transition-colors disabled:opacity-60">
        {loading ? t('Submitting...','জমা দেওয়া হচ্ছে...') : t('Submit Application','আবেদন জমা দিন')}
      </button>
    </form>
  );
}
