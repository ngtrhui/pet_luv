import { ThemeProvider } from '@mui/material/styles';
import Router from './components/common/Router';
import theme from './configs/theme';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { vi } from 'date-fns/locale';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
        <Router />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
