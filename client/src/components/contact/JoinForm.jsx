import { useState } from 'react';
import { submitContact } from '../../api/contactApi';
import { useLang } from '../../context/LanguageContext';

export default function JoinForm() {
  const { t } = useLang();
  const [form, setForm]     = useState({ name:'', email:'', phone:'', address:'', volunteerRole:'', message:'', type:'join' });
  const [status, setStatus] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    setErrMsg('');
    try {
      await submitContact(form);
      setStatus('success');
      setForm({ name:'', email:'', phone:'', address:'', volunteerRole:'', message:'', type:'join' });
    } catch (err) {
      setStatus('error');
      // Show server error message (duplicate email/phone etc.)
      setErrMsg(
        err.response?.data?.message ||
        t('Failed to submit. Please try again.', 'জমা দিতে ব্যর্থ হয়েছে।')
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width:'100%', padding:'0.75rem 1rem', borderRadius:'0.75rem',
    border:'1px solid color-mix(in srgb, var(--c-primary) 20%, transparent)',
    backgroundColor:'var(--c-bg)', color:'var(--c-text)',
    fontSize:'var(--font-size-base)', outline:'none', transition:'border-color 0.2s',
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {status === 'success' && (
        <div className="p-4 rounded-xl text-sm"
          style={{ backgroundColor:'rgba(34,197,94,0.1)', color:'#16a34a', border:'1px solid rgba(34,197,94,0.2)' }}>
          ✅ {t('Application submitted successfully! We will contact you soon.','আবেদন সফলভাবে জমা হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।')}
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 rounded-xl text-sm"
          style={{ backgroundColor:'rgba(239,68,68,0.1)', color:'#dc2626', border:'1px solid rgba(239,68,68,0.2)' }}>
          ❌ {errMsg}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name"  value={form.name}  onChange={handle} required placeholder={t('Full Name *','পুরো নাম *')} style={inputStyle} />
        <input name="email" type="email" value={form.email} onChange={handle} required placeholder={t('Email *','ইমেইল *')} style={inputStyle} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="phone" value={form.phone} onChange={handle} required placeholder={t('Phone *','ফোন *')} style={inputStyle} />
        <select name="volunteerRole" value={form.volunteerRole} onChange={handle} style={inputStyle}>
          <option value="">{t('Select Role','ভূমিকা নির্বাচন করুন')}</option>
          <option value="volunteer">{t('Volunteer','স্বেচ্ছাসেবী')}</option>
          <option value="donor">{t('Donor','দাতা')}</option>
          <option value="educator">{t('Educator','শিক্ষক')}</option>
          <option value="health-worker">{t('Health Worker','স্বাস্থ্যকর্মী')}</option>
          <option value="other">{t('Other','অন্যান্য')}</option>
        </select>
      </div>
      <input name="address" value={form.address} onChange={handle} placeholder={t('Address','ঠিকানা')} style={inputStyle} />
      <textarea name="message" value={form.message} onChange={handle} rows={4}
        placeholder={t('Why do you want to join? (optional)','কেন যোগ দিতে চান? (ঐচ্ছিক)')} style={inputStyle} />

      <button type="submit" disabled={loading}
        className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor:'var(--c-accent)' }}>
        {loading ? t('Submitting...','জমা দেওয়া হচ্ছে...') : t('Submit Application','আবেদন জমা দিন')}
      </button>
    </form>
  );
}