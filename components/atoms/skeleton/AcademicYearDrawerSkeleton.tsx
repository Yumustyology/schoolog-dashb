import React from 'react';

const AcademicYearDrawerSkeleton: React.FC = () => (

  <div className="p-6 flex flex-col h-full joverflow-y-auto max-h-[90dvh] pb-10 animate-pulse">
    <div className="mb-6">
      <div className="h-6 w-2/3 bg-[#e5e7eb] rounded mb-2" />
      <div className="h-4 w-1/3 bg-[#f3f4f6] rounded mb-2" />
      <div className="h-5 w-24 bg-[#e5e7eb] rounded" />
    </div>
    {/* Skeleton for terms */}
    <div className="space-y-6">
      {[1,2].map((i) => (
        <div key={i} className="bg-[#f9fafb] rounded-lg p-4 border border-[#e5e7eb]">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="h-4 w-24 bg-[#e5e7eb] rounded mb-1" />
              <div className="h-3 w-20 bg-[#f3f4f6] rounded" />
            </div>
            <div className="h-5 w-10 bg-[#e5e7eb] rounded" />
          </div>
          <div className="mt-3 space-y-2">
            {[1,2].map(j => (
              <div key={j} className="flex justify-between items-center bg-white border border-[#e5e7eb] rounded-md p-2">
                <div>
                  <div className="h-3 w-16 bg-[#e5e7eb] rounded mb-1" />
                  <div className="h-2 w-10 bg-[#f3f4f6] rounded" />
                </div>
                <div className="h-3 w-12 bg-[#f3f4f6] rounded" />
                <div className="h-5 w-5 bg-[#e5e7eb] rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AcademicYearDrawerSkeleton;
