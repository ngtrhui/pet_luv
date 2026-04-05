import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA4A4',
      light: '#FFBDBD',
    },
    secondary: {
      main: '#BADFDB',
    },
    // ⚠️ tertiary không phải key mặc định của MUI
    // nếu muốn dùng, phải custom thêm (xem dưới)
  },
});

export default theme;