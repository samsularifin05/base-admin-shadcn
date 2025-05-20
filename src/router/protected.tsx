// protected.ts
import { Navigate, RouteObject } from 'react-router';
import AuthGuard from './middleware/authGuard';

const protectedRoutes: RouteObject = {
  id: 'protected',
  Component: AuthGuard,
  children: [
    {
      lazy: async () => ({
        Component: (await import('../components/theme/app-shell')).default
      }),
      children: [
        {
          index: true,
          element: <Navigate to="/admin/dashboard" replace />
        },
        {
          path: 'dashboard',
          lazy: async () => ({
            Component: (await import('@/pages/admin/dashboard')).default
          })
        },
        {
          path: 'users',
          lazy: async () => ({
            Component: (await import('@/pages/admin/users')).default
          })
        }
      ]
    }
  ]
};

export { protectedRoutes };
