// router.ts
import { createBrowserRouter, Outlet, RouteObject } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import RootErrorBoundary from '@/pages/errors/RootErrorBoundary';
import { SplashScreen } from '@/components';

const router = createBrowserRouter([
  {
    id: 'root',
    Component: Outlet,
    hydrateFallbackElement: <SplashScreen />,
    ErrorBoundary: RootErrorBoundary,
    children: [publicRoutes, protectedRoutes] as RouteObject[]
  }
]);

export default router;
