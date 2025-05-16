import { poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { Upload_Icon2 } from '../../icons/Icons';

const AnnoucementUploadBox = () => {
  return (
    <div className="flex justify-between items-center bg-gray4 p-3.5 rounded-md">
      <div className="flex gap-3 items-center">
        <div>
          <Upload_Icon2 color="#828282" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h6 className={cn('text-sm text-gray6', poppins_500.className)}>
            {' '}
            Upload file here
          </h6>
          <p className="text-xs text-gray3">PDF, Word, Excel less than 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default AnnoucementUploadBox;
