import { poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { SingleInfo } from '@/components/atoms/DetailsInformation/SingleInfo';
import React from 'react';

export const EventMoreDetailCard = () => {
  return (
    <div className="bg-white py-6 px-6 flex flex-col justify-between h-[390px] rounded-md col-span-2 border-none">
      <h4 className={cn('text-lg text-black1', poppins_500.className)}>
        Other info{' '}
      </h4>
      <div className="flex flex-col gap-10">
        <p>
          Agriculture is the cornerstone of food security, serving as the
          primary means of sustenance and economic stability for nations
          worldwide. It encompasses the cultivation of crops and livestock,
          which are essential for providing the food supply that suppor.
        </p>

        <p>
          It encompasses the cultivation of crops and livestock, which are
          essential for providing the food supply that suppor.
        </p>

        <p>
          It encompasses the cultivation of crops and livestock, which are
          essential for providing the food supply that support.
        </p>
      </div>
    </div>
  );
};
