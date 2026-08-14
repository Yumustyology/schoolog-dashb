'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/app/lib/utils';
import { Inter_500 } from '@/app/lib/config/font.config';
import showToast from '@/app/lib/utils/toast';
import {
  GuardianForm,
  type GuardianFormValues,
} from '@/components/atoms/dashboard/parents/GuardianForm';
import { createGuardian } from '@/app/lib/actions/guardian.actions';

export default function AddGuardianPage() {
  const router = useRouter();

  const handleSubmit = async (values: GuardianFormValues) => {
    await createGuardian(values);
    showToast('Guardian created successfully', 'guardian-create-success', {
      type: 'success',
    });
    router.push('/school/parents');
  };

  return (
    <div className="min-h-[80dvh] bg-white flex flex-col justify-between rounded-lg p-10">
      <div className="w-full">
        <h2 className={cn('text-center text-lg mb-6', Inter_500.className)}>
          Input the details of the guardian you want to add
        </h2>
        <GuardianForm submitLabel="Save change" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
