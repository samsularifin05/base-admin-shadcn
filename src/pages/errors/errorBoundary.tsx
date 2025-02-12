import React, { ReactNode, useState, useEffect, lazy, Suspense } from 'react';

const FallbackUI = lazy(() => import('./FallbackUI')); // Lazy load fallback UI

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error('Error caught by ErrorBoundary:', event.error);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <Suspense fallback={<div>Loading fallback UI...</div>}>
        {fallback || <FallbackUI />}
      </Suspense>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
