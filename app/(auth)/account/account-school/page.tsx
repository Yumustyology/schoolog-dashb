import AccountName from '@/app/components/molecules/auth/AccountName';
import {
  poppins_400,
  poppins_500,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import React from 'react';

function page() {
  return (
    <div className=" max:w-full flex flex-col items-center justify-center min-h-screen py-28 px-36 mx-auto">
      <div className="mb-12">
        <h1
          className={cn(
            'text-[#101828] mb-2 text-3xl leading-10',
            poppins_600.className
          )}
        >
          Input your <span className="text-primary"> school name</span> <br />{' '}
          to proceed
        </h1>
        <p
          className={cn('text-[#828282] text-base mt-4', poppins_400.className)}
        >
          Lorem ipsum dolor sit amet consectetur. Blandit nibh convallis et
          imperdiet lobortis et. Egestas vitae bibendum morbi.
        </p>
      </div>

      <div className="flex justify-start gap-6 bg-[#D9DCE0] rounded-[100px] p-3 w-full">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="#828282"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 22L20 20"
            stroke="#828282"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <input
          type="search"
          placeholder="Search school"
          className="bg-transparent outline-none w-full text-gray1 "
        />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <AccountName />
        <AccountName />
        <AccountName />
        <AccountName />
        <AccountName />
      </div>
    </div>
  );
}

export default page;
