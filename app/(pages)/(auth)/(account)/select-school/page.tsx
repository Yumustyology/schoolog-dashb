'use client';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import AccountName from '@/components/molecules/auth/AccountName';
// import PageNumber from '@/components/molecules/auth/PageNumber';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import ProgressPageNumber from '@/components/molecules/auth/PageNumber';
import { authState } from '@/app/lib/entities/auth.entity';
import Link from 'next/link';
import { AudienceTypes } from '@/app/lib/types/audience-types';

function page() {
  const { audience_type } = authState.use();
  return (
    <AuthWrapper>
      <main className="w-full min-h-screen py-28 px-36">
        <ProgressPageNumber />

        <div className="  flex flex-col items-center justify-center  mx-auto">
          <div className="mb-12">
            <h1
              className={cn(
                'text-black1 mb-2 text-3xl leading-10',
                poppins_600.className
              )}
            >
              Input your <span className="text-primary"> school name</span> or{' '}
              <span className="text-primary"> school ID</span> to proceed
            </h1>
            <p
              className={cn(
                'text-[#828282] text-base mt-4',
                poppins_400.className
              )}
            >
              Enter the name or ID of your school to get started with accessing
              your personalized dashboard.
            </p>

            {audience_type == AudienceTypes.ADMIN ? (
              <p className={cn('text-base mt-6 -mb-3', poppins_400.className)}>
                Don&apos;t have a registered school?{' '}
                <Link
                  href="/signup"
                  className={cn('underline text-bold text-primary')}
                >
                  Sign your school up!
                </Link>
              </p>
            ) : null}
          </div>

          <div className="flex justify-start gap-6 bg-[#F7F7F7] border border-[#D9DCE0] rounded-[100px] p-3 w-full">
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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
              className=" outline-none w-full text-gray1 bg-transparent"
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
        {audience_type == AudienceTypes.ADMIN ? (
          <p className={cn('text-base mt-8', poppins_400.className)}>
            Don&apos;t have a registered school?{' '}
            <Link
              href="/signup"
              className={cn('underline text-bold text-primary')}
            >
              Sign your school up!
            </Link>
            !{' '}
          </p>
        ) : null}
      </main>
    </AuthWrapper>
  );
}

export default page;
