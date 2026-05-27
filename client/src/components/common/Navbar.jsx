import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white dark:bg-gray-900 shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center">
            <span className="text-white font-display font-bold text-lg">G</span>
          </div>
          <div className="hidden sm:block">
            <p className={`font-display font-bold text-sm leading-tight ${scrolled ? 'text-forest dark:text-green-400' : 'text-white'}`}>
              {t('Gazipur Kismat', 'গাজীপুর কিসমত')}
            </p>
            <p className={`text-xs ${scrolled ? 'text-gray-500 dark:text-gray-400' : 'text-green-100'}`}>
              {t('Welfare Foundation', 'ওয়েলফেয়ার ফাউন্ডেশন')}
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-gold ${
                  isActive ? 'text-gold' : scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'
                }`
              }
            >
              {t(link.label, link.labelBn)}
            </NavLink>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button onClick={toggleLang} className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
            scrolled ? 'border-forest text-forest dark:border-green-400 dark:text-green-400 hover:bg-forest hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900' 
                     : 'border-white text-white hover:bg-white hover:text-forest'
          }`}>
            {lang === 'en' ? 'বাং' : 'EN'}
          </button>
          <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${
            scrolled ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
          }`}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <Link to="/join" className="hidden md:block px-4 py-2 bg-gold text-white rounded-full text-xs font-bold hover:bg-gold-dark transition-colors">
            {t('Join Us', 'যোগ দিন')}
          </Link>
          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-2 ${scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'}`}>
            <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 px-4 py-3 space-y-2">
          {NAV_LINKS.map(link => (
            <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `block py-2 text-sm font-medium ${isActive ? 'text-forest dark:text-green-400' : 'text-gray-700 dark:text-gray-200'}`}>
              {t(link.label, link.labelBn)}
            </NavLink>
          ))}
          <Link to="/join" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-bold text-gold">
            {t('Join Us', 'যোগ দিন')}
          </Link>
        </div>
      )}
    </nav>
  );
}
