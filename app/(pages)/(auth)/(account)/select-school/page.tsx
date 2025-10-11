'use client';

import React, { useState, useRef, useEffect } from 'react';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import SchoolCard from '@/components/atoms/SchoolCard';
import useSWRInfinite from 'swr/infinite';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import ProgressPageNumber from '@/components/molecules/auth/PageNumber';
import { authState } from '@/app/lib/entities/auth.entity';
import Link from 'next/link';
import { AudienceTypes } from '@/app/lib/types/audience-types';
import fetchPublicSchools from '@/app/lib/actions/school-info.action';
import type { SchoolPublic } from '@/app/lib/types/school-info.types';
import { openSchoolSubdomain } from '@/app/lib/utils/openSchoolSubdomain';

function Page() {
  const { audience_type } = authState.use();
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const limit = 10;

  const getKey = (pageIndex: number, previousPageData: unknown) => {
    if (
      previousPageData &&
      previousPageData.data &&
      previousPageData.data.items.length === 0
    )
      return null;
    return ['/school/public', search || '', pageIndex + 1];
  };

  const fetcher = async (_url: string, q: string, page: number) => {
    const res = await fetchPublicSchools({
      search: q || undefined,
      page,
      limit,
    });
    return res;
  };

  const {
    data: pages,
    error,
    size,
    setSize,
  } = useSWRInfinite(getKey, fetcher, { revalidateOnFocus: false });

  const items = (pages || []).flatMap((p) => p?.data?.items || []);
  const total = pages && pages[0] ? pages[0].data?.total || 0 : 0;

  const isLoadingInitialData = !pages && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && pages && typeof pages[size - 1] === 'undefined');
  const isReachingEnd =
    !!(
      pages &&
      pages[pages.length - 1] &&
      pages[pages.length - 1].data &&
      pages[pages.length - 1].data.items.length === 0
    ) || items.length >= total;

  useEffect(() => {
    // reset to first page when search term changes
    setSize(1);
    if (containerRef.current) containerRef.current.scrollTop = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const bottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (bottom < 150 && !isReachingEnd && !isLoadingMore) {
        setSize((s) => s + 1);
      }
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [isReachingEnd, isLoadingMore, setSize]);

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
                  Sign Up!
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4 w-full">
            {error && <div className="text-red-500">Error loading schools</div>}

            <div
              ref={containerRef}
              style={{ maxHeight: '60vh', overflow: 'auto' }}
            >
              <div className="space-y-3">
                {items.length > 0 ? (
                  items.map((s: SchoolPublic) => (
                    <SchoolCard
                      key={s.slug}
                      school={s}
                      onClick={() => openSchoolSubdomain(s)}
                    />
                  ))
                ) : (
                  <div className="p-4">
                    {isLoadingInitialData ? 'Loading...' : 'No schools found.'}
                  </div>
                )}
              </div>
              {isLoadingMore && <div className="py-4">Loading more...</div>}
              {isReachingEnd && (
                <div className="py-4 text-center text-gray-500">
                  No more results
                </div>
              )}
            </div>
          </div>
        </div>
        {audience_type == AudienceTypes.ADMIN ? (
          <p className={cn('text-base mt-8', poppins_400.className)}>
            Don&apos;t have a registered school?{' '}
            <Link
              href="/signup"
              className={cn('underline text-bold text-primary')}
            >
              Sign Up!
            </Link>
          </p>
        ) : null}
      </main>
    </AuthWrapper>
  );
}

export default Page;
