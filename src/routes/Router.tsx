import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PATH } from './path';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../state';
import { Layout } from '../components';
import CircularProgress from '@mui/material/CircularProgress';

const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Students = lazy(() => import('../pages/Students'));

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
        element={
          token ? (
            <Navigate to={PATH.DASHBOARD} replace />
          ) : (
            <Suspense fallback={<CircularProgress />}>
              <Login />
            </Suspense>
          )
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path={PATH.DASHBOARD}
          element={
            <Suspense fallback={<CircularProgress />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path={PATH.STUDENTS}
          element={
            <Suspense fallback={<CircularProgress />}>
              <Students />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
