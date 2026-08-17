import React from 'react';
import { CancelDrawerIcon, DocumentFileIcon } from '../icons/Icons';
import { poppins_500 } from '@/app/lib/config/font.config';
import { cn, formatFileSize } from '@/app/lib/utils';

type BulkImportSelectedFileProps = {
  file: File;
  onRemove?: () => void;
};

export const BulkImportSelectedFile = ({
  file,
  onRemove,
}: BulkImportSelectedFileProps) => {
  return (
    <div className="flex justify-between items-center bg-gray4 p-3.5 rounded-md">
      <div className="flex gap-3">
        <div>
          <DocumentFileIcon />
        </div>
        <div className="flex-col gap-1.5">
          <h6 className={cn('text-sm text-gray6', poppins_500.className)}>
            {' '}
            {file.name}
          </h6>
          <p className="text-xs text-gray3">{formatFileSize(file.size)}</p>
        </div>
      </div>

      {onRemove && (
        <button type="button" onClick={onRemove} aria-label="Remove file">
          <CancelDrawerIcon />
        </button>
      )}
    </div>
  );
};
