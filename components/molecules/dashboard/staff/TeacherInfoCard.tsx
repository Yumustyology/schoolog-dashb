import { biology1 } from '@/app/assets';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import {
  openSuspendTeacherModal,
  openTerminateTeacherModal,
} from '@/app/lib/entities/staff.entity';
import {
  openMoveModal,
  openSuspendStudentModal,
} from '@/app/lib/entities/student.entity';
import { cn } from '@/app/lib/utils';
import { SingleInfo } from '@/components/atoms/DetailsInformation/SingleInfo';
import { SuspendTeacherModal } from '@/components/atoms/dashboard/staff/modal/SuspendTeacherModal';
import { TerminateTeacherModal } from '@/components/atoms/dashboard/staff/modal/TerminateTeacherModal';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import Button from '@/components/atoms/form/Button';
import { OptionIcon, SuspendIcon } from '@/components/atoms/icons/Icons';
import Message from '@/components/atoms/icons/SideBar/Message';
import CancelIcon from '@/components/atoms/icons/dashboard/CancelIcon';
import Image from 'next/image';
import React from 'react';

const menuItems = [
  {
    label: 'Suspend',
    onClick: () => {
      openSuspendTeacherModal;
      console.log('clicked');
    },
    icon: <SuspendIcon />,
  },
  {
    label: 'Terminated',
    onClick: () => {
      openTerminateTeacherModal;
    },
    icon: <CancelIcon />,
    danger: true,
  },
];

export const TeacherInfoCard = () => {
  return (
    <div className="bg-white py-6 h-[390px] pb-10 px-6 rounded-md col-span-2 border-none">
      <div className=" flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src={biology1} alt="Student_Image" />
          <div>
            <h1 className={cn('text-sm text-black1', poppins_500.className)}>
              Muhammad Jamiu
            </h1>
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              Mathematics teacher
            </p>
          </div>
        </div>

        <div className="bg-light text-primary rounded-full py-1 px-6">
          Active
        </div>
      </div>

      <SingleInfo
        leftText="Teacher ID"
        leftValue="172928739HD"
        rightText="Date of birth"
        rightValue="March 15, 2010"
      />
      <SingleInfo
        leftText="Assigned class"
        leftValue="SS1"
        rightText="Role"
        rightValue="Head of mathematics"
      />
      <SingleInfo
        leftText="Gender"
        leftValue="Male"
        rightText="Date joined"
        rightValue="12/2/2024"
      />

      <div className="flex gap-3 items-center mt-4">
        <Button
          wide
          round
          className="h-[45px] bg-light"
          onClick={openTerminateTeacherModal}
        >
          <Message color="#21B55A" />
          <p
            className={cn('ml-2 text-primary text-base', poppins_500.className)}
          >
            Message
          </p>
        </Button>

        <MenuLists
          label="Options"
          items={menuItems}
          placement="bottom-start"
          maxHeight="150px"
          icon={<RoundedOptionIcon />}
        />
      </div>
      <SuspendTeacherModal />
      <TerminateTeacherModal />
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
