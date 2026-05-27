import { useLang } from '../../context/LanguageContext';
export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLang();
  return (
    <button onClick={toggleLang} className="px-3 py-1 rounded-full text-xs font-bold border border-forest text-forest dark:border-green-400 dark:text-green-400 hover:bg-forest hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 transition-colors">
      {lang === 'en' ? 'বাংলা' : 'English'}
    </button>
  );
}
