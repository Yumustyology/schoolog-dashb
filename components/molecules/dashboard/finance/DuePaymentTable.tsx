'use client';

import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { Card, Typography } from '@material-tailwind/react';
import TextAvatar from '@/components/atoms/TextAvatar';
import { OptionIcon, VIsibilityIcon } from '@/components/atoms/icons/Icons';
import { useState } from 'react';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import Message from '@/components/atoms/icons/SideBar/Message';

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

export function DuePaymentTable(): JSX.Element {
  const TABLE_HEAD: string[] = [
    'Student Name',
    'Amount',
    'Payment type',
    'Started on',
    'Due on',
    'Status',
    '',
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  return (
    <Card className="shadow-none h-full w-full overflow-y-visible --overflow-x-auto">
      {/* <table className="w-full min-w-max table-auto text-left"> */}
      <table className="min-w-[800px] w-full table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="bg-[#FBFBFB] p-4">
                <Typography
                  variant="small"
                  className={cn(
                    'font-normal text-gray1 leading-none opacity-70',
                    poppins_400.className
                  )}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(
            (
              { paymentID, studentName, date, paymentType, amount, status },
              index
            ) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-gray4';
              const [studentFirstName, ...studentLastNameParts] = (studentName || '').split(' ');
              const studentLastName = studentLastNameParts.join(' ');

              return (
                <tr key={paymentID}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className={cn(
                        'font-normal text-gray1 flex items-center gap-3',
                        poppins_400.className
                      )}
                    >
                      <TextAvatar
                        firstName={studentFirstName || ''}
                        lastName={studentLastName || ''}
                        size={28}
                        colorClass="bg-primary"
                      />{' '}
                      <span>{studentName}</span>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className={cn(
                        'font-normal text-gray1',
                        poppins_400.className
                      )}
                    >
                      {amount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className={cn(
                        'font-normal text-gray1',
                        poppins_400.className
                      )}
                    >
                      {paymentType}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      className={cn(
                        'font-normal text-gray1',
                        poppins_400.className
                      )}
                    >
                      {date}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      className={cn(
                        'font-normal text-gray1',
                        poppins_400.className
                      )}
                    >
                      {date}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      className={cn(
                        'font-normal rounded-full w-[92px] py-1.5 px-8',
                        status === 'Success'
                          ? 'text-lightSuccess bg-success'
                          : status === 'Pending'
                            ? 'text-[#F2994A] bg-[#F2994A14]'
                            : status === 'Failed'
                              ? 'text-[#EB5757] bg-[#EB575714]'
                              : 'text-gray-600 bg-gray-200',
                        poppins_400.className
                      )}
                    >
                      {status}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <MenuLists
                      label="Options"
                      items={menuItems}
                      placement="bottom-start"
                      maxHeight="150px"
                    />
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
}
