// src/components/PrivateRoute.tsx
import { getRole } from '@/components';
import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Define the type for the props
interface PrivateRouteProps {
  role: 'admin' | 'user'; // Define the roles explicitly
  children: ReactNode; // Define the type for children
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ role, children }) => {
  const location = useLocation();
  const userRole = getRole();

  if (userRole !== role) {
    return <Navigate to={'/404'} state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
