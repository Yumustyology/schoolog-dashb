'use client';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import Admin from '@/components/atoms/icons/AuthTypeIcons/Admin';
import Parent from '@/components/atoms/icons/AuthTypeIcons/Parent';
import Student from '@/components/atoms/icons/AuthTypeIcons/Student';
import Teacher from '@/components/atoms/icons/AuthTypeIcons/Teacher';
import AccountType from '@/components/molecules/auth/AccountType';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';

import React from 'react';

function page() {
  return (
    <AuthWrapper>
      <div className=" w-full flex items-center justify-center min-h-screen py-28 tablet:px-14 laptop:px-24 desktop:px-36 mx-auto px-8">
        <div>
          <div className="mb-12">
            <h1
              className={cn(
                'text-black1 text-3xl leading-10',
                poppins_600.className
              )}
            >
              Select Your <span className="text-primary"> Account Type </span>
            </h1>
            <p
              className={cn('text-gray6 text-base mt-4', poppins_400.className)}
            >
              Lorem ipsum dolor sit amet consectetur. Blandit nibh convallis et
              imperdiet lobortis et. Egestas vitae bibendum morbi.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <AccountType
              name="Student"
              description="Lorem ipsum dolor sit amet consectetur. Pulvinar."
              Type={Student}
            />
            <AccountType
              name="Teacher"
              description="Lorem ipsum dolor sit amet consectetur. Pulvinar."
              Type={Teacher}
            />
            <AccountType
              name="Parent"
              description="Lorem ipsum dolor sit amet consectetur. Pulvinar."
              Type={Parent}
            />
            <AccountType
              name="School administrator"
              description="Lorem ipsum dolor sit amet consectetur. Pulvinar."
              Type={Admin}
            />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default page;
