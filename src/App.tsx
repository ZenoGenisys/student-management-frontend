import './App.css';
import { Router } from './routes';
import { AuthProvider, SnackbarProvider, LoadingProvider } from './state';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loader from './components/Loader';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <AuthProvider>
            <LoadingProvider>
              <Loader />
              <div className="app">
                <Router />
              </div>
            </LoadingProvider>
          </AuthProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
