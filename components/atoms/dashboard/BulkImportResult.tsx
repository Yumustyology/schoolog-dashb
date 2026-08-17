import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import type { BulkImportSummary } from '@/app/lib/types/bulk-import.types';
import { CheckCircle2, XCircle } from 'lucide-react';
import React from 'react';

type BulkImportResultProps = {
  summary: BulkImportSummary;
};

export const BulkImportResult = ({ summary }: BulkImportResultProps) => {
  const failedRows = summary.results.filter((row) => row.status === 'failed');

  return (
    <div className="mt-4">
      <div className="flex gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-primary bg-opacity-5 border border-primary border-opacity-15 rounded-lg py-3 px-4">
          <CheckCircle2 className="text-primary shrink-0" size={20} />
          <p className={cn('text-sm text-gray1', poppins_500.className)}>
            {summary.successCount} succeeded
          </p>
        </div>
        <div className="flex-1 flex items-center gap-2 bg-[#EB575714] border border-[#EB5757] border-opacity-15 rounded-lg py-3 px-4">
          <XCircle className="text-[#EB5757] shrink-0" size={20} />
          <p className={cn('text-sm text-gray1', poppins_500.className)}>
            {summary.failureCount} failed
          </p>
        </div>
      </div>

      {failedRows.length > 0 && (
        <div className="flex flex-col gap-2 max-h-52 overflow-y-auto">
          {failedRows.map((row) => (
            <div key={row.row} className="bg-[#EB575714] rounded-md p-3">
              <p className={cn('text-xs text-gray1', poppins_500.className)}>
                Row {row.row} &middot; {row.identifier}
              </p>
              <p
                className={cn(
                  'text-xs text-[#EB5757] mt-1',
                  poppins_400.className
                )}
              >
                {row.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
