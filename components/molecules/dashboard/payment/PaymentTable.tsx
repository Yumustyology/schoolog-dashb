'use client';
import Button from '@/components/atoms/form/Button';
import DownloadIcon from '@/components/atoms/icons/dashboard/DownloadIcon';
import AcrobatPdfIcon from '@/components/atoms/icons/dashboard/materials/AcrobatPdfIcon';
import {
  poppins_400,
  poppins_500,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { Card, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { DrawerSide } from '../DrawerSide';
import SearchInput from '@/components/atoms/form/SearchInput';
import SelectComp from '@/components/atoms/form/Select';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import EyeClose from '@/components/atoms/icons/EyeClose';

type TableRow = {
  paymentID: string;
  amount: string;
  paymentType: string;
  date: string;
  status: 'Success' | 'Pending' | 'Failed';
};

const TABLE_HEAD: string[] = [
  'Payment ID',
  'Amount',
  'Payment type',
  'Date',
  'Status',
  '',
];

const TABLE_ROWS: TableRow[] = [
  {
    paymentID: 'Invoice #1838942022',
    amount: '64,000',
    paymentType: 'School fees',
    date: '14/3/2024',
    status: 'Success',
  },
  {
    paymentID: 'Invoice #1838942022',
    amount: '64,000',
    paymentType: 'School fees',
    date: '14/3/2024',
    status: 'Success',
  },
  {
    paymentID: 'Invoice #1838942022',
    amount: '64,000',
    paymentType: 'School fees',
    date: '14/3/2024',
    status: 'Success',
  },
  {
    paymentID: 'Invoice #1838942022',
    amount: '64,000',
    paymentType: 'School fees',
    date: '14/3/2024',
    status: 'Success',
  },
  {
    paymentID: 'Invoice #1838942022',
    amount: '64,000',
    paymentType: 'School fees',
    date: '14/3/2024',
    status: 'Success',
  },
  {
    paymentID: 'Invoice #1838942022',
    amount: '64,000',
    paymentType: 'School fees',
    date: '14/3/2024',
    status: 'Success',
  },
];

export function PaymentTable(): JSX.Element {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <Card className="shadow-none h-full w-full overflow-scroll p-6 mt-8">
      <div className="flex items-center justify-between">
        <h3 className={cn('text-gray1 text-xl mb-6', poppins_600.className)}>
          Payments histories
        </h3>
        <div className="flex gap-6 items-center mb-6">
          <SearchInput
            className="bg-gray4"
            placeholder="Search payment history"
          />
          <SelectComp
            placeholder="All type"
            triggerClasses={cn(
              poppins_400.className,
              'text-xs cursor-pointer text-gray6 2 text-center gap-1.5 w-max border-gray4  flex justify-between rounded-full h-[38px] items-center px-3 py-1.5'
            )}
            value=""
            onValueChange={console.log}
            options={[
              {
                id: 'all',
                name: 'All',
              },
              {
                id: 'jss2',
                name: 'JSS2',
              },
              {
                id: 'jss3',
                name: 'JSS3',
              },
            ]}
          />
          <DatePicker
            calenderContainerClassName={cn('mr-10')}
            className={cn(
              'text-xs cursor-pointer text-gray6 2 w-[180px] border border-gray4 flex justify-between rounded-full h-[38px] items-center px-3 py-1.5',
              poppins_400.className
            )}
            placeholder={'Pick date'}
          />
        </div>
      </div>

      <table className="w-full min-w-max table-auto text-left">
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
            ({ paymentID, date, paymentType, amount, status }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-gray4';

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
                      <AcrobatPdfIcon /> <span> {paymentID}</span>
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
                        'font-normal rounded-full w-[92px] text-center px-4.5 py-1.5 ',
                        status === 'Success'
                          ? 'text-primary bg-primary1'
                          : status === 'Pending'
                            ? 'text-[#F2994A] bg-[#F2994A14]'
                            : status === 'Failed'
                              ? 'text-[#EB5757] bg-[#EB575714]'
                              : 'text-gray-600 bg-gray-200'
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
        title="Invoice #1838942022"
        subtitle="Transaction ID"
      >
        <>
          <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
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

              <div className="bg-[#F8F8F8] border border-gray4 p-6 mt-10 rounded-xl w-full">
                <Button
                  className={cn(
                    'h-[30px] text-xs bg-white border border-gray5 text-gray1 mb-6 py-[6px] px-[12px] rounded-full'
                  )}
                >
                  Transaction summary
                </Button>

                <div
                  className={cn(' flex flex-col gap-4', poppins_400.className)}
                >
                  <div className="flex justify-between py-4">
                    <p className="text-sm text-gray6">Payment type</p>
                    <p className="text-gray1">School fee</p>
                  </div>
                  <div className="flex justify-between py-4">
                    <p className="text-sm text-gray6">Paid by</p>
                    <p className="text-gray1">Muhammad Jamiu</p>
                  </div>
                  <div className="flex justify-between py-4">
                    <p className="text-sm text-gray6">Date</p>
                    <p className="text-gray1">11/12/2060</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6">
              <Button
                round
                wide
                className={cn(
                  'bg-[#E9F8EF] h-[52px] mt-[8dvh] w-full text-primary flex gap-3',
                  poppins_400.className
                )}
              >
                {' '}
                <DownloadIcon size="20" color="#21B55A" />{' '}
                <span>Download file </span>{' '}
              </Button>
            </div>
          </div>
        </>
      </DrawerSide>
    </Card>
  );
}
