import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import type { StaffListItem } from '@/app/lib/actions/staff.action';
import React from 'react';

type NonTeachingOtherInfoCardProps = {
  staff: StaffListItem;
};

export const NonTeachingStaffOthersInfoCard = ({
  staff,
}: NonTeachingOtherInfoCardProps) => {
  return (
    <div className="bg-white py-6 px-6 flex flex-col h-[390px] rounded-md col-span-2 border-none">
      <h4 className={cn('text-lg text-black1', poppins_500.className)}>
        Other info
      </h4>

      <p className={cn('text-sm text-gray mt-6', poppins_400.className)}>
        {staff.isTeachingStaff
          ? 'This staff member is also marked as teaching staff.'
          : 'No additional details are recorded for non-teaching staff yet.'}
      </p>
    </div>
  );
};
