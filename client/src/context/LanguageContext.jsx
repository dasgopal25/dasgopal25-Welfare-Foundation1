import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'bn' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (en, bn) => lang === 'bn' && bn ? bn : en;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isBn: lang === 'bn' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
export default LanguageContext;
