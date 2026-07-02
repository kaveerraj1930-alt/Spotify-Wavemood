/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        spotify: {
          black: '#121212',
          dark: '#181818',
          card: '#282828',
          hover: '#3E3E3E',
          green: '#1DB954',
          'green-dk': '#1AA34A',
          white: '#FFFFFF',
          gray: '#B3B3B3',
          light: '#A7A7A7',
        },
      },
      fontFamily: {
        spotify: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        pill: '500px',
      },
    },
  },
  plugins: [],
};
