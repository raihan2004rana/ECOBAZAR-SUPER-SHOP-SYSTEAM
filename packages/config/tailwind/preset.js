/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        ecobazar: {
          'forest-green': '#123C2D',
          'primary-green': '#21A366',
          'mint': '#D8F3DC',
          'off-white': '#F7F9F5',
          'accent-orange': '#F4A340',
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
