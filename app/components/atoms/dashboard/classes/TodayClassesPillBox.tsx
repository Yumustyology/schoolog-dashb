import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const TodayClassesPillBox = ({ image }: { image?: boolean }) => {
  return (
    <div
      className={cn(
        'p-3 border border-gray5 rounded-lg flex flex-col justify-between'
      )}
    >
      <div className="flex gap-[14px]">
        {image && (
          <Image
            alt="cover-image"
            src={'/assets/images/cover-subject.png'}
            height={54}
            width={70}
          />
        )}
        <div>
          <p className={cn('text-gray1 text-base mb-3', poppins_500.className)}>
            Biology
          </p>
          <p className={cn('text-sm text-gray3', poppins_400.className)}>
            Introduction to state of matter
          </p>
        </div>
      </div>
      <div
        className={cn(
          'text-sm text-gray3 flex gap-2 mt-3.5 items-center',
          poppins_400.className
        )}
      >
        <Image
          alt="avatar"
          src={'/assets/images/avatar.png'}
          height={24}
          width={24}
        />
        <p className="text-gray6">Esther Ezike</p>
        <div className="bg-[#D9D9D9] h-1 w-1 rounded-full" />
        <p className="text-xs text-gray3">Nov 12, 2024 - 9am</p>
      </div>
    </div>
  );
};

export default TodayClassesPillBox;
