const GeneralError = lazy(() => import('@/pages/errors/general-error'));
const MaintenanceError = lazy(() => import('@/pages/errors/maintenance-error'));
const NotFoundError = lazy(() => import('@/pages/errors/not-found-error'));
const LoginForm = lazy(() => import('../pages/admin/login/loginForm'));
const AppShell = lazy(() => import('../components/theme/app-shell'));
const Dashboard = lazy(() => import('../pages/admin/dashboard'));

import { createBrowserRouter } from 'react-router-dom';

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
