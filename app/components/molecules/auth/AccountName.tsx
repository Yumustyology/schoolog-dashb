import { school } from '@/app/assets';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import Location from '../../atoms/icons/AuthTypeIcons/Location';

function AccountName() {
  return (
    <div className="border border-gray5 w-full rounded-xl mt-7 flex p-4 gap-4">
      <div>
        <Image src={school} alt="Description of image" width={80} height={80} />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className={cn('text-sm mb-1', poppins_500.className)}>
          Tanke International School
        </h1>
        <p className="flex justify-center items-center gap-2">
          <Location />
          <span className={cn('text-sm text-gray3', poppins_400.className)}>
            Lekki Penninsula II, Lekki, Lagos state
          </span>
        </p>

        <div className="flex">
          <p>{/* Avatar Group Image */}</p>
          <p
            className={cn(
              'bg-[#f4f4f4] text-sm rounded-[44px] text-gray3 px-2'
            )}
          >
            + 120 others
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountName;
