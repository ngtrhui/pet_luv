/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFD6BA',   // button chính
          hover: '#FFDCDC',
          soft: '#FFE8CD',
        },
        secondary: {
          DEFAULT: '#333333',   // sidebar / header (dark cho dễ nhìn)
          light: '#666666',
        },
        background: {
          DEFAULT: '#FFF2EB',
          panel: '#FFFFFF',     // card admin
        },
        border: '#FFE8CD',
        text: {
          primary: '#333333',
          secondary: '#666666',
          inverse: '#FFFFFF',
        },
        status: {
          success: '#A7E3C3',
          warning: '#FFE8CD',
          danger: '#FFB3B3',
        }
      },
      fontFamily: {
        cute: ['"iciel-crocante"', 'cursive'],
      },
    },
  },
  plugins: [],
};