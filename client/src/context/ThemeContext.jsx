import { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  'forest-green': {
    label:'Forest Green', labelBn:'ফরেস্ট গ্রিন',
    preview:['#1a4731','#c9a84c','#f0fdf4'],
    dark: false,
    vars:{
      '--c-primary':'#1a4731','--c-primary-l':'#2d6a4f','--c-primary-d':'#0f2b1c',
      '--c-accent':'#c9a84c','--c-accent-l':'#e5c97e','--c-accent-d':'#9a7a2e',
      '--c-secondary':'#1e3a5f',
      '--c-bg':'#ffffff','--c-bg-alt':'#f0fdf4',
      '--c-text':'#1a1a1a','--c-text-muted':'#6b7280',
      '--c-hero-from':'#0f2b1c','--c-hero-via':'#1a4731','--c-hero-to':'#1e3a5f',
      '--font-size-base':'1rem','--font-size-lg':'1.125rem','--font-size-xl':'1.25rem',
      '--font-size-2xl':'1.5rem','--font-size-3xl':'1.875rem','--font-size-4xl':'2.25rem',
    },
  },
  'royal-blue': {
    label:'Royal Blue', labelBn:'রয়্যাল ব্লু',
    preview:['#1a2f6e','#f59e0b','#eff6ff'],
    dark: false,
    vars:{
      '--c-primary':'#1a2f6e','--c-primary-l':'#2d4a9e','--c-primary-d':'#0f1c45',
      '--c-accent':'#f59e0b','--c-accent-l':'#fbbf24','--c-accent-d':'#d97706',
      '--c-secondary':'#0e7490',
      '--c-bg':'#ffffff','--c-bg-alt':'#eff6ff',
      '--c-text':'#0f172a','--c-text-muted':'#64748b',
      '--c-hero-from':'#0f1c45','--c-hero-via':'#1a2f6e','--c-hero-to':'#0e7490',
      '--font-size-base':'1rem','--font-size-lg':'1.125rem','--font-size-xl':'1.25rem',
      '--font-size-2xl':'1.5rem','--font-size-3xl':'1.875rem','--font-size-4xl':'2.25rem',
    },
  },
  'crimson-red': {
    label:'Crimson Red', labelBn:'ক্রিমসন রেড',
    preview:['#7f1d1d','#fbbf24','#fef2f2'],
    dark: false,
    vars:{
      '--c-primary':'#7f1d1d','--c-primary-l':'#991b1b','--c-primary-d':'#450a0a',
      '--c-accent':'#fbbf24','--c-accent-l':'#fcd34d','--c-accent-d':'#f59e0b',
      '--c-secondary':'#92400e',
      '--c-bg':'#ffffff','--c-bg-alt':'#fef2f2',
      '--c-text':'#1c0505','--c-text-muted':'#6b7280',
      '--c-hero-from':'#450a0a','--c-hero-via':'#7f1d1d','--c-hero-to':'#92400e',
      '--font-size-base':'1rem','--font-size-lg':'1.125rem','--font-size-xl':'1.25rem',
      '--font-size-2xl':'1.5rem','--font-size-3xl':'1.875rem','--font-size-4xl':'2.25rem',
    },
  },
  'deep-purple': {
    label:'Deep Purple', labelBn:'ডিপ পার্পল',
    preview:['#3b0764','#e879f9','#faf5ff'],
    dark: false,
    vars:{
      '--c-primary':'#3b0764','--c-primary-l':'#6b21a8','--c-primary-d':'#1e0338',
      '--c-accent':'#e879f9','--c-accent-l':'#f0abfc','--c-accent-d':'#c026d3',
      '--c-secondary':'#0f766e',
      '--c-bg':'#ffffff','--c-bg-alt':'#faf5ff',
      '--c-text':'#1a0a2e','--c-text-muted':'#6b7280',
      '--c-hero-from':'#1e0338','--c-hero-via':'#3b0764','--c-hero-to':'#0f766e',
      '--font-size-base':'1rem','--font-size-lg':'1.125rem','--font-size-xl':'1.25rem',
      '--font-size-2xl':'1.5rem','--font-size-3xl':'1.875rem','--font-size-4xl':'2.25rem',
    },
  },
  'ocean-teal': {
    label:'Ocean Teal', labelBn:'ওশান টিল',
    preview:['#0f4c5c','#f97316','#f0fdfa'],
    dark: false,
    vars:{
      '--c-primary':'#0f4c5c','--c-primary-l':'#0e7490','--c-primary-d':'#082f3b',
      '--c-accent':'#f97316','--c-accent-l':'#fb923c','--c-accent-d':'#ea580c',
      '--c-secondary':'#065f46',
      '--c-bg':'#ffffff','--c-bg-alt':'#f0fdfa',
      '--c-text':'#042025','--c-text-muted':'#64748b',
      '--c-hero-from':'#042025','--c-hero-via':'#0f4c5c','--c-hero-to':'#065f46',
      '--font-size-base':'1rem','--font-size-lg':'1.125rem','--font-size-xl':'1.25rem',
      '--font-size-2xl':'1.5rem','--font-size-3xl':'1.875rem','--font-size-4xl':'2.25rem',
    },
  },
  'saffron-gold': {
    label:'Saffron Gold', labelBn:'জাফরান গোল্ড',
    preview:['#78350f','#f59e0b','#fffbeb'],
    dark: false,
    vars:{
      '--c-primary':'#78350f','--c-primary-l':'#92400e','--c-primary-d':'#431407',
      '--c-accent':'#f59e0b','--c-accent-l':'#fbbf24','--c-accent-d':'#d97706',
      '--c-secondary':'#065f46',
      '--c-bg':'#fffbeb','--c-bg-alt':'#fef3c7',
      '--c-text':'#1c0a00','--c-text-muted':'#78716c',
      '--c-hero-from':'#431407','--c-hero-via':'#78350f','--c-hero-to':'#065f46',
      '--font-size-base':'1rem','--font-size-lg':'1.125rem','--font-size-xl':'1.25rem',
      '--font-size-2xl':'1.5rem','--font-size-3xl':'1.875rem','--font-size-4xl':'2.25rem',
    },
  },
  'night-dark': {
    label:'Night Dark', labelBn:'নাইট ডার্ক',
    preview:['#0f172a','#22d3ee','#1e293b'],
    dark: true,
    vars:{
      '--c-primary':'#22d3ee','--c-primary-l':'#67e8f9','--c-primary-d':'#0891b2',
      '--c-accent':'#f59e0b','--c-accent-l':'#fbbf24','--c-accent-d':'#d97706',
      '--c-secondary':'#8b5cf6',
      '--c-bg':'#0f172a','--c-bg-alt':'#1e293b',
      '--c-text':'#f1f5f9','--c-text-muted':'#94a3b8',
      '--c-hero-from':'#020617','--c-hero-via':'#0f172a','--c-hero-to':'#1e293b',
      '--font-size-base':'1rem','--font-size-lg':'1.125rem','--font-size-xl':'1.25rem',
      '--font-size-2xl':'1.5rem','--font-size-3xl':'1.875rem','--font-size-4xl':'2.25rem',
    },
  },
};

const applyTheme = (key) => {
  const t = THEMES[key] || THEMES['forest-green'];
  const root = document.documentElement;
  Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  // body background must also update for full coverage
  document.body.style.backgroundColor = t.vars['--c-bg'];
  document.body.style.color           = t.vars['--c-text'];
};

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme]       = useState('forest-green');
  const [darkMode, setDarkMode] = useState(false);

  // Apply saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('activeTheme') || 'forest-green';
    setTheme(saved);
    applyTheme(saved);
    if (THEMES[saved]?.dark) setDarkMode(true);
  }, []);

  const changeTheme = (key) => {
    if (!THEMES[key]) return;
    setTheme(key);
    localStorage.setItem('activeTheme', key);
    applyTheme(key);
    setDarkMode(THEMES[key].dark);
  };

  // Manual dark/light toggle (non-night themes)
  const toggleDarkMode = () => {
    if (theme === 'night-dark') return; // night theme is always dark
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      // Dark overlay: darken bg and alt
      document.documentElement.style.setProperty('--c-bg',     '#0f172a');
      document.documentElement.style.setProperty('--c-bg-alt', '#1e293b');
      document.documentElement.style.setProperty('--c-text',   '#f1f5f9');
      document.documentElement.style.setProperty('--c-text-muted', '#94a3b8');
      document.body.style.backgroundColor = '#0f172a';
      document.body.style.color           = '#f1f5f9';
    } else {
      // Restore theme defaults
      applyTheme(theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, darkMode, toggleDarkMode, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;