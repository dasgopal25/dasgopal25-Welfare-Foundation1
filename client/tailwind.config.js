/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        forest: {
          DEFAULT: '#1a4731',
          light: '#2d6a4f',
          dark: '#0f2b1c',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e5c97e',
          dark: '#9a7a2e',
        },
        navy: {
          DEFAULT: '#1e3a5f',
          light: '#2d5282',
          dark: '#102040',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        bangla: ['Hind Siliguri', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
