const SkeletonLoader = () => (
  <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
    <div className="w-40 h-6 mb-2 bg-gray-300 rounded-md animate-pulse"></div>
    <div className="h-6 bg-gray-300 rounded-md w-60 animate-pulse"></div>
  </div>
);

export default SkeletonLoader;
