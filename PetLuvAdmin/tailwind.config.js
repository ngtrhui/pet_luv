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
          light: '#666666',
          'supper-light': '#6595d8',
          DEFAULT: '#333333',
        },
        tertiary: {
          light: '#efefef',
          dark: '#aeaeae',
        },
      },
      fontFamily: {
        cute: ['"iciel-crocante"', 'cursive'],
      },
    },
  },
  plugins: [],
};
