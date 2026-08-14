'use client';

import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { Inter_500, Inter_600, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import staffActions from '@/app/lib/actions/staff.action';

const TeacherDashboardPage = () => {
  const { data, isLoading } = useSWR(['staff-me'], () =>
    staffActions.fetchMyStaffProfile()
  );
  const profile = data?.data;
  const classes = profile?.classes || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className={cn('text-2xl text-gray1', Inter_600.className)}>
          Hi {profile?.firstName || 'there'} 👋
        </h1>
        <p className={cn('text-sm text-gray6 mt-1', poppins_400.className)}>
          Here&apos;s what&apos;s happening with your classes today.
        </p>
      </div>

      <div className="grid grid-cols-1 lgTablet:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6">
          <p className={cn('text-sm text-gray6', poppins_400.className)}>
            Classes assigned
          </p>
          <p className={cn('text-3xl text-gray1 mt-2', Inter_600.className)}>
            {isLoading ? '—' : classes.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6">
          <p className={cn('text-sm text-gray6', poppins_400.className)}>
            Class teacher of
          </p>
          <p className={cn('text-3xl text-gray1 mt-2', Inter_600.className)}>
            {isLoading
              ? '—'
              : classes.filter((c) => c.isClassTeacher).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6">
          <p className={cn('text-sm text-gray6', poppins_400.className)}>
            Status
          </p>
          <p
            className={cn(
              'text-3xl text-gray1 mt-2 capitalize',
              Inter_600.className
            )}
          >
            {profile?.status || '—'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6">
        <h2 className={cn('text-lg text-gray1 mb-4', Inter_500.className)}>
          My classes
        </h2>
        {!isLoading && classes.length === 0 && (
          <p className={cn('text-sm text-gray6', poppins_400.className)}>
            You haven&apos;t been assigned any classes yet.
          </p>
        )}
        <div className="grid grid-cols-1 lgTablet:grid-cols-3 gap-4">
          {classes.map((c) => {
            const classGrade =
              typeof c.classGradeId === 'object' ? c.classGradeId : null;
            if (!classGrade) return null;
            return (
              <Link
                key={classGrade._id}
                href={`/teacher/classes/${classGrade._id}`}
                className="border border-gray4 rounded-xl p-4 hover:border-primary transition-colors"
              >
                <p className={cn('text-base text-gray1', Inter_500.className)}>
                  {classGrade.name}
                </p>
                {c.isClassTeacher && (
                  <span
                    className={cn(
                      'text-xs text-primary mt-1 inline-block',
                      poppins_400.className
                    )}
                  >
                    Class teacher
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
