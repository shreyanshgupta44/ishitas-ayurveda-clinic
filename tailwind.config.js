/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ayurveda': {
          50: '#f0f9f4',
          100: '#dcf2e5',
          200: '#bbe5cc',
          300: '#8dd1a8',
          400: '#5ab37d',
          500: '#369759',
          600: '#267a45',
          700: '#1f6138',
          800: '#1c4e2f',
          900: '#184028',
        },
        'earth': {
          50: '#fefdf8',
          100: '#fefbf0',
          200: '#fcf6de',
          300: '#f9edbd',
          400: '#f5e092',
          500: '#f0d066',
          600: '#e8bf45',
          700: '#d4a53a',
          800: '#b08334',
          900: '#8f6b31',
        },
        'sage': {
          50: '#f7f8f6',
          100: '#eef0ec',
          200: '#dde2d8',
          300: '#c4cdbf',
          400: '#a8b4a0',
          500: '#8c9a82',
          600: '#737f6a',
          700: '#5d6656',
          800: '#4d5447',
          900: '#41463c',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'gentle': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'soft': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
} 