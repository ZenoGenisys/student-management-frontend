import './App.css';
import { Router } from './routes';
import { AuthProvider } from './state';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <div className="app">
          <Router />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
