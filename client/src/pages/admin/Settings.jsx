import { useState, useEffect } from 'react';
import { adminGetSettings } from '../../api/settingsApi';
import SettingsForm from '../../components/admin/SettingsForm';
import Loader from '../../components/common/Loader';

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading]   = useState(true);

  const fetchSettings = () => {
    adminGetSettings().then(r => setSettings(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { fetchSettings(); }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold" style={{ color:'var(--c-primary)' }}>Website Settings</h1>
        <p className="text-sm mt-1" style={{ color:'var(--c-text-muted)' }}>Manage website content and configuration</p>
      </div>
      <div className="max-w-2xl">
        <div className="rounded-2xl p-6" style={{ backgroundColor:'var(--c-bg)', border:'1px solid color-mix(in srgb, var(--c-primary) 12%, transparent)' }}>
          {loading ? <Loader /> : <SettingsForm settings={settings} onSaved={fetchSettings} />}
        </div>
      </div>
    </div>
  );
}