'use client';

import React, { useState, useCallback, useEffect } from 'react';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import SchoolCard from '@/components/atoms/SchoolCard';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
// import ProgressPageNumber from '@/components/molecules/auth/PageNumber';
import { authState } from '@/app/lib/entities/auth.entity';
import Link from 'next/link';
import { AudienceTypes } from '@/app/lib/types/audience-types';
import fetchPublicSchools from '@/app/lib/actions/school-info.action';
import { openSchoolSubdomain } from '@/app/lib/utils/openSchoolSubdomain';
import type { SchoolPublic } from '@/app/lib/types/school-info.types';
import ScrollPaginator from '@/components/molecules/ScrollPaginator';
import { SearchOutlineIcon } from '@/components/atoms/icons/Icons';
import { SchoolCardSkeleton } from '@/components/atoms/SchoolCard';
import Image from 'next/image';

export default function SelectSchool() {
  const { audienceType } = authState.use();
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

      if (res && res.data) {
        const meta = res.meta;
        return {
          items: res.data || [],
          total: meta?.count || 0,
          page: Number(meta?.page) || page,
          limit: Number(meta?.limit) || 10,
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

            {audienceType === AudienceTypes.ADMIN && (
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
            <SearchOutlineIcon size={24} />

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

        {audienceType === AudienceTypes.ADMIN && (
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
