'use client';

import React, { useState } from 'react';
import Image from 'next/image';
// import ProgressPageNumber from '@/components/molecules/auth/PageNumber';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import TeacherSearchSelect from '@/components/molecules/dashboard/classes/TeacherSearchSelect';
import { createClass as createClassApi, CreateClassPayload } from '@/app/lib/entities/class.entity';
import showToast from '@/app/lib/utils/toast';
import { useRouter } from 'next/navigation';
import FormSectionHeader from '@/components/molecules/dashboard/subjects/CreateSubject/FormSectionHeader';
// import { SelectClassGrade } from '@/components/atoms/dashboard/materials/SelectClassGrade';

export default function CreateClassPage() {
  const router = useRouter();
  const [className, setClassName] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState<{ id: string; name: string }[]>([]);
  // nextGrade removed — payload will send null for nextGrade and level
  const [submitting, setSubmitting] = useState(false);

  

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // nextGrade and level are intentionally null for now
      const payload: CreateClassPayload = {
        name: className,
        nextGrade: null,
        level: null,
        // send null when no teacher selected per current API requirement
        classTeacher: selectedTeachers.length > 0 ? selectedTeachers[0].id : null,
      };

      const result = await createClassApi(payload);
      console.log('Create class payload', payload, 'result', result);

      // Show success toast using backend message and payload data
  const maybeResult = result as { message?: string } | undefined;
  const backendMessage = maybeResult?.message ?? 'Class grade successfully created';
  showToast(String(backendMessage), 'class-created', { type: 'success' });

      // Redirect to classes listing page
      router.push('/school/classes');

      // fake delay
    //   await new Promise((r) => setTimeout(r, 500));

  // reset
  setClassName('');
  setSelectedTeachers([]);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-10 min-h-[80dvh] bg-white flex flex-col justify-between rounded-lg">
      <div className="">
        <div>
          <div className="">
            <FormSectionHeader className='mt-0  ' title="Class details" description="Input the details of the class you want to create" />

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
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="#E05454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L18 18" stroke="#E05454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

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
          {submitting ? 'Submitting...' : 'Proceed'}
        </Button>
      </div>
    </div>
  );
}
