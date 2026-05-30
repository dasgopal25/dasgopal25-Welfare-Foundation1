import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const { darkMode, toggleDarkMode, theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isNightTheme = theme === 'night-dark';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg py-2' : 'py-4'}`}
      style={{ backgroundColor: scrolled ? 'var(--c-bg)' : 'transparent', borderBottom: scrolled ? '1px solid color-mix(in srgb, var(--c-primary) 15%, transparent)' : 'none' }}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow"
            style={{ backgroundColor:'var(--c-primary)' }}>
            <span className="font-display font-bold text-lg" style={{ color:'var(--c-accent)' }}>G</span>
          </div>
          <div className="hidden sm:block">
            <p className={`font-display font-bold text-sm leading-tight ${!scrolled ? 'text-white' : ''}`}
              style={scrolled ? { color:'var(--c-primary)' } : {}}>
              {t('Gazipur Kismat','গাজীপুর কিসমত')}
            </p>
            <p className={`text-xs ${!scrolled ? 'text-white/60' : ''}`}
              style={scrolled ? { color:'var(--c-text-muted)' } : {}}>
              {t('Welfare Foundation','ওয়েলফেয়ার ফাউন্ডেশন')}
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <NavLink key={link.to} to={link.to}
              className={`text-sm font-medium transition-opacity hover:opacity-70 ${!scrolled ? 'text-white' : ''}`}
              style={({ isActive }) => ({
                color: isActive ? 'var(--c-accent)' : scrolled ? 'var(--c-text)' : undefined,
                fontWeight: isActive ? '600' : '400',
              })}>
              {t(link.label, link.labelBn)}
            </NavLink>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language */}
          <button onClick={toggleLang}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${!scrolled ? 'border-white text-white hover:bg-white/10' : ''}`}
            style={scrolled ? { borderColor:'var(--c-primary)', color:'var(--c-primary)' } : {}}>
            {lang === 'en' ? 'বাং' : 'EN'}
          </button>

          {/* Dark/Light toggle — hidden for night-dark theme (always dark) */}
          {!isNightTheme && (
            <button onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors text-lg ${!scrolled ? 'text-white hover:bg-white/10' : ''}`}
              style={scrolled ? { color:'var(--c-text)' } : {}}
              title={darkMode ? 'Switch to Light' : 'Switch to Dark'}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          )}

          {/* Join button */}
          <Link to="/join"
            className="hidden md:block px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor:'var(--c-accent)' }}>
            {t('Join Us','যোগ দিন')}
          </Link>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 ${!scrolled ? 'text-white' : ''}`}
            style={scrolled ? { color:'var(--c-text)' } : {}}>
            <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-3 space-y-1"
          style={{ backgroundColor:'var(--c-bg)', borderColor:'color-mix(in srgb, var(--c-primary) 15%, transparent)' }}>
          {NAV_LINKS.map(link => (
            <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium"
              style={({ isActive }) => ({ color: isActive ? 'var(--c-accent)' : 'var(--c-text)' })}>
              {t(link.label, link.labelBn)}
            </NavLink>
          ))}
          <Link to="/join" onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm font-bold" style={{ color:'var(--c-accent)' }}>
            {t('Join Us','যোগ দিন')}
          </Link>
          {!isNightTheme && (
            <button onClick={toggleDarkMode} className="block py-2 text-sm" style={{ color:'var(--c-text)' }}>
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          )}
        </div>
      )}
    </nav>
  );
}