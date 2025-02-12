import { memo } from 'react';
const FallbackUI = memo(() => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-2xl font-bold text-primary">
      Oops! Something went wrong.
    </h1>
    <p className="mt-2 text-gray-700">
      Please try refreshing the page or contact support.
    </p>
  </div>
));
export default FallbackUI;
