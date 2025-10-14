'use client';

import React, { useEffect } from 'react';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import Admin from '@/components/atoms/icons/AuthTypeIcons/Admin';
import Parent from '@/components/atoms/icons/AuthTypeIcons/Parent';
import Student from '@/components/atoms/icons/AuthTypeIcons/Student';
import Teacher from '@/components/atoms/icons/AuthTypeIcons/Teacher';
import AccountType from '@/components/molecules/auth/AccountType';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';
import { setAuthState } from '@/app/lib/entities/auth.entity';
import {
  setSchoolState,
  schoolState,
  SchoolEntity,
} from '@/app/lib/entities/school.entity';
import { useEntity } from 'simpler-state';
import { notFound, useRouter } from 'next/navigation';
import { AudienceTypes } from '@/app/lib/types/audience-types';
import useRedirectIfAuthenticated from '@/app/lib/hooks/useRedirectIfAuthenticated';

export default function AccountTypeSelect({
  tenantId,
  school,
}: {
  tenantId?: string;
  school?: SchoolEntity | unknown;
}) {
  if (!tenantId) {
    notFound();
  }
  const router = useRouter();

  const currentSchool = useEntity(schoolState);

  useEffect(() => {
    if (school && typeof school === 'object') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - shallow set
      setSchoolState(school?.data as SchoolEntity);
    }
  }, [school]);

  const handleSelect = (audienceType: AudienceTypes) => {
    setAuthState('audience_type', audienceType);
    router.push('/login');
  };

  const checking = useRedirectIfAuthenticated();
  console.log("checking ",checking)
  if (checking) return null;

  return (
    <AuthWrapper>
      <div className="bg-pattern w-full flex items-center justify-center min-h-screen py-10 tablet:px-14 laptop:px-24 desktop:px-36 mx-auto px-8">
        <div>
          {!(
            (school && (school as any).data?.school_image) ||
            currentSchool?.school_image
          ) ? (
            <Image
              alt="logo"
              width={280}
              height={250}
              className="m-auto"
              src="/assets/images/logo.png"
              priority
            />
          ) : null}
          <div className="mb-12 text-center">
            {(school && (school as any).data) || currentSchool ? (
              (() => {
                const eff =
                  school && (school as any).data
                    ? (school as any).data
                    : currentSchool;
                return (
                  <>
                    {eff?.school_image ? (
                      <div className="mb-6">
                        <Image
                          src={eff.school_image}
                          alt={`${eff.name} logo`}
                          //width={160}
                          //height={80}
                          width={280}
                          height={250}
                          className="mx-auto object-contain rounded"
                        />
                      </div>
                    ) : null}
                    {eff?.name ? (
                      //   <p
                      //     className={cn(
                      //       'text-black1 text-xl leading-10 mb-1 mt-2',
                      //       poppins_600.className
                      //     )}
                      //   >
                      //     Welcome back to <strong>{eff.name}</strong>
                      //   </p>
                      <h1
                        className={cn(
                          'text-black1 text-3xl leading-10',
                          poppins_600.className
                        )}
                      >
                        Welcome to{' '}
                        <span className="text-primary"> {eff.name} </span>
                      </h1>
                    ) : (
                      <p className="text-sm text-gray6 mt-2">
                        Tenant: {tenantId}
                      </p>
                    )}
                  </>
                );
              })()
            ) : (
              <p className="text-sm text-gray6 mt-2">Tenant: {tenantId}</p>
            )}
            {/* <h1
              className={cn(
                'text-black1 text-3xl leading-10',
                poppins_600.className
              )}
            >
              Select Your <span className="text-primary"> Account Type </span>
            </h1> */}
            <p
              className={cn('text-gray6 text-base mt-4', poppins_400.className)}
            >
              Choose how you&apos;ll engage. Whether you&apos;re here to learn,
              teach, support, or manage we&apos;ve got you covered.
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
    </AuthWrapper>
  );
}
