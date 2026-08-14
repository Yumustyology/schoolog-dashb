import React from 'react';

export default function MaterialCardSkeleton() {
  return (
    <div className="min-w-[180px] p-3 py-6 rounded-[12px] bg-white flex flex-col justify-center gap-4 border border-transparent animate-pulse">
      <div className="mx-auto h-16 w-16 rounded-md bg-gray2" />
      <div className="mx-auto h-4 w-3/4 rounded bg-gray2" />
      <div className="mx-auto h-3 w-1/2 rounded bg-gray2" />
    </div>
  );
}
