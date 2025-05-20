// public.ts
import { LoginForm } from '@/pages';
import { RouteObject } from 'react-router-dom';
import AuthRoute from './middleware/authRoute';

const publicRoutes: RouteObject = {
  id: 'public',
  path: '/',
  children: [
    {
      index: true,
      element: (
        <AuthRoute mode="publicOnly">
          <LoginForm />
        </AuthRoute>
      )
    }
  ]
};

export { publicRoutes };
