/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brandYellow: '#facc15',
        brandBrown: '#78350f',
      },
      fontFamily: {
        logo: ['"Pacifico"', 'cursive'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        hero: "url('/images/hero-pizza.jpg')",
      },
    },
  },
  plugins: [],
};
