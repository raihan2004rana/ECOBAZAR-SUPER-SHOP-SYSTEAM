const basePreset = require('@ecobazar/config/tailwind/preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  presets: [basePreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
