/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  screens: {
    ss: '480px',
    sm: '620px',
    sl: '768px',
    md: '1060px',
    lg: '1200px',
  },
};