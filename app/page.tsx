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
import { useSchoolContext } from './lib/hooks/useSchoolContext';
import { useRouter } from 'next/navigation';
import { AudienceTypes } from './lib/types/audience-types';

function Page() {
  const { tenant } = useSchoolContext();
  const router = useRouter();

  const handleSelect = (audienceType: AudienceTypes) => {
    setAuthState('audience_type', audienceType);
    if (tenant?.isDefault) {
      router.push('/select-school');
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <NextLoader />
      <AuthWrapper>
        <div className="bg-pattern w-full flex items-center justify-center min-h-screen py-10 tablet:px-14 laptop:px-24 desktop:px-36 mx-auto px-8">
          <div>
            <Image
              alt="logo"
              width={280}
              height={250}
              className="m-auto"
              src="/assets/images/logo.png"
              priority
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
              <p className="text-sm text-gray6 mt-2">Tenant: {tenant?.id}</p>
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
                func={() => handleSelect(AudienceTypes.STUDENT)}
                name="Student"
                description="Jump into your classes, track your progress, and stay connected with your school journey."
                Type={Student}
              />
              <AccountType
                func={() => handleSelect(AudienceTypes.STAFF)}
                name="Teacher"
                description="Manage your lessons, engage students, and keep learning interactive and inspiring."
                Type={Teacher}
              />
              <AccountType
                func={() => handleSelect(AudienceTypes.GUARDIAN)}
                name="Parent"
                description="Stay in the loop, monitor your child's progress, attendance, and school updates easily."
                Type={Parent}
              />
              <AccountType
                func={() => handleSelect(AudienceTypes.ADMIN)}
                name="School administrator"
                description="Oversee operations, manage, and streamline school management."
                Type={Admin}
              />
            </div>
          </div>
        </div>
        <ParticlesComp />
      </AuthWrapper>
    </>
  );
}

export default Page;
