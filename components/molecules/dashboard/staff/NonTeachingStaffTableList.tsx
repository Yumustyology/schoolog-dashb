'use client';
import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { createColumnHelper } from '@tanstack/react-table';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import Empty from '../../empty/Empty';
import {
  NoTeacherIcon,
  SuspendIcon,
  ViewProfileEyeIcon,
} from '@/components/atoms/icons/Icons';
import Message from '@/components/atoms/icons/SideBar/Message';
import CancelIcon from '@/components/atoms/icons/dashboard/CancelIcon';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import DataTable from '@/components/molecules/DataTable';
import staffActions, { StaffListItem } from '@/app/lib/actions/staff.action';
import { formatDate } from '@/app/lib/utils/dateUtils';
import showToast from '@/app/lib/utils/toast';

type StaffRow = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
};

const AVATAR_COLORS = [
  { bg: 'bg-emerald-600', text: 'text-white' },
  { bg: 'bg-indigo-600', text: 'text-white' },
  { bg: 'bg-rose-600', text: 'text-white' },
  { bg: 'bg-amber-500', text: 'text-gray-900' },
  { bg: 'bg-sky-600', text: 'text-white' },
  { bg: 'bg-violet-600', text: 'text-white' },
  { bg: 'bg-fuchsia-600', text: 'text-white' },
  { bg: 'bg-teal-600', text: 'text-white' },
];

function getAvatarColor(s: string) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?';
  return `${parts[0][0] || ''}${parts[parts.length - 1][0] || ''}`.toUpperCase();
}

const statusStyles: Record<string, string> = {
  active: 'text-primary bg-primary1',
  suspended: 'text-[#F2994A] bg-[#F2994A14]',
  terminated: 'text-[#EB5757] bg-[#EB575714]',
  expelled: 'text-[#EB5757] bg-[#EB575714]',
  withdrawn: 'text-[#EB5757] bg-[#EB575714]',
};

const columnHelper = createColumnHelper<StaffRow>();

function NonTeachingStaffTableLists() {
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR('/staff', () =>
    staffActions.fetchSchoolStaff()
  );

  const staffList: StaffRow[] = React.useMemo(() => {
    const staff: StaffListItem[] = data?.data || [];
    return staff
      .filter((s) => !s.isTeachingStaff)
      .map((s) => ({
        _id: s._id,
        name: `${s.firstName} ${s.lastName}`.trim(),
        email: s.email,
        phoneNumber: s.phone,
        dateJoined: s.createdAt ? formatDate(s.createdAt) : '-',
        status: s.status,
      }));
  }, [data]);

  const notYetAvailable = (label: string) => () =>
    showToast(`${label} isn't available yet`, `nt-staff-${label.toLowerCase()}-soon`, {
      type: 'info',
    });

  const changeStatus = (id: string, status: string, successMessage: string) => async () => {
    try {
      await staffActions.updateStaffStatus(id, status);
      showToast(successMessage, `nt-staff-status-${id}`, { type: 'success' });
      mutate();
    } catch {
      // handleRequest already surfaces a toast for API errors
    }
  };

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => {
        const name = info.getValue();
        const color = getAvatarColor(name);
        return (
          <div className="flex gap-2 items-center text-sm">
            <div
              className={cn(
                'h-[25px] w-[25px] rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0',
                color.bg,
                color.text,
                poppins_500.className
              )}
            >
              {getInitials(name)}
            </div>
            {name}
          </div>
        );
      },
      meta: { useTypography: false },
    }),
    columnHelper.accessor('email', {
      header: 'Email',
    }),
    columnHelper.accessor('phoneNumber', {
      header: 'Phone number',
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
              'font-normal rounded-full py-2 px-2 text-sm text-center capitalize',
              statusStyles[status] || 'text-gray-500 bg-gray-100'
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
      cell: (info) => {
        const row = info.row.original;
        const menuItems = [
          {
            label: 'View Profile',
            onClick: () => router.push(`/school/non-teaching-staffs/${row._id}`),
            icon: <ViewProfileEyeIcon />,
          },
          {
            label: 'Message',
            onClick: notYetAvailable('Message'),
            icon: <Message size="24" />,
          },
          {
            label: 'Suspend',
            onClick: changeStatus(row._id, 'suspended', 'Staff member suspended'),
            icon: <SuspendIcon />,
          },
          {
            label: 'Withdraw',
            onClick: changeStatus(row._id, 'withdrawn', 'Staff member withdrawn'),
            icon: <CancelIcon />,
            danger: true,
          },
        ];
        return (
          <MenuLists
            label="Options"
            items={menuItems}
            placement="bottom-start"
            maxHeight="150px"
          />
        );
      },
    }),
  ];

  return (
    <div className="my-8 ">
      {!isLoading && staffList.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <Empty
            icon={<NoTeacherIcon />}
            title="No staff added yet"
            description="You have not yet added any staff. Click the button below to add a staff"
            buttonText="+ Add staff"
          />
        </div>
      ) : (
        <DataTable
          data={staffList}
          columns={columns}
          isLoading={isLoading}
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

export default NonTeachingStaffTableLists;
