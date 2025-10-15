export default function TermCardSkeleton() {
  return (
    <div className="bg-gray-50 rounded-lg p-6 animate-pulse border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
      </div>
    </div>
  );
}
