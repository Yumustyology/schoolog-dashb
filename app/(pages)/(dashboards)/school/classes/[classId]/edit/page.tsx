'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import Image from 'next/image';
import FormSectionHeader from '@/components/molecules/dashboard/subjects/CreateSubject/FormSectionHeader';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import TeacherSearchSelect from '@/components/molecules/dashboard/classes/TeacherSearchSelect';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import showToast from '@/app/lib/utils/toast';
import type { ClassGradeDetail } from '@/app/lib/types/class.types';
import { RemoveChipIcon } from '@/components/atoms/icons/Icons';

type Params = { params: { classId: string } | Promise<{ classId: string }> };

type TeacherOption = { id: string; name: string };

export default function EditClassPage({ params }: Params) {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolvedParams = (React as any).use ? (React as any).use(params) : (params as any);
  const classId = resolvedParams?.classId as string | undefined;
  const router = useRouter();

  const { data: resp } = useSWR<ClassGradeDetail | undefined>(
    classId ? ['class-grade-detail', classId] : null,
    () => classGradeActions.fetchClassGradeById(classId!).then((r) => r?.data?.data)
  );

  const [className, setClassName] = useState<string>('');
  const [selectedTeachers, setSelectedTeachers] = useState<TeacherOption[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (resp) {
      setClassName(resp.classGrade?.name || '');
      const teacher = resp.classGrade?.classTeacher
        ? { id: resp.classGrade.classTeacher._id, name: `${resp.classGrade.classTeacher.firstName || ''} ${resp.classGrade.classTeacher.lastName || ''}`.trim() }
        : null;
      setSelectedTeachers(teacher ? [teacher] : []);
    }
  }, [resp]);

  const handleSubmit = async () => {
    if (!classId) {
      showToast('Missing class id', 'class-id-missing', { type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      const payload: { name: string; classTeacher: string | null } = {
        name: className,
        classTeacher: selectedTeachers.length > 0 ? selectedTeachers[0].id : null,
      };

      await classGradeActions.updateClassGrade(classId, payload);
      showToast('Class updated', 'class-updated', { type: 'success' });
      router.push(`/school/classes/${classId}`);
    } catch (err) {
      console.error(err);
      showToast('Failed to update class', 'class-update-error', { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-10 min-h-[80dvh] bg-white flex flex-col justify-between rounded-lg">
      <div>
        <FormSectionHeader
          className="mt-0"
          title="Edit class details"
          description="Input the details of the class you want to edit"
        />

        <Input
          id="class-name"
          label="Class name"
          type="text"
          placeholder="input the class name"
          value={className}
          handleChange={(e) => setClassName(e.target.value)}
          className="mb-4"
        />

        <div className="mb-4">
          <label className={cn('block text-left w-full font-nunito text-base mb-3', poppins_400.className)}>Assigned class teachers</label>
          <div className="w-full">
            <TeacherSearchSelect value={selectedTeachers} onChange={setSelectedTeachers} />
          </div>

          <div className="mt-3 flex flex-col px-3 max-h-[55px] gap-3">
            {selectedTeachers.map((t) => (
              <div key={t.id} className="flex items-center justify-between bg-white border border-gray-line px-4 py-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <Image src="/assets/images/avatar.png" alt={t.name} width={36} height={36} className="rounded-full" />
                  <div>
                    <div className={cn('text-sm text-[#111827]', poppins_400.className)}>{t.name}</div>
                    <div className={cn('text-xs text-gray-500', poppins_400.className)}>Assigned to class</div>
                  </div>
                </div>
                <button onClick={() => setSelectedTeachers(selectedTeachers.filter((s) => s.id !== t.id))} className="p-2 rounded-full bg-white border border-[#F8D6D6]">
                  <RemoveChipIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-6 mt-8">
        <Button
          round
          loading={submitting}
          onClick={handleSubmit}
          disabled={submitting}
          className="w-[120px] h-[40px] bg-primary text-white"
        >
          {submitting ? 'Updating...' : 'Save'}
        </Button>
      </div>
    </div>
  );
}
