import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PATH } from './path';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../state';
import { Layout } from '../components';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorBoundary from '../components/ErrorBoundary';

const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Students = lazy(() => import('../pages/Students'));
const StudentDetails = lazy(() => import('../pages/StudentDetails'));
const Staff = lazy(() => import('../pages/Staff'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

const Router = () => {
  const { token, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <CircularProgress
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
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
          <Route path={PATH.STUDENT_DETAILS} element={<StudentDetails />} />
          <Route path={PATH.STAFF} element={<Staff />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default Router;
