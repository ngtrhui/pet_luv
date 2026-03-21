/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFA4A4',   // màu chính (CTA, button)
          light: '#FFBDBD',
        },
        secondary: {
          DEFAULT: '#BADFDB',   // màu phụ (card, section)
        },
        background: {
          DEFAULT: '#FCF9EA',   // nền chính
        },
      },
      fontFamily: {
        cute: ['"iciel-crocante"', 'cursive'],
      },
    }
  },
  plugins: [],
};
