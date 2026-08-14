'use client';

import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import staffActions from '@/app/lib/actions/staff.action';

const MyClassesPage = () => {
  const { data, isLoading } = useSWR(['staff-me'], () =>
    staffActions.fetchMyStaffProfile()
  );
  const classes = data?.data?.classes || [];

  return (
    <div>
      <BreadcrumbBox
        className="mb-6"
        crumbs={[{ label: 'My Classes', isActive: true }]}
      />

      <div className="bg-white rounded-xl p-6 min-h-[60vh]">
        {!isLoading && classes.length === 0 && (
          <p className={cn('text-sm text-gray6 text-center py-12', poppins_400.className)}>
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

export default MyClassesPage;
