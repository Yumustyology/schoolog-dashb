import React from 'react';
import { useParams } from 'next/navigation';
import { cn } from '@/app/lib/utils';
import { Inter_500 } from '@/app/lib/config/font.config';
import { GuardianForm } from '@/components/atoms/dashboard/parents/GuardianForm';

export default function EditGuardianPage() {
  const params = useParams();
  const guardianId = params?.id;

  // TODO: Fetch guardian data by guardianId and pass as initialValues
  // const guardian = ...

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] py-8">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-xl">
        <h2 className={cn('text-center text-lg mb-6', Inter_500.className)}>
          Edit the details of the guardian
        </h2>
        <GuardianForm submitLabel="Save change" /* initialValues={guardian} */ />
      </div>
    </div>
  );
}
