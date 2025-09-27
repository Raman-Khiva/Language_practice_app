'use client'

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-700 px-4">
      {message}
    </div>
  );
};

export default LoadingSpinner;
