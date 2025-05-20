import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/reduxStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const theme = useAppSelector((state) => state.theme);
  if (!theme.getIsLogin) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};
