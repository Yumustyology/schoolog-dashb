import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import type { StaffListItem } from '@/app/lib/actions/staff.action';
import React from 'react';

type TeacherOthersInfoCardProps = {
  staff: StaffListItem;
};

export const TeacherOthersInfoCard = ({ staff }: TeacherOthersInfoCardProps) => {
  const classes = staff.classes || [];

  return (
    <div className="bg-white py-6 px-6 flex flex-col h-[390px] rounded-md col-span-2 border-none overflow-hidden">
      <h4 className={cn('text-lg text-black1', poppins_500.className)}>
        Class assignments
      </h4>

      {classes.length === 0 ? (
        <p className={cn('text-sm text-gray mt-6', poppins_400.className)}>
          No classes assigned yet.
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-3 overflow-y-auto">
          {classes.map((c, idx) => {
            const className =
              typeof c.classGradeId === 'object' ? c.classGradeId.name : c.classGradeId;
            return (
              <div
                key={idx}
                className="flex justify-between items-center border-b border-gray4 pb-3"
              >
                <p className={cn('text-sm text-black1', poppins_500.className)}>
                  {className}
                </p>
                <p className={cn('text-sm text-gray', poppins_400.className)}>
                  {c.isClassTeacher ? 'Class teacher' : 'Subject teacher'}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
