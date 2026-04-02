import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      DEFAULT: '#FFA4A4',   // màu chính (CTA, button)
      light: '#FFBDBD',
    },
    secondary: {
      DEFAULT: '#BADFDB',   // màu phụ (card, section)
    },
    tertiary: {
      DEFAULT: '#cfcfcf',
      light: '#e0e0e0',
      dark: '#aeaeae',
    },
  },
});

export default theme;
