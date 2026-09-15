import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import {
  openSuspendTeacherModal,
  openTerminateTeacherModal,
} from '@/app/lib/entities/staff.entity';
import { cn } from '@/app/lib/utils';
import { SingleInfo } from '@/components/atoms/DetailsInformation/SingleInfo';
import { SuspendTeacherModal } from '@/components/atoms/dashboard/staff/modal/SuspendTeacherModal';
import { TerminateTeacherModal } from '@/components/atoms/dashboard/staff/modal/TerminateTeacherModal';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import { OptionIcon, SuspendIcon } from '@/components/atoms/icons/Icons';
import CancelIcon from '@/components/atoms/icons/dashboard/CancelIcon';
import { formatDate } from '@/app/lib/utils/dateUtils';
import type { StaffListItem } from '@/app/lib/actions/staff.action';
import React from 'react';

type NonTeachingStaffInfoCardProps = {
  staff: StaffListItem;
  onStatusChanged?: () => void;
};

const statusStyles: Record<string, string> = {
  active: 'bg-light text-primary',
  suspended: 'bg-[#F2994A14] text-[#F2994A]',
  terminated: 'bg-[#EB575714] text-[#EB5757]',
};

export const NonTeachingStaffInfoCard = ({
  staff,
  onStatusChanged,
}: NonTeachingStaffInfoCardProps) => {
  const name = `${staff.firstName} ${staff.lastName}`.trim();

  const menuItems = [
    {
      label: 'Suspend',
      onClick: openSuspendTeacherModal,
      icon: <SuspendIcon />,
    },
    {
      label: 'Terminate',
      onClick: openTerminateTeacherModal,
      icon: <CancelIcon />,
      danger: true,
    },
  ];

  return (
    <div className="bg-white py-6 h-[390px] pb-10 px-6 rounded-md col-span-2 border-none">
      <div className=" flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div>
            <h1 className={cn('text-sm text-black1', poppins_500.className)}>
              {name}
            </h1>
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              Non-teaching staff
            </p>
          </div>
        </div>

        <div
          className={cn(
            'rounded-full py-1 px-6 capitalize',
            statusStyles[staff.status] || 'bg-gray-100 text-gray-500'
          )}
        >
          {staff.status}
        </div>
      </div>

      <SingleInfo
        leftText="Staff ID"
        leftValue={staff.staffSlugId || '-'}
        rightText="Phone"
        rightValue={staff.phone || '-'}
      />
      <SingleInfo
        leftText="Email"
        leftValue={staff.email}
        rightText="Date joined"
        rightValue={staff.createdAt ? formatDate(staff.createdAt) : '-'}
      />

      <div className="flex gap-3 items-center mt-20">
        <MenuLists
          label="Options"
          items={menuItems}
          placement="bottom-start"
          maxHeight="150px"
          icon={<RoundedOptionIcon />}
        />
      </div>
      <SuspendTeacherModal staffId={staff._id} onSuccess={onStatusChanged} />
      <TerminateTeacherModal staffId={staff._id} onSuccess={onStatusChanged} />
    </div>
  );
};

export const RoundedOptionIcon = () => {
  return (
    <div className="rounded-full border border-gray3 p-3 cursor-pointer">
      <OptionIcon />
    </div>
  );
};
