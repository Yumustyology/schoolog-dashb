import { biology1 } from '@/app/assets';
import {
  Inter_500,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import {
  openMoveModal,
  openSuspendStudentModal,
} from '@/app/lib/entities/student.entity';
import { cn } from '@/app/lib/utils';
import { SingleInfo } from '@/components/atoms/DetailsInformation/SingleInfo';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import { MoveStudentModal } from '@/components/atoms/dashboard/students/modals/MoveStudentModal';
import { SuspendStudentModal } from '@/components/atoms/dashboard/students/modals/SuspendStudentModal';
import Button from '@/components/atoms/form/Button';
import {
  DeleteIcon,
  DeleteModalIcon,
  EditIcon,
  GraduateIcon,
  OptionIcon,
  PromoteIcon,
  SuspendIcon,
} from '@/components/atoms/icons/Icons';
import Message from '@/components/atoms/icons/SideBar/Message';
import CancelIcon from '@/components/atoms/icons/dashboard/CancelIcon';
import Image from 'next/image';
import React from 'react';

export const EventDetailCard = () => {
  return (
    <div className="bg-white py-6 h-[390px] pb-10 px-6 rounded-md col-span-2 border-none">
      <div className=" flex gap-3 items-center">
        <Image src={biology1} alt="Student_Image" />
        <div>
          <div>
            <h1 className={cn('text-sm text-black1', poppins_500.className)}>
              End of the year party celebration
            </h1>
            <p className={cn('text-sm text-gray', poppins_400.className)}>
              SS1, SS2, SS3
            </p>
          </div>
        </div>
      </div>

      <SingleInfo
        leftText="Category"
        leftValue="Activity"
        rightText="Total registered"
        rightValue="82"
      />
      <SingleInfo
        leftText="Date"
        leftValue="March 15, 2025   "
        rightText="Created on"
        rightValue="9/6/2025"
      />
      <SingleInfo
        leftText="Location"
        leftValue="Unilorin Zoo, Ilorin, Kwara."
        rightText="Price tag"
        rightValue="free"
      />

      <div className="flex justify-between items-center mt-4">
        <Button round className="h-[45px]  py-3 px-8 flex gap-2 flex-1 w-full">
          {' '}
          <EditIcon color="#FFFFFF" />
          <span className={cn('text-base ', Inter_500.className)}>
            {' '}
            Edit Details
          </span>
        </Button>
        <Button
          round
          className="h-[45px]  py-3 px-8 flex gap-2 flex-1 bg-r bg-opacity-10 w-full"
        >
          {' '}
          <DeleteIcon />
          <span className={cn('text-base text-r ', Inter_500.className)}>
            {' '}
            Delete
          </span>
        </Button>
      </div>
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
