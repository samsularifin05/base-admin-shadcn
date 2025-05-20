import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

const GeneralError = React.lazy(() => import('@/pages/errors/general-error'));
const MaintenanceError = React.lazy(
  () => import('@/pages/errors/maintenance-error')
);
const NotFoundError = React.lazy(
  () => import('@/pages/errors/not-found-error')
);
const LoginForm = React.lazy(() => import('../pages/admin/login/loginForm'));
const AppShell = React.lazy(() => import('../components/theme/app-shell'));
const Dashboard = React.lazy(() => import('../pages/admin/dashboard'));

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <AppShell />,
    errorElement: <NotFoundError />,
    children: [
      { path: '*', element: <NotFoundError /> },
      { index: true, path: 'dashboard', element: <Dashboard /> }
    ]
  },
  { path: '/', element: <LoginForm /> },
  { path: '/500', element: <GeneralError /> },
  { path: '/404', element: <NotFoundError /> },
  { path: '/503', element: <MaintenanceError /> },
  { path: '*', element: <NotFoundError /> }
]);

export default router;
