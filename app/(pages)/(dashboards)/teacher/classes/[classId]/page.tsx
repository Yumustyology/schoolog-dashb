'use client';

import React from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import studentActions from '@/app/lib/actions/student.actions';
import { getSchoolSubjects } from '@/app/lib/actions/subjects.action';

type Student = {
  _id: string;
  firstName: string;
  lastName: string;
  studentSlugId: string;
  gender: string;
};

type Subject = {
  _id: string;
  name: string;
  code?: string;
  classGradeIds?: (string | { _id: string })[];
};

const ClassDetailPage = () => {
  const params = useParams<{ classId: string }>();
  const classId = params.classId;

  const { data: studentsResp, isLoading: loadingStudents } = useSWR(
    classId ? ['class-students', classId] : null,
    () => studentActions.fetchStudents({ classGradeId: classId, limit: 100 })
  );
  const students = (studentsResp?.data || []) as unknown as Student[];

  const { data: subjectsResp } = useSWR(['school-subjects'], () =>
    getSchoolSubjects()
  );
  const subjects = ((subjectsResp?.data || []) as unknown as Subject[]).filter(
    (s) =>
      s.classGradeIds?.some((c) =>
        typeof c === 'string' ? c === classId : c._id === classId
      )
  );

  return (
    <div>
      <BreadcrumbBox
        className="mb-6"
        crumbs={[
          { label: 'My Classes', href: '/teacher/classes', isActive: false },
          { label: 'Class roster', isActive: true },
        ]}
      />

      <div className="flex gap-4 mb-6">
        <Button
          to={`/teacher/attendance?classGradeId=${classId}`}
          round
          className="px-6 h-[44px]"
        >
          Take attendance
        </Button>
        {subjects[0] && (
          <Button
            to={`/teacher/gradebook?classGradeId=${classId}&subjectId=${subjects[0]._id}`}
            flat
            outlined
            round
            className="bg-transparent px-6 h-[44px]"
          >
            Open gradebook
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl p-6 mb-6">
        <h2 className={cn('text-lg text-gray1 mb-4', Inter_500.className)}>
          Subjects taught
        </h2>
        {subjects.length === 0 ? (
          <p className={cn('text-sm text-gray6', poppins_400.className)}>
            No subjects linked to this class yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => (
              <span
                key={s._id}
                className={cn(
                  'text-sm text-gray1 bg-[#F8F8F8] px-4 py-2 rounded-full',
                  poppins_400.className
                )}
              >
                {s.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-6 min-h-[40vh]">
        <h2 className={cn('text-lg text-gray1 mb-4', Inter_500.className)}>
          Students ({students.length})
        </h2>
        {!loadingStudents && students.length === 0 && (
          <p className={cn('text-sm text-gray6', poppins_400.className)}>
            No students in this class yet.
          </p>
        )}
        <div className="flex flex-col gap-2">
          {students.map((s) => (
            <div
              key={s._id}
              className="flex items-center justify-between py-3 border-b border-gray4 last:border-b-0"
            >
              <p className={cn('text-sm text-gray1', Inter_500.className)}>
                {s.firstName} {s.lastName}
              </p>
              <p className={cn('text-xs text-gray6', poppins_400.className)}>
                {s.studentSlugId}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;
