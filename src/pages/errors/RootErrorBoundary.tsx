// Import Depndencies
import { isRouteErrorResponse, useRouteError } from 'react-router';
import { lazy } from 'react';
import { Loadable } from './loadable';

// Local Imports

// ----------------------------------------------------------------------

const app = {
  401: lazy(() => import('./not-found-error')),
  404: lazy(() => import('./not-found-error')),
  429: lazy(() => import('./not-found-error')),
  500: lazy(() => import('./not-found-error'))
};

function RootErrorBoundary() {
  const error = useRouteError();

  if (
    isRouteErrorResponse(error) &&
    Object.keys(app).includes(error.status.toString())
  ) {
    const Component = Loadable(app[error.status as keyof typeof app]);
    return <Component />;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="mx-auto max-w-xl text-center">
        Application error: a client-side exception has occurred while loading
        (see the browser console for more information).
      </div>
    </div>
  );
}

export default RootErrorBoundary;
