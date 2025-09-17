import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Login, Students } from '../pages';
import { PATH } from './path';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../state';
import { Layout } from '../components';
import CircularProgress from '@mui/material/CircularProgress';

const Router = () => {
  const { token, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <CircularProgress />;
  }

  return (
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
      </Route>
    </Routes>
  );
};

export default Router;
