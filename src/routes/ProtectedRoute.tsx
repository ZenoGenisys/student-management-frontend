import { Navigate } from 'react-router-dom';
import { useAuth } from '../state';
import { PATH } from './path';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // Redirect to login if there's no token
    return <Navigate to={PATH.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
