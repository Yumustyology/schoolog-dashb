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
import Image from 'next/image';
import { ParticlesComp } from '@/components/molecules/Particles';
import NextLoader from '@/components/atoms/NextLoader';
import { setAuthState } from './lib/entities/auth.entity';
import { AudienceTypes } from './lib/types/audience-types';

function page() {
  return (
    <>
      <NextLoader />
      {/* <main className="grid grid-cols-5 w-full h-screen ">
    <div className="w-full h-full lgTablet:col-span-2 bg-green-900 tablet:col-span-1 xxs:hidden tablet:block "></div>
    <div className="bg-white w-full h-full flex justify-center items-center lgTablet:col-span-3 tablet:col-span-4 xxs:col-span-5"> */}
      <AuthWrapper>
        <div className="bg-pattern w-full flex items-center justify-center min-h-screen py-10 tablet:px-14 laptop:px-24 desktop:px-36 mx-auto px-8">
          <div>
            <Image
              alt="logo"
              height={250}
              width={280}
              className="m-auto"
              src={'/assets/images/logo.png'}
            />
            <div className="mb-12 text-center">
              <h1
                className={cn(
                  'text-black1 text-3xl leading-10',
                  poppins_600.className
                )}
              >
                Select Your <span className="text-primary"> Account Type </span>
              </h1>
              <p
                className={cn(
                  'text-gray6 text-base mt-4',
                  poppins_400.className
                )}
              >
                Choose how you&apos; ll engage. Whether you&apos;re here to
                learn, teach, support, or manage we&apos;ve got you covered.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <AccountType
                func={() =>
                  setAuthState('audience_type', AudienceTypes.STUDENT)
                }
                name="Student"
                description="Jump into your classes, track your progress, and stay connected with your school journey."
                Type={Student}
              />
              <AccountType
                func={() => setAuthState('audience_type', AudienceTypes.STAFF)}
                name="Teacher"
                description="Manage your lessons, engage students, and keep learning interactive and inspiring."
                Type={Teacher}
              />
              <AccountType
                func={() =>
                  setAuthState('audience_type', AudienceTypes.GUARDIAN)
                }
                name="Parent"
                description="Stay in the loop, monitor your child's progress, attendance, and school updates easily."
                Type={Parent}
              />
              <AccountType
                func={() => setAuthState('audience_type', AudienceTypes.ADMIN)}
                name="School administrator"
                description="Oversee operations, manage, and streamline school management."
                Type={Admin}
              />
            </div>
          </div>
        </div>
        <ParticlesComp />
      </AuthWrapper>
      {/* </div>
    </main> */}
    </>
  );
}

export default page;
