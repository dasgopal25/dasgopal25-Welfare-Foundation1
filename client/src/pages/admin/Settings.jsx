import { useState, useEffect } from 'react';
import { adminGetSettings } from '../../api/settingsApi';
import SettingsForm from '../../components/admin/SettingsForm';
import Loader from '../../components/common/Loader';

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = () => {
    adminGetSettings().then(r => setSettings(r.data.data)).catch(()=>{}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchSettings(); }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-forest dark:text-green-400">Website Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage website content and configuration</p>
      </div>
      <div className="max-w-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
          {loading ? <Loader /> : <SettingsForm settings={settings} onSaved={fetchSettings} />}
        </div>
      </div>
    </div>
  );
}
