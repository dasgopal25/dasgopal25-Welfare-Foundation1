import { useState } from 'react';
import { adminUpdateSettings } from '../../api/settingsApi';

export default function SettingsForm({ settings, onSaved }) {
  const [form, setForm] = useState(settings || {});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = Object.entries(form).map(([key, value]) => ({ key, value }));
      await adminUpdateSettings({ settings: payload });
      setSaved(true);
      if (onSaved) onSaved();
      setTimeout(() => setSaved(false), 3000);
    } catch { alert('Failed to save'); }
    finally { setLoading(false); }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition";

  return (
    <form onSubmit={submit} className="space-y-6">
      {saved && <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl text-sm">✅ Settings saved!</div>}
      {[
        { key:'site_title', label:'Site Title (EN)', type:'text' },
        { key:'site_title_bn', label:'Site Title (Bangla)', type:'text' },
        { key:'hero_title', label:'Hero Title (EN)', type:'text' },
        { key:'hero_title_bn', label:'Hero Title (Bangla)', type:'text' },
        { key:'hero_subtitle', label:'Hero Subtitle (EN)', type:'textarea' },
        { key:'hero_subtitle_bn', label:'Hero Subtitle (Bangla)', type:'textarea' },
        { key:'address', label:'Address', type:'text' },
        { key:'email', label:'Email', type:'email' },
        { key:'phone', label:'Phone', type:'text' },
        { key:'facebook_url', label:'Facebook URL', type:'text' },
        { key:'whatsapp_number', label:'WhatsApp Number (with country code, no +)', type:'text' },
      ].map(f => (
        <div key={f.key}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
          {f.type === 'textarea'
            ? <textarea name={f.key} value={form[f.key] || ''} onChange={handle} rows={3} className={inputClass} />
            : <input type={f.type} name={f.key} value={form[f.key] || ''} onChange={handle} className={inputClass} />
          }
        </div>
      ))}
      <button type="submit" disabled={loading} className="px-6 py-3 bg-forest hover:bg-forest-light text-white font-semibold rounded-xl transition-colors disabled:opacity-60">
        {loading ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
}
