import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MaterialProvider } from '@mui/material/styles';

type Props = {
  children: ChildNode;
}

const theme = createTheme();

export const ThemeProvider = ({ children }: Props) => (
  <MaterialProvider theme={theme}>
    <CssBaseline />
    {children}
  </MaterialProvider>
);