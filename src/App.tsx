import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { PagesProvider } from './src/pages';
import { ContextProvider } from './src/contexts';

const theme = createTheme();

export const App = () => (
  <ContextProvider>
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" />
      <CssBaseline />
      <PagesProvider />
    </ThemeProvider>
  </ContextProvider>
);