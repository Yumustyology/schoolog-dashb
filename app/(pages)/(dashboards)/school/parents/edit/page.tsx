import React from 'react';

import { cn } from '@/app/lib/utils';
import { Inter_500 } from '@/app/lib/config/font.config';
import { GuardianForm } from '@/components/atoms/dashboard/parents/GuardianForm';

export default function EditGuardianPage() {
  return (
    <div className="min-h-[80dvh] bg-white flex flex-col justify-between rounded-lg p-10">
      <div className="w-full">
        <h2 className={cn('text-center text-lg mb-6', Inter_500.className)}>
          Edit the details of the guardian
        </h2>
        <GuardianForm submitLabel="Save change" />
      </div>
    </div>
  );
}
