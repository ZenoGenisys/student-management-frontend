import './App.css';
import { Router } from './routes';
import { AuthProvider, SnackbarProvider } from './state';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AuthProvider>
          <div className="app">
            <Router />
          </div>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
