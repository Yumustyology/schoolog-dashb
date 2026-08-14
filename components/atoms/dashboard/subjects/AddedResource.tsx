import React from 'react';
import { CancelDrawerIcon, DocumentFileIcon } from '../../icons/Icons';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';

export const AddedResource = () => {
  return (
    <div className="flex justify-between items-center bg-gray4 p-3.5 rounded-md">
      <div className="flex gap-3">
        <div>
          <DocumentFileIcon />
        </div>
        <div className="flex-col gap-1.5">
          <h6 className={cn('text-sm text-gray6', poppins_500.className)}>
            {' '}
            The file name.extension
          </h6>
          <p className="text-xs text-gray3">708KB</p>
        </div>
      </div>

      <CancelDrawerIcon />
    </div>
  );
};
