/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, LazyExoticComponent, ReactNode } from 'react';

// ----------------------------------------------------------------------

function Loadable(
  Component: LazyExoticComponent<React.ComponentType<any>>,
  fallback?: ReactNode
) {
  const LoadableComponent = (
    props: JSX.IntrinsicAttributes & Record<string, unknown>
  ) => (
    <Suspense fallback={fallback ?? <div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

  return LoadableComponent;
}

export { Loadable };
