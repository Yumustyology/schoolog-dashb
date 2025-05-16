import React from 'react';

const Loading = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-gray-500 py-12">
        <div className="animate-pulse bg-gray-200 h-6 w-1/2 mb-4"></div>
        <div className="animate-pulse bg-gray-200 h-4 w-1/3 mb-2"></div>
        <div className="animate-pulse bg-gray-200 h-4 w-1/4 mb-2"></div>
        <div className="animate-pulse bg-gray-200 h-4 w-1/5 mb-2"></div>
      </div>
    </div>
  );
};

export default Loading;
