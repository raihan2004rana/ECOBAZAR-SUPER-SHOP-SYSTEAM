/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ecobazar: {
          'forest-green': '#123C2D',
          'primary-green': '#21A366',
          'mint': '#D8F3DC',
          'off-white': '#F7F9F5',
          'accent-orange': '#F4A340',
          'success': '#21A366',
          'warning': '#F59E0B',
          'error': '#EF4444',
          'info': '#3B82F6',
          'disabled': '#94A3B8',
          'neutral': '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        bangla: ['Hind Siliguri', 'sans-serif'],
      },
      borderRadius: {
        'ecobazar': '0.75rem',
      },
    },
  },
  plugins: [],
};
