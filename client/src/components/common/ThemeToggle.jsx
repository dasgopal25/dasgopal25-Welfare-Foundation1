import { useTheme } from '../../context/ThemeContext';
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
