import { school } from '@/app/assets';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';
import React from 'react';
import Location from '../../atoms/icons/AuthTypeIcons/Location';
import AvatarStack from './AvatarStack';

function AccountName({ small = false}:{ small?: boolean }) {
  return (
    <div className={cn("border border-gray5 w-full rounded-xl mt-1 flex items-center p-4 gap-4", small && "p-3 py-3")}>
      <div>
        <Image
          src={school}
          alt="Description of image"
          width={!small ? 100 : 60}
          height={!small ? 100 : 60}
        />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className={cn('text-sm mb-1', poppins_500.className)}>
          Tanke International School
        </h1>
        <p className="flex justify-center items-center gap-2">
          <Location />
          <span className={cn('text-sm text-gray3', poppins_400.className)}>
            Lekki Penninsula II, Lekki, Lagos state
          </span>
        </p>

        {!small ? <div className="flex gap-3 px-2 ">
          <AvatarStack />
          <p
            className={cn(
              'bg-[#f4f4f4] text-sm rounded-[44px] h-[22px] text-gray3 px-2'
            )}
          >
            + 120 others
          </p>
          </div> : null}
      </div>
    </div>
  );
}

export default AccountName;
