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

  const inputStyle = {
    width: '100%',
    padding: '0.625rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid color-mix(in srgb, var(--c-primary) 20%, transparent)',
    backgroundColor: 'var(--c-bg-alt)',
    color: 'var(--c-text)',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const fields = [
    { key: 'site_title',       label: 'Site Title (EN)',        type: 'text' },
    { key: 'site_title_bn',    label: 'Site Title (বাংলা)',     type: 'text' },
    { key: 'hero_title',       label: 'Hero Title (EN)',        type: 'text' },
    { key: 'hero_title_bn',    label: 'Hero Title (বাংলা)',     type: 'text' },
    { key: 'hero_subtitle',    label: 'Hero Subtitle (EN)',     type: 'textarea' },
    { key: 'hero_subtitle_bn', label: 'Hero Subtitle (বাংলা)', type: 'textarea' },
    { key: 'address',          label: 'Address',                type: 'text' },
    { key: 'email',            label: 'Email',                  type: 'email' },
    { key: 'phone',            label: 'Phone',                  type: 'text' },
    { key: 'facebook_url',     label: 'Facebook URL',           type: 'text' },
    { key: 'whatsapp_number',  label: 'WhatsApp Number',        type: 'text' },
  ];

  return (
    <form onSubmit={submit} className="space-y-5">
      {saved && (
        <div className="p-3 rounded-xl text-sm" style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.2)' }}>
          ✅ Settings saved!
        </div>
      )}
      {fields.map(f => (
        <div key={f.key}>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--c-text-muted)' }}>{f.label}</label>
          {f.type === 'textarea' ? (
            <textarea name={f.key} value={form[f.key] || ''} onChange={handle} rows={3}
              style={inputStyle} />
          ) : (
            <input type={f.type} name={f.key} value={form[f.key] || ''} onChange={handle}
              style={inputStyle} />
          )}
        </div>
      ))}
      <button type="submit" disabled={loading}
        className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: 'var(--c-primary)' }}>
        {loading ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  );
}