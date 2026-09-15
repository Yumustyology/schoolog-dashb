'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import SelectComp from '@/components/atoms/form/Select';
import { Inter_500, Inter_400, poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { fetchClassGradesAll } from '@/app/lib/actions/class-grade.actions';
import { getSchoolSubjects } from '@/app/lib/actions/subjects.action';
import scoresActions from '@/app/lib/actions/scores.action';

type Subject = {
  _id: string;
  name: string;
  classGradeIds?: (string | { _id: string })[];
};

const GRADE_ORDER = ['A', 'B', 'C', 'D', 'E', 'F'];
const GRADE_COLORS: Record<string, string> = {
  A: 'bg-primary text-white',
  B: 'bg-primary1 text-primary',
  C: 'bg-[#F2994A14] text-[#F2994A]',
  D: 'bg-[#F2994A14] text-[#F2994A]',
  E: 'bg-[#EB575714] text-[#EB5757]',
  F: 'bg-[#EB575714] text-[#EB5757]',
};

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#FAFAFA] rounded-lg p-4 flex-1">
    <p className={cn('text-2xl text-black1 mb-1', poppins_600.className)}>{value}</p>
    <p className={cn('text-xs text-gray6', poppins_400.className)}>{label}</p>
  </div>
);

const AdminGradebookPage = () => {
  const [classGradeId, setClassGradeId] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const { data: classesResp } = useSWR(['all-class-grades'], () => fetchClassGradesAll());
  const classOptions = (classesResp?.data || []).map((c) => ({
    id: String((c as Record<string, unknown>)._id),
    name: String((c as Record<string, unknown>).name || ''),
  }));

  useEffect(() => {
    if (!classGradeId && classOptions.length > 0) setClassGradeId(classOptions[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classOptions.length]);

  const { data: subjectsResp } = useSWR(['school-subjects'], () => getSchoolSubjects());
  const subjectOptions = ((subjectsResp?.data || []) as unknown as Subject[])
    .filter((s) =>
      s.classGradeIds?.some((c) => (typeof c === 'string' ? c === classGradeId : c._id === classGradeId))
    )
    .map((s) => ({ id: s._id, name: s.name }));

  useEffect(() => {
    if (subjectOptions.length > 0 && !subjectOptions.some((s) => s.id === subjectId)) {
      setSubjectId(subjectOptions[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classGradeId, subjectOptions.length]);

  const { data: summaryResp, isLoading } = useSWR(
    classGradeId && subjectId ? ['score-summary', classGradeId, subjectId] : null,
    () => scoresActions.fetchScoreSummary(classGradeId, subjectId)
  );
  const summary = summaryResp?.data;

  return (
    <div>
      <BreadcrumbBox className="mb-6" crumbs={[{ label: 'Gradebook', isActive: true }]} />

      <div className="bg-white rounded-xl p-6 min-h-[60vh]">
        <div className="flex gap-4 mb-6">
          <SelectComp
            label="Class"
            value={classGradeId}
            onValueChange={setClassGradeId}
            placeholder="Select a class"
            options={classOptions}
            triggerClasses="rounded-full h-11 bg-[#F7F7F7] border-gray4"
          />
          <SelectComp
            label="Subject"
            value={subjectId}
            onValueChange={setSubjectId}
            placeholder="Select a subject"
            options={subjectOptions}
            triggerClasses="rounded-full h-11 bg-[#F7F7F7] border-gray4"
          />
        </div>

        {isLoading ? (
          <p className={cn('text-sm text-gray6', poppins_400.className)}>Loading...</p>
        ) : !summary ? (
          <p className={cn('text-sm text-gray6', poppins_400.className)}>
            Select a class and subject to see gradebook completion.
          </p>
        ) : (
          <>
            <div className="flex gap-4 mb-6">
              <StatCard
                label="Scores recorded"
                value={`${summary.recordedCount}/${summary.totalStudents}`}
              />
              <StatCard label="Completion" value={`${summary.completionPercentage}%`} />
              <StatCard label="Class average" value={`${summary.averagePercentage}%`} />
            </div>

            <div className="mb-6 p-4 bg-[#FAFAFA] rounded-lg">
              <p className={cn('text-sm text-black1 mb-2', Inter_500.className)}>
                How this is calculated
              </p>
              {summary.calculation ? (
                <p className={cn('text-xs text-gray6', Inter_400.className)}>
                  {summary.calculation.caStructure
                    .map((c) => `${c.label} (/${c.maxScore})`)
                    .join(' + ')}
                  {summary.calculation.caStructure.length > 0 ? ' + ' : ''}
                  Exam (/{summary.calculation.examMaxScore}) = /{summary.calculation.totalMaxScore}
                  {' '}total. Extra marks entered by the teacher are added on top as bonus.
                </p>
              ) : (
                <p className={cn('text-xs text-gray6', Inter_400.className)}>
                  No scores recorded yet for this class and subject.
                </p>
              )}
            </div>

            <div>
              <p className={cn('text-sm text-black1 mb-3', Inter_500.className)}>
                Grade distribution
              </p>
              <div className="flex gap-3">
                {GRADE_ORDER.map((grade) => (
                  <div
                    key={grade}
                    className={cn(
                      'flex-1 rounded-lg p-4 text-center',
                      GRADE_COLORS[grade]
                    )}
                  >
                    <p className={cn('text-xl', poppins_600.className)}>
                      {summary.gradeDistribution[grade] ?? 0}
                    </p>
                    <p className={cn('text-xs', Inter_400.className)}>{grade}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminGradebookPage;
