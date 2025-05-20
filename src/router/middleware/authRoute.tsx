import { useAppSelector } from '@/reduxStore';
import { Navigate } from 'react-router-dom';

type AuthMode = 'protected' | 'publicOnly';

interface AuthRouteProps {
  children: React.ReactNode;
  mode: AuthMode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children, mode }) => {
  const isLogin = useAppSelector((state) => state.theme.getIsLogin);

  if (mode === 'protected' && !isLogin) {
    return <Navigate to="/" replace />;
  }

  if (mode === 'publicOnly' && isLogin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
