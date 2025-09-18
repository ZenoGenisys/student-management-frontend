import { Suspense, lazy } from 'react';
import type { ComponentType } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { PATH } from './path';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../state';
import { Layout } from '../components';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorBoundary from '../components/ErrorBoundary';

const Loadable = (Component: React.LazyExoticComponent<ComponentType<any>>) => (props: any) => (
  <ErrorBoundary>
    <Suspense fallback={<CircularProgress sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}>
      <Component {...props} />
    </Suspense>
  </ErrorBoundary>
);

const Dashboard = Loadable(lazy(() => import('../pages/Dashboard/Dashboard')));
const Students = Loadable(lazy(() => import('../pages/Students/Students')));
const Login = Loadable(lazy(() => import('../pages/Login')));

const Router = () => {
  const navigate = useNavigate();
  const { token, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <CircularProgress sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />;
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to={PATH.DASHBOARD} replace />
            ) : (
              <Navigate to={PATH.LOGIN} replace />
            )
          }
        />
        <Route
          path={PATH.LOGIN}
          element={token ? <Navigate to={PATH.DASHBOARD} replace /> : <Login />}
        />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path={PATH.DASHBOARD} element={<Dashboard />} />
          <Route path={PATH.STUDENTS} element={<Students />} />
          <Route path="*" element={
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                404 - Page Not Found
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate(PATH.DASHBOARD)}
              >
                Go to Dashboard
              </Button>
            </Box>
          } />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default Router;
