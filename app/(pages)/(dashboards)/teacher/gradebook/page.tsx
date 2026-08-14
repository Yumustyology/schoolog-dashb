'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import SelectComp from '@/components/atoms/form/Select';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import staffActions from '@/app/lib/actions/staff.action';
import studentActions from '@/app/lib/actions/student.actions';
import { getSchoolSubjects } from '@/app/lib/actions/subjects.action';
import scoresActions from '@/app/lib/actions/scores.action';
import showToast from '@/app/lib/utils/toast';

type Student = { _id: string; firstName: string; lastName: string };
type Subject = {
  _id: string;
  name: string;
  classGradeIds?: (string | { _id: string })[];
};

const TeacherGradebookPage = () => {
  const searchParams = useSearchParams();
  const [classGradeId, setClassGradeId] = useState(
    searchParams.get('classGradeId') || ''
  );
  const [subjectId, setSubjectId] = useState(
    searchParams.get('subjectId') || ''
  );
  const [scores, setScores] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const { data: profileResp } = useSWR(['staff-me'], () =>
    staffActions.fetchMyStaffProfile()
  );
  const classOptions = (profileResp?.data?.classes || [])
    .map((c) => (typeof c.classGradeId === 'object' ? c.classGradeId : null))
    .filter((c): c is { _id: string; name: string } => !!c)
    .map((c) => ({ id: c._id, name: c.name }));

  useEffect(() => {
    if (!classGradeId && classOptions.length > 0) {
      setClassGradeId(classOptions[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classOptions.length]);

  const { data: subjectsResp } = useSWR(['school-subjects'], () =>
    getSchoolSubjects()
  );
  const subjectOptions = ((subjectsResp?.data || []) as unknown as Subject[])
    .filter((s) =>
      s.classGradeIds?.some((c) =>
        typeof c === 'string' ? c === classGradeId : c._id === classGradeId
      )
    )
    .map((s) => ({ id: s._id, name: s.name }));

  useEffect(() => {
    if (subjectOptions.length > 0 && !subjectOptions.some((s) => s.id === subjectId)) {
      setSubjectId(subjectOptions[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classGradeId, subjectOptions.length]);

  const { data: studentsResp } = useSWR(
    classGradeId ? ['class-students', classGradeId] : null,
    () => studentActions.fetchStudents({ classGradeId, limit: 100 })
  );
  const students = (studentsResp?.data || []) as unknown as Student[];

  const { data: existingScoresResp } = useSWR(
    classGradeId && subjectId ? ['scores', classGradeId, subjectId] : null,
    () => scoresActions.fetchScores(classGradeId, subjectId)
  );

  useEffect(() => {
    const existing = existingScoresResp?.data || [];
    const map: Record<string, string> = {};
    existing.forEach((s) => {
      const sid = typeof s.studentId === 'object' ? s.studentId._id : s.studentId;
      map[sid] = String(s.score);
    });
    setScores(map);
  }, [existingScoresResp]);

  const handleSave = async () => {
    if (!classGradeId || !subjectId) return;
    const entries = students
      .filter((s) => scores[s._id] !== undefined && scores[s._id] !== '')
      .map((s) => ({ studentId: s._id, score: Number(scores[s._id]) }));
    if (entries.length === 0) return;

    setSaving(true);
    try {
      await scoresActions.bulkUpsertScores({ classGradeId, subjectId, entries });
      showToast('Scores saved', 'scores-saved', { type: 'success' });
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <BreadcrumbBox
        className="mb-6"
        crumbs={[{ label: 'Gradebook', isActive: true }]}
      />

      <div className="bg-white rounded-xl p-6 min-h-[60vh]">
        <div className="flex gap-4 mb-6 items-end">
          <SelectComp
            label="Class"
            htmlFor="classGradeId"
            value={classGradeId}
            onValueChange={setClassGradeId}
            placeholder="Select a class"
            options={classOptions}
          />
          <SelectComp
            label="Subject"
            htmlFor="subjectId"
            value={subjectId}
            onValueChange={setSubjectId}
            placeholder="Select a subject"
            options={subjectOptions}
          />
          <Button
            round
            className="h-[44px] px-6"
            onClick={handleSave}
            loading={saving}
            disabled={saving || !classGradeId || !subjectId}
          >
            Save scores
          </Button>
        </div>

        {classGradeId && subjectId && students.length === 0 && (
          <p className={cn('text-sm text-gray6', poppins_400.className)}>
            No students in this class.
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
              <input
                type="number"
                min={0}
                max={1000}
                placeholder="Score"
                value={scores[s._id] ?? ''}
                onChange={(e) =>
                  setScores((prev) => ({ ...prev, [s._id]: e.target.value }))
                }
                className="w-24 h-10 rounded-lg border border-gray4 px-3 text-sm text-right"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherGradebookPage;
