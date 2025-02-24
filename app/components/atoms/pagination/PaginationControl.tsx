import { cn } from '@/app/lib/utils';
import PageSizeSelector from './PageSizeSelector';

const PaginationControl = ({
  totalPages,
  currentPage,
  setCurrentPage,
  pageSize,
  onPageSizeChange,
  className,
  recordLength,
  pageSizeClassName,
  buttonGroupClassName,
  hasNextPage,
  hasPrevPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  className?: string;
  pageSizeClassName?: string;
  buttonGroupClassName?: string;
  recordLength: number;
}) => {
  if (!hasNextPage && !hasPrevPage && totalPages == 1 && recordLength <= 5)
    return;
  return (
    <div className={cn('flex items-center w-full', className)}>
      <div className={cn('flex justify-end p-4 m-0', pageSizeClassName)}>
        <PageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
      <div
        className={cn(
          'flex justify-between items-center p-4 w-full',
          buttonGroupClassName
        )}
      >
        {hasPrevPage && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="font-nunito bg-cdial-black-500 text-sm px-4 py-2 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
        )}
        <span className="text-sm font-nunito">
          Page {currentPage} of {totalPages}
        </span>
        {hasNextPage && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="font-nunito bg-cdial-black-500 text-sm text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PaginationControl;
