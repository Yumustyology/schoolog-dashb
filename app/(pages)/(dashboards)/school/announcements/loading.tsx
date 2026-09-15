import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Skeleton className="h-6 w-1/2 rounded-lg" />
      <Skeleton className="h-4 w-1/3 rounded-lg" />
      <Skeleton className="h-4 w-1/4 rounded-lg" />
      <Skeleton className="h-4 w-1/5 rounded-lg" />
    </div>
  );
};

export default Loading;
