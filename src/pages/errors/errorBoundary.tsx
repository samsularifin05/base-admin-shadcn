import React, { ReactNode, useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional fallback UI
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

    // Listen for unhandled errors
    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-2xl font-bold text-primary">
            Oops! Something went wrong.
          </h1>
          <p className="mt-2 text-gray-700">
            Please try refreshing the page or contact support.
          </p>
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
