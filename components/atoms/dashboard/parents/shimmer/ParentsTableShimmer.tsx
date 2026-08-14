import { Skeleton } from '@/components/ui/skeleton';

function ParentsTableShimmer() {
  return (
    <div className="my-8">
      <div className="border-none bg-white rounded-lg overflow-hidden">
        <div className="bg-[#FBFBFB] border-none text-gray text-sm px-6 py-3 flex items-center">
          <div className="w-1/5"><Skeleton className="h-5 w-24" /></div>
          <div className="w-1/5"><Skeleton className="h-5 w-20" /></div>
          <div className="w-1/5"><Skeleton className="h-5 w-20" /></div>
          <div className="w-1/5"><Skeleton className="h-5 w-20" /></div>
          <div className="w-1/5"></div>
        </div>
        <div className="flex flex-col divide-y divide-gray-100">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center px-6 py-4 gap-4">
              <div className="w-1/5 flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="w-1/5 flex gap-2">
                {[...Array(2)].map((_, j) => (
                  <Skeleton key={j} className="h-8 w-8 rounded-full" />
                ))}
              </div>
              <div className="w-1/5">
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="w-1/5">
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="w-1/5 flex justify-end">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ParentsTableShimmer;