import { poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { SingleInfo } from '@/components/atoms/DetailsInformation/SingleInfo';
import React from 'react';

export const GuardianInfoCard = () => {
  return (
    <div className="bg-white py-6 px-6 flex flex-col justify-between h-[390px] rounded-md col-span-2 border-none">
      <h4 className={cn('text-lg text-black1', poppins_500.className)}>
        Guardian details{' '}
      </h4>

      <div>
        <SingleInfo
          leftText="Guardian name"
          leftValue="Ademola Adeolu"
          rightText="Relationship"
          rightValue="Father"
        />
        <SingleInfo
          leftText="email"
          leftValue="jimohjamiu2000@gmail.com"
          rightText="Guardian contact"
          rightValue="08082116547"
        />
        <SingleInfo
          leftText="Student ID"
          leftValue="Muhammad Adeolu"
          rightText="Secondary phone number"
          rightValue="08082116547"
        />
        <SingleInfo
          leftText="Guardian address"
          leftValue="No 42, Abacha road, Maraba, FCT, Abuja"
        />
      </div>
    </div>
  );
};
