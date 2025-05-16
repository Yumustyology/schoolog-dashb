import React from 'react';
import { CancelDrawerIcon } from '../../icons/Icons';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { teacherImg } from '@/app/assets';
import Image from 'next/image';

export const AddedTeacherList = () => {
  return (
    <div className="flex justify-between items-center bg-gray4 p-3.5 rounded-md">
      <div className="flex gap-3">
        <div>
          <Image src={teacherImg} alt="" />
        </div>
        <div className="flex-col gap-1.5">
          <h6 className={cn('text-sm text-gray6', poppins_500.className)}>
            {' '}
            Muhammad Jamiu{' '}
          </h6>
          <p className="text-xs text-gray3">Assigned to Mathematics</p>
        </div>
      </div>

      <CancelDrawerIcon />
    </div>
  );
};
