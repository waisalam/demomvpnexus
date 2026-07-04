/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'priority-low': '#63b3ed',
        'priority-medium': '#f6ad55',
        'priority-high': '#fc8181',
      },
    },
  },
  plugins: [],
}