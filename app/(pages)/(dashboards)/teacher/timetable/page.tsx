'use client';

import React from 'react';
import useSWR from 'swr';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import timetableActions, { TimetableEntry } from '@/app/lib/actions/timetable.action';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const TeacherTimetablePage = () => {
  const { data, isLoading } = useSWR(['my-timetable'], () =>
    timetableActions.fetchMyTimetable()
  );
  const entries = data?.data || [];

  const byDay = (day: string): TimetableEntry[] =>
    entries
      .filter((e) => e.day === day)
      .sort((a, b) => a.period - b.period);

  return (
    <div>
      <BreadcrumbBox
        className="mb-6"
        crumbs={[{ label: 'Timetable', isActive: true }]}
      />

      <div className="bg-white rounded-xl p-6 min-h-[60vh]">
        {!isLoading && entries.length === 0 && (
          <p className={cn('text-sm text-gray6 text-center py-12', poppins_400.className)}>
            No timetable entries assigned to you yet.
          </p>
        )}

        <div className="grid grid-cols-1 lgTablet:grid-cols-5 gap-4">
          {DAYS.map((day) => (
            <div key={day}>
              <h3 className={cn('text-sm text-gray1 mb-3', Inter_500.className)}>
                {day}
              </h3>
              <div className="flex flex-col gap-2">
                {byDay(day).map((entry) => {
                  const subjectName =
                    typeof entry.subject === 'object'
                      ? entry.subject.name
                      : entry.subject;
                  const className =
                    typeof entry.classGradeId === 'object'
                      ? entry.classGradeId.name
                      : '';
                  return (
                    <div
                      key={entry._id}
                      className="border border-gray4 rounded-lg p-3"
                    >
                      <p className={cn('text-xs text-gray6', poppins_400.className)}>
                        Period {entry.period}
                      </p>
                      <p className={cn('text-sm text-gray1', Inter_500.className)}>
                        {subjectName}
                      </p>
                      {className && (
                        <p className={cn('text-xs text-gray6', poppins_400.className)}>
                          {className}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherTimetablePage;
