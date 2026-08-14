'use client';

import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import TextAvatar from '@/components/atoms/TextAvatar';
import { VIsibilityIcon } from '@/components/atoms/icons/Icons';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import Message from '@/components/atoms/icons/SideBar/Message';
import DataTable from '@/components/molecules/DataTable';
import { createColumnHelper } from '@tanstack/react-table';

type TableRow = {
  paymentID: string;
  amount: string;
  paymentType: string;
  date: string;
  status: 'Success' | 'Pending' | 'Failed' | 'Due';
  studentName?: string;
};

const TABLE_ROWS: TableRow[] = [
  {
    studentName: 'Amina Bello',
    paymentID: '#1838942022',
    amount: '64,000',
    paymentType: 'School Fees',
    date: '14/3/2024',
    status: 'Due',
  },
  {
    studentName: 'John Doe',
    paymentID: '#1838942023',
    amount: '45,500',
    paymentType: 'Library Fees',
    date: '15/3/2024',
    status: 'Due',
  },
  {
    studentName: 'Chinwe Okeke',
    paymentID: '#1838942024',
    amount: '70,000',
    paymentType: 'Hostel Fees',
    date: '16/3/2024',
    status: 'Due',
  },
  {
    studentName: 'Michael Johnson',
    paymentID: '#1838942025',
    amount: '50,000',
    paymentType: 'School Fees',
    date: '17/3/2024',
    status: 'Due',
  },
  {
    studentName: 'Fatima Sani',
    paymentID: '#1838942026',
    amount: '30,000',
    paymentType: 'PTA Levy',
    date: '18/3/2024',
    status: 'Due',
  },
  {
    studentName: 'Emeka Obi',
    paymentID: '#1838942027',
    amount: '55,000',
    paymentType: 'Exam Fees',
    date: '19/3/2024',
    status: 'Due',
  },
];

const columnHelper = createColumnHelper<TableRow>();

const menuItems = [
  {
    label: 'View Profile',
    onClick: () => console.log('View Profile'),
    icon: <VIsibilityIcon />,
  },
  {
    label: 'Message parent',
    onClick: () => console.log('Message parent'),
    icon: <Message />,
  },
  {
    label: 'Message student',
    onClick: () => console.log('Message student'),
    icon: <Message />,
  },
];

const statusClasses = (status: TableRow['status']) =>
  status === 'Success'
    ? 'text-lightSuccess bg-success'
    : status === 'Pending'
      ? 'text-[#F2994A] bg-[#F2994A14]'
      : status === 'Failed'
        ? 'text-[#EB5757] bg-[#EB575714]'
        : 'text-gray-600 bg-gray-200';

const columns = [
  columnHelper.accessor('studentName', {
    header: 'Student Name',
    cell: (info) => {
      const studentName = info.getValue() || '';
      const [studentFirstName, ...studentLastNameParts] = studentName.split(' ');
      const studentLastName = studentLastNameParts.join(' ');
      return (
        <div className="flex items-center gap-3">
          <TextAvatar
            firstName={studentFirstName || ''}
            lastName={studentLastName || ''}
            size={28}
            colorClass="bg-primary"
          />
          <span>{studentName}</span>
        </div>
      );
    },
    meta: { useTypography: false },
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
  }),
  columnHelper.accessor('paymentType', {
    header: 'Payment type',
  }),
  columnHelper.accessor('date', {
    id: 'startedOn',
    header: 'Started on',
  }),
  columnHelper.accessor('date', {
    id: 'dueOn',
    header: 'Due on',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span className={cn('font-normal rounded-full w-[92px] py-1.5 px-8', statusClasses(info.getValue()))}>
        {info.getValue()}
      </span>
    ),
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

export function DuePaymentTable(): JSX.Element {
  return (
    <DataTable
      data={TABLE_ROWS}
      columns={columns}
      isLoading={false}
      className="shadow-none h-full w-full overflow-y-visible --overflow-x-auto"
      theadClassName=""
      thClassName={cn('bg-[#FBFBFB] p-4 font-normal text-gray1 leading-none opacity-70', poppins_400.className)}
      tdClassName={cn('border-gray4 font-normal text-gray1', poppins_400.className)}
      tableClassName="min-w-[800px] w-full table-auto text-left"
      wrapCellsInTypography={false}
      wrapHeadersInTypography={false}
      enableSorting={false}
      enableFiltering={false}
    />
  );
}
