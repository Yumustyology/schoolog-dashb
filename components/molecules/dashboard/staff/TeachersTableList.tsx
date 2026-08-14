'use client';
import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import Empty from '../../empty/Empty';
import {
  NoTeacherIcon,
  SuspendIcon,
  ViewProfileEyeIcon,
} from '@/components/atoms/icons/Icons';
import Message from '@/components/atoms/icons/SideBar/Message';
import CancelIcon from '@/components/atoms/icons/dashboard/CancelIcon';
import { teacherImg2 } from '@/app/assets';
import Image from 'next/image';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import DataTable from '@/components/molecules/DataTable';

type ParentsListType = {
  name: string;
  img: string;
  assignedSujects: string;
  attendance: number;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Suspended' | 'Terminated';
}[];

const columnHelper = createColumnHelper<ParentsListType[number]>();

function TeachersTableLists() {
  const teachersList: ParentsListType = [
    {
      name: 'Muhammad Jamui',
      img: '',
      assignedSujects: 'Mathematics SSS1, SSS2',
      attendance: 78,
      phoneNumber: '08065095692',
      dateJoined: 'Tue 28th June',
      status: 'Active',
    },
    {
      name: 'Muhammad Jamui',
      img: '',
      assignedSujects: 'Mathematics SSS1, SSS2',
      attendance: 78,
      phoneNumber: '08065095692',
      dateJoined: 'Tue 28th June',
      status: 'Terminated',
    },
  ];

  const menuItems = [
    {
      label: 'View Profile',
      onClick: () => console.log('Profile clicked'),
      icon: <ViewProfileEyeIcon />,
    },
    {
      label: 'Message',
      onClick: () => console.log('Settings clicked'),
      icon: <Message size="24" />,
    },
    {
      label: 'Suspend',
      onClick: () => console.log('More clicked'),
      icon: <SuspendIcon />,
    },
    {
      label: 'Withdraw',
      onClick: () => console.log('Another clicked'),
      icon: <CancelIcon />,
      danger: true,
    },
  ];

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => (
        <div className="flex gap-2 items-center text-sm">
          <Image src={teacherImg2} alt="teacher-image" width={25} height={25} />
          {info.getValue()}
        </div>
      ),
      meta: { useTypography: false },
    }),
    columnHelper.accessor('assignedSujects', {
      header: 'Assigned subject',
    }),
    columnHelper.accessor('phoneNumber', {
      header: 'Phone number',
    }),
    columnHelper.accessor('attendance', {
      header: 'Attendance',
      cell: (info) => `${info.getValue()}%`,
    }),
    columnHelper.accessor('dateJoined', {
      header: 'Date joined',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        return (
          <div
            className={cn(
              'font-normal rounded-full py-2 px-2 text-sm text-center',
              status === 'Active'
                ? 'text-primary bg-primary1'
                : status === 'Suspended'
                  ? 'text-[#F2994A] bg-[#F2994A14]'
                  : status === 'Terminated'
                    ? 'text-[#EB5757] bg-[#EB575714]'
                    : 'text-gray-500 bg-gray-100'
            )}
          >
            {status}
          </div>
        );
      },
      meta: { useTypography: false },
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: () => (
        <MenuLists
          label="Options"
          items={menuItems}
          placement="bottom-start"
          maxHeight="150px"
        />
      ),
    }),
  ];

  return (
    <div className="my-8 ">
      {teachersList.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <Empty
            icon={<NoTeacherIcon />}
            title="No staff added yet"
            description="You have not yet added any staff. Cleck the button bellow tro add a staff"
            buttonText="+ Add staff"
          />
        </div>
      ) : (
        <DataTable
          data={teachersList}
          columns={columns}
          isLoading={false}
          theadClassName={cn('bg-[#FBFBFB] border-none text-gray text-sm', poppins_400.className)}
          tdClassName="p-4"
          rowClassName={cn('border-b border-gray4 text-gray1 text-sm items-center', poppins_400.className)}
          tableClassName="border-none bg-white w-full caption-bottom text-sm"
          useCardWrapper={false}
          wrapCellsInTypography={false}
          wrapHeadersInTypography={false}
          enableSorting={false}
          enableFiltering={false}
        />
      )}
    </div>
  );
}

export default TeachersTableLists;
