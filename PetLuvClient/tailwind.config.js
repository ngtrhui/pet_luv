/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFD6BA',   // CTA, button
          light: '#FFE8CD',     // hover
          soft: '#FFDCDC',      // badge, highlight nhẹ
        },
        secondary: {
          DEFAULT: '#FFE8CD',   // section background
        },
        background: {
          DEFAULT: '#FFF2EB',   // nền chính
        },
        text: {
          primary: '#333333',
          secondary: '#666666',
        },
        border: '#FFE8CD',
      },
      fontFamily: {
        cute: ['"iciel-crocante"', 'cursive'],
      },
    }
  },
  plugins: [],
};