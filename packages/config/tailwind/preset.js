/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Direct brand & semantic tokens
        'forest-green': '#123C2D',
        'primary-green': '#21A366',
        'mint': '#D8F3DC',
        'off-white': '#F7F9F5',
        'accent-orange': '#F4A340',

        // Brand Forest Palette
        forest: {
          50: '#F0F7F4',
          100: '#DCEFE6',
          200: '#B8DFCD',
          300: '#8AC8AC',
          400: '#5BAE89',
          500: '#3A946D',
          600: '#2A7655',
          700: '#1F5B41',
          800: '#174733',
          900: '#123C2D',
          950: '#0A241B',
        },

        // Brand Mint Palette
        mint: {
          50: '#F4FBF6',
          100: '#EAF8EE',
          200: '#D8F3DC',
          300: '#B7E8C1',
          400: '#8CD59C',
          500: '#5FBC73',
          600: '#439D55',
          700: '#347C44',
          800: '#2C6339',
          900: '#255231',
        },

        // Semantic Success Palette
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#21A366',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },

        // Semantic Warning Palette
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },

        // Semantic Error Palette
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },

        // Semantic Info Palette
        info: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },

        // Legacy / Namespaced tokens for backward compatibility
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
