import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import { getPublicSettings } from '../api/settingsApi';

export default function MainLayout() {
  const { changeTheme } = useTheme();

  // Load theme saved by admin from DB on every page
  useEffect(() => {
    getPublicSettings()
      .then(r => {
        const s = r.data.data;
        if (s.active_theme) changeTheme(s.active_theme);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor:'var(--c-bg)', color:'var(--c-text)' }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* WhatsApp float button */}
      <a href="https://whatsapp.com/channel/0029VbCeAlq8F2pGSpzrta3G" target="_blank" rel="noreferrer" className="whatsapp-btn" aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.508.654 4.858 1.797 6.9L2 30l7.4-1.77C11.28 29.38 13.576 30 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5c-2.18 0-4.22-.584-5.977-1.603l-.427-.252-4.395 1.05 1.083-4.293-.277-.447A11.447 11.447 0 014.5 16c0-6.34 5.16-11.5 11.5-11.5S27.5 9.66 27.5 16 22.34 27.5 16 27.5zm6.3-8.65c-.346-.173-2.048-1.01-2.366-1.125-.317-.116-.548-.173-.778.173-.23.346-.893 1.125-1.095 1.355-.202.23-.403.26-.75.087-.346-.173-1.462-.538-2.786-1.717-1.03-.918-1.725-2.052-1.927-2.398-.202-.346-.022-.533.152-.705.156-.155.346-.404.52-.606.173-.202.23-.346.346-.577.116-.23.058-.433-.029-.606-.087-.173-.778-1.875-1.066-2.567-.28-.673-.565-.582-.778-.593l-.663-.012c-.23 0-.606.087-.923.433-.317.346-1.21 1.183-1.21 2.885 0 1.702 1.239 3.346 1.412 3.576.173.23 2.44 3.726 5.913 5.224.827.357 1.47.57 1.973.73.829.264 1.583.227 2.18.138.665-.1 2.048-.837 2.337-1.645.288-.808.288-1.5.202-1.645-.087-.144-.317-.23-.663-.404z"/>
        </svg>
      </a>
    </div>
  );
}



// https://whatsapp.com/channel/0029VbCeAlq8F2pGSpzrta3G