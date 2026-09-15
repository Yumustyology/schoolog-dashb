'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
import scoresActions, { CaEntry } from '@/app/lib/actions/scores.action';
import showToast from '@/app/lib/utils/toast';
import { AdditionIcon, DeleteIcon } from '@/components/atoms/icons/Icons';

type Student = { _id: string; firstName: string; lastName: string };
type Subject = {
  _id: string;
  name: string;
  classGradeIds?: (string | { _id: string })[];
};

type CaTest = { label: string; maxScore: number };
type EntryState = { caScores: string[]; examScore: string; bonusMarks: string };

const calculateGrade = (percentage: number): string => {
  if (percentage >= 70) return 'A';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 45) return 'D';
  if (percentage >= 40) return 'E';
  return 'F';
};

const TeacherGradebookPage = () => {
  const searchParams = useSearchParams();
  const [classGradeId, setClassGradeId] = useState(
    searchParams.get('classGradeId') || ''
  );
  const [subjectId, setSubjectId] = useState(
    searchParams.get('subjectId') || ''
  );
  const [caTests, setCaTests] = useState<CaTest[]>([{ label: 'CA1', maxScore: 20 }]);
  const [examMaxScore, setExamMaxScore] = useState(60);
  const [entries, setEntries] = useState<Record<string, EntryState>>({});
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
    if (existing.length === 0) return;

    // Reuse the CA structure/exam max from whatever was last saved for this
    // class + subject, so reopening the gradebook doesn't reset it.
    const sample = existing[0];
    if (sample.caScores?.length) {
      setCaTests(sample.caScores.map((c) => ({ label: c.label, maxScore: c.maxScore })));
    }
    setExamMaxScore(sample.examMaxScore ?? 60);

    const map: Record<string, EntryState> = {};
    existing.forEach((s) => {
      const sid = typeof s.studentId === 'object' ? s.studentId._id : s.studentId;
      map[sid] = {
        caScores: (s.caScores || []).map((c) => String(c.score)),
        examScore: String(s.examScore ?? ''),
        bonusMarks: String(s.bonusMarks ?? ''),
      };
    });
    setEntries(map);
  }, [existingScoresResp]);

  const getEntry = (studentId: string): EntryState =>
    entries[studentId] || {
      caScores: caTests.map(() => ''),
      examScore: '',
      bonusMarks: '',
    };

  const updateCaScore = (studentId: string, index: number, value: string) => {
    setEntries((prev) => {
      const entry = getEntry(studentId);
      const caScores = [...entry.caScores];
      caScores[index] = value;
      return { ...prev, [studentId]: { ...entry, caScores } };
    });
  };

  const updateField = (studentId: string, field: 'examScore' | 'bonusMarks', value: string) => {
    setEntries((prev) => ({ ...prev, [studentId]: { ...getEntry(studentId), [field]: value } }));
  };

  const addCaTest = () => {
    setCaTests((prev) => [...prev, { label: `CA${prev.length + 1}`, maxScore: 20 }]);
  };

  const removeCaTest = (index: number) => {
    if (caTests.length <= 1) return;
    setCaTests((prev) => prev.filter((_, i) => i !== index));
    setEntries((prev) => {
      const next: Record<string, EntryState> = {};
      for (const [sid, entry] of Object.entries(prev)) {
        next[sid] = { ...entry, caScores: entry.caScores.filter((_, i) => i !== index) };
      }
      return next;
    });
  };

  const updateCaTest = (index: number, field: 'label' | 'maxScore', value: string) => {
    setCaTests((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, [field]: field === 'maxScore' ? Number(value) || 0 : value } : t
      )
    );
  };

  const caMaxTotal = useMemo(() => caTests.reduce((sum, t) => sum + t.maxScore, 0), [caTests]);
  const overallMax = caMaxTotal + examMaxScore;

  const computeRowTotal = (studentId: string) => {
    const entry = getEntry(studentId);
    const caTotal = entry.caScores.reduce((sum, v) => sum + (Number(v) || 0), 0);
    const exam = Number(entry.examScore) || 0;
    const bonus = Number(entry.bonusMarks) || 0;
    const total = caTotal + exam + bonus;
    const percentage = overallMax > 0 ? (total / overallMax) * 100 : 0;
    return { total, percentage, grade: calculateGrade(percentage) };
  };

  const handleSave = async () => {
    if (!classGradeId || !subjectId) return;
    const entryPayloads = students
      .filter((s) => entries[s._id])
      .map((s) => {
        const entry = getEntry(s._id);
        const caScores: CaEntry[] = caTests.map((t, i) => ({
          label: t.label,
          maxScore: t.maxScore,
          score: Number(entry.caScores[i]) || 0,
        }));
        return {
          studentId: s._id,
          caScores,
          examScore: Number(entry.examScore) || 0,
          bonusMarks: Number(entry.bonusMarks) || 0,
        };
      });
    if (entryPayloads.length === 0) {
      showToast('Enter at least one score first', 'no-scores', { type: 'error' });
      return;
    }

    setSaving(true);
    try {
      await scoresActions.bulkUpsertScores({
        classGradeId,
        subjectId,
        examMaxScore,
        entries: entryPayloads,
      });
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
            triggerClasses="rounded-full h-11 bg-[#F7F7F7] border-gray4"
          />
          <SelectComp
            label="Subject"
            htmlFor="subjectId"
            value={subjectId}
            onValueChange={setSubjectId}
            placeholder="Select a subject"
            options={subjectOptions}
            triggerClasses="rounded-full h-11 bg-[#F7F7F7] border-gray4"
          />
          <Button
            round
            className="h-11 px-6"
            onClick={handleSave}
            loading={saving}
            disabled={saving || !classGradeId || !subjectId}
          >
            Save scores
          </Button>
        </div>

        {/* CA test structure editor */}
        <div className="mb-6 p-4 bg-[#FAFAFA] rounded-lg">
          <p className={cn('text-xs text-gray6 mb-3', poppins_400.className)}>
            Continuous assessment structure (out of {caMaxTotal} + exam /{examMaxScore} = /{overallMax})
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            {caTests.map((test, i) => (
              <div key={i} className="flex items-center gap-1 bg-white border border-gray4 rounded-full px-3 py-1.5">
                <input
                  value={test.label}
                  onChange={(e) => updateCaTest(i, 'label', e.target.value)}
                  className="w-14 text-xs text-center outline-none"
                />
                <span className="text-xs text-gray6">/</span>
                <input
                  type="number"
                  value={test.maxScore}
                  onChange={(e) => updateCaTest(i, 'maxScore', e.target.value)}
                  className="w-12 text-xs text-center outline-none"
                />
                {caTests.length > 1 && (
                  <button type="button" onClick={() => removeCaTest(i)} className="ml-1">
                    <DeleteIcon size={12} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCaTest}
              className="flex items-center gap-1 text-xs text-primary"
            >
              <AdditionIcon size={12} /> Add CA test
            </button>

            <div className="flex items-center gap-2 ml-4">
              <span className={cn('text-xs text-gray6', poppins_400.className)}>Exam max</span>
              <input
                type="number"
                value={examMaxScore}
                onChange={(e) => setExamMaxScore(Number(e.target.value) || 0)}
                className="w-16 text-xs text-center border border-gray4 rounded-full px-2 py-1.5"
              />
            </div>
          </div>
        </div>

        {classGradeId && subjectId && students.length === 0 && (
          <p className={cn('text-sm text-gray6', poppins_400.className)}>
            No students in this class.
          </p>
        )}

        {students.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={cn('text-left text-gray6 text-xs', Inter_500.className)}>
                  <th className="py-2 pr-3">Student</th>
                  {caTests.map((t, i) => (
                    <th key={i} className="py-2 px-2 text-center">{t.label}</th>
                  ))}
                  <th className="py-2 px-2 text-center">Exam</th>
                  <th className="py-2 px-2 text-center">Bonus</th>
                  <th className="py-2 px-2 text-center">Total</th>
                  <th className="py-2 px-2 text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const entry = getEntry(s._id);
                  const { total, grade } = computeRowTotal(s._id);
                  return (
                    <tr key={s._id} className="border-t border-gray4">
                      <td className={cn('py-2 pr-3 text-gray1', Inter_500.className)}>
                        {s.firstName} {s.lastName}
                      </td>
                      {caTests.map((t, i) => (
                        <td key={i} className="py-2 px-2">
                          <input
                            type="number"
                            min={0}
                            max={t.maxScore}
                            value={entry.caScores[i] ?? ''}
                            onChange={(e) => updateCaScore(s._id, i, e.target.value)}
                            className="w-16 h-9 rounded-lg border border-gray4 px-2 text-sm text-center"
                          />
                        </td>
                      ))}
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          min={0}
                          max={examMaxScore}
                          value={entry.examScore}
                          onChange={(e) => updateField(s._id, 'examScore', e.target.value)}
                          className="w-16 h-9 rounded-lg border border-gray4 px-2 text-sm text-center"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number"
                          min={0}
                          value={entry.bonusMarks}
                          onChange={(e) => updateField(s._id, 'bonusMarks', e.target.value)}
                          className="w-16 h-9 rounded-lg border border-gray4 px-2 text-sm text-center"
                        />
                      </td>
                      <td className={cn('py-2 px-2 text-center', Inter_500.className)}>
                        {total}/{overallMax}
                      </td>
                      <td className="py-2 px-2 text-center">
                        <span
                          className={cn(
                            'px-2.5 py-1 rounded-full text-xs',
                            Inter_500.className,
                            grade === 'A' || grade === 'B'
                              ? 'text-primary bg-primary1'
                              : grade === 'F'
                                ? 'text-[#EB5757] bg-[#EB575714]'
                                : 'text-[#F2994A] bg-[#F2994A14]'
                          )}
                        >
                          {grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherGradebookPage;
