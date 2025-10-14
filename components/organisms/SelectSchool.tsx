'use client';

import React, { useState, useCallback, useEffect } from 'react';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import SchoolCard from '@/components/atoms/SchoolCard';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import ProgressPageNumber from '@/components/molecules/auth/PageNumber';
import { authState } from '@/app/lib/entities/auth.entity';
import Link from 'next/link';
import { AudienceTypes } from '@/app/lib/types/audience-types';
import fetchPublicSchools from '@/app/lib/actions/school-info.action';
import { openSchoolSubdomain } from '@/app/lib/utils/openSchoolSubdomain';
import type { SchoolPublic } from '@/app/lib/types/school-info.types';
import ScrollPaginator from '@/components/molecules/ScrollPaginator';
import { SchoolCardSkeleton } from '@/components/atoms/SchoolCard';
import Image from 'next/image';

export default function SelectSchool() {
  const { audience_type } = authState.use();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const fetchPage = useCallback(
    async (page: number) => {
      const q = debouncedSearch?.trim();
      const res = await fetchPublicSchools({
        ...(q ? { search: q } : {}),
        page,
        limit: 10,
      });

      if (res?.data) {
        return {
          items: res.data.items || [],
          total: res.data.total || 0,
          page: res.data.page || page,
          limit: res.data.limit || 10,
        };
      }
      return { items: [], total: 0, page, limit: 10 };
    },
    [debouncedSearch]
  );

  return (
    <AuthWrapper>
      <main className="w-full min-h-screen py-10 px-28">
        <Image
          alt="logo"
          width={280}
          height={250}
          className="m-auto"
          src="/assets/images/logo.png"
          priority
        />
        <div className="flex flex-col items-center justify-center mx-auto">
          <div className="mb-12 text-center">
            <h1
              className={cn(
                'text-black1 mb-2 text-3xl leading-10',
                poppins_600.className
              )}
            >
              Input your <span className="text-primary">school name</span> or{' '}
              <span className="text-primary">school ID</span> to proceed
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

            {audience_type === AudienceTypes.ADMIN && (
              <p className={cn('text-base mt-6 -mb-3', poppins_400.className)}>
                  Don&apos;t have a registered school?{' '}
                  <Link
                    href="/signup"
                    className={cn('underline text-bold text-primary')}
                  >
                    Sign Up!
                  </Link>
                </p>
            )}
          </div>

          {/* Search Bar */}
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
              className="outline-none w-full text-gray1 bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full mt-6">
            <ScrollPaginator<SchoolPublic>
              key={debouncedSearch}
              swrKey={`public-schools-search=${debouncedSearch}`}
              fetchPage={fetchPage}
              renderItem={(school: SchoolPublic) => (
                <SchoolCard
                  school={school}
                  onClick={() => openSchoolSubdomain(school)}
                />
              )}
              loader={
                <>
                  <SchoolCardSkeleton />
                  <SchoolCardSkeleton />
                  <SchoolCardSkeleton />
                </>
              }
            />
          </div>
        </div>

        {audience_type === AudienceTypes.ADMIN && (
          <p className={cn('text-base mt-8', poppins_400.className)}>
            Don&apos;t have a registered school?{' '}
            <Link
              href="/signup"
              className={cn('underline text-bold text-primary')}
            >
              Sign Up!
            </Link>
          </p>
        )}
      </main>
    </AuthWrapper>
  );
}
