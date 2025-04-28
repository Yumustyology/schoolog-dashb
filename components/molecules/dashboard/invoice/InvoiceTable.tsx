'use client';
import Button from '@/components/atoms/form/Button';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { Card, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { DrawerSide } from '../DrawerSide';
import EyeClose from '@/components/atoms/icons/EyeClose';
import MakePaymentModal from '../../Payment/MakePaymentModal';
import { openMakePaymentModal } from '@/app/lib/entities/payment.entity';

type TableRow = {
  paymentID: string;
  amount: string;
  invoiceCategory: string;
  invoiceTitle: string;
  date: string;
  status: 'Success' | 'Pending' | 'Failed';
  studentName?: string;
};

const TABLE_ROWS: TableRow[] = [
  {
    studentName: 'Amina Bello',
    paymentID: '#1838942022',
    invoiceTitle: 'Website plan renewal',
    amount: '64,000',
    invoiceCategory: 'School Fees',
    date: '14/3/2024',
    status: 'Success',
  },
  {
    studentName: 'John Doe',
    paymentID: '#1838942023',
    invoiceTitle: 'AI plan renewal',
    amount: '45,500',
    invoiceCategory: 'Library Fees',
    date: '15/3/2024',
    status: 'Pending',
  },
  {
    studentName: 'Chinwe Okeke',
    paymentID: '#1838942024',
    invoiceTitle: 'Website plan renewal',
    amount: '70,000',
    invoiceCategory: 'Hostel Fees',
    date: '16/3/2024',
    status: 'Failed',
  },
  {
    studentName: 'Michael Johnson',
    paymentID: '#1838942025',
    invoiceTitle: 'Website plan renewal',
    amount: '50,000',
    invoiceCategory: 'School Fees',
    date: '17/3/2024',
    status: 'Success',
  },
  {
    studentName: 'Fatima Sani',
    paymentID: '#1838942026',
    invoiceTitle: 'Website plan renewal',
    amount: '30,000',
    invoiceCategory: 'PTA Levy',
    date: '18/3/2024',
    status: 'Success',
  },
  {
    studentName: 'Emeka Obi',
    paymentID: '#1838942027',
    invoiceTitle: 'AI plan renewal',
    amount: '55,000',
    invoiceCategory: 'Exam Fees',
    date: '19/3/2024',
    status: 'Pending',
  },
];

export function InvoiceTable(): JSX.Element {
  const TABLE_HEAD: string[] = [
    'Invoice title',
    'Reference',
    'Amount',
    'Category',
    'Date',
    'Status',
    '',
  ];

  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <Card className="shadow-none h-full w-full overflow-y-visible --overflow-x-auto">
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
              {
                paymentID,
                date,
                invoiceCategory,
                amount,
                status,
                invoiceTitle,
              },
              index
            ) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = cn(isLast ? 'p-4' : 'p-4 border-b border-gray4');

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
                      {invoiceTitle}
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
                      <span>{paymentID}</span>
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
                      <span>{amount}</span>
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
                      {invoiceCategory}
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
                    <Button
                      onClick={openDrawer}
                      className={cn(
                        'bg-gray7 text-gray6 flex gap-3 text-sm rounded-full',
                        poppins_400.className
                      )}
                    >
                      <EyeClose />
                      <span>View</span>
                    </Button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>

      <DrawerSide
        open={open}
        close={closeDrawer}
        title="#1838942022"
        subtitle="Transaction ID"
      >
        <>
          <div className="p-6 flex flex-col h-full justify-between overflow-y-auto max-h-[90dvh] pb-10">
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <Typography>
                  <h2
                    className={cn(
                      'text-[16px] text-black1 mb-1.5',
                      poppins_500.className
                    )}
                  >
                    ₦78,000
                  </h2>
                  <p className={cn('text-sm text-gray', poppins_400.className)}>
                    Amount
                  </p>
                </Typography>

                <Button
                  round
                  className={cn(
                    'bg-[#ECFDF3] border border-[#ABEFC6] text-xs text-[#067647]',
                    poppins_400.className
                  )}
                >
                  Success
                </Button>
              </div>
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2
                      className={cn(
                        poppins_500.className,
                        'text-black1 text-sm'
                      )}
                    >
                      May Service charge
                    </h2>
                    <p
                      className={cn(
                        poppins_400.className,
                        'text-gray3 text-sm'
                      )}
                    >
                      Invoice title
                    </p>
                  </div>
                  <div>
                    <h2
                      className={cn(
                        poppins_500.className,
                        'text-black1 text-sm'
                      )}
                    >
                      March 15, 2025
                    </h2>
                    <p
                      className={cn(
                        poppins_400.className,
                        'text-gray3 text-sm'
                      )}
                    >
                      Date
                    </p>
                  </div>
                </div>
                <div>
                  <h2
                    className={cn(
                      poppins_400.className,
                      'text-gray3 text-sm mt-9'
                    )}
                  >
                    Description
                  </h2>
                  <p
                    className={cn(
                      poppins_400.className,
                      'text-black1 text-base mt-1.5'
                    )}
                  >
                    Lorem ipsum dolor sit amet consectetur. Cursus eu a integer
                    vitae pharetra sed lacinia mi volutpat. Dolor varius diam
                    odio non tortor turpis massa semper ut. Lorem ipsum dolor
                    sit amet consectetur. Cursus eu a integer vitae pharetra sed
                    lacinia mi volutpat. Dolor varius diam odio non tortor
                    turpis massa semper ut.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 mt-auto">
              <Button
                onClick={() => {
                  openMakePaymentModal();
                  closeDrawer();
                }}
                round
                wide
                className={cn(
                  'h-[52px] mt-[8dvh] w-full text-white flex gap-3',
                  poppins_400.className
                )}
              >
                <span>Make payment</span>
              </Button>
            </div>
          </div>
        </>
      </DrawerSide>
      <MakePaymentModal />
    </Card>
  );
}
