import React from 'react';

export default function SubjectCardSkeleton() {
  return (
    <div className="col-span-1 bg-gray11 p-4 rounded-lg min-h-[180px] animate-pulse">
      <div className="space-y-3">
        {/* Cover image placeholder */}
        <div className="w-full h-24 bg-gray2 rounded-md"></div>
        
        {/* Subject name placeholder */}
        <div className="h-4 bg-gray2 rounded w-3/4"></div>
        
        {/* Description placeholder */}
        <div className="space-y-2">
          <div className="h-3 bg-gray2 rounded w-full"></div>
          <div className="h-3 bg-gray2 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}
