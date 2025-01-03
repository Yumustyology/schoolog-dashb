'use client';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import { Typography } from '@material-tailwind/react';

const TABLE_HEAD: string[] = [
  'S/N',
  'Subject',
  'First CA',
  'Second CA',
  'Exam',
  'Total',
  'Grade',
  'Status',
];

export type TableRow = {
  serialnumber: string;
  subject: string;
  firstCA: number;
  secondCA: number;
  examScore: number;
  total: number;
  paid?: boolean;
  grade: string;
  status: 'Good' | 'Pass' | 'Fail' | 'Fair';
};

const TABLE_ROWS: TableRow[] = [
  {
    serialnumber: '01',
    subject: 'Mathematics',
    firstCA: 16,
    secondCA: 18,
    examScore: 60,
    total: 90,
    grade: 'A',
    status: 'Pass',
  },
  {
    serialnumber: '02',
    subject: 'English',
    firstCA: 14,
    secondCA: 16,
    examScore: 55,
    total: 85,
    grade: 'B',
    status: 'Fair',
  },
  {
    serialnumber: '03',
    subject: 'Physics',
    firstCA: 18,
    secondCA: 17,
    examScore: 62,
    total: 97,
    grade: 'A',
    status: 'Fail',
  },
  {
    serialnumber: '04',
    subject: 'Chemistry',
    firstCA: 16,
    secondCA: 19,
    examScore: 60,
    total: 95,
    grade: 'A',
    status: 'Good',
  },
  {
    serialnumber: '05',
    subject: 'Biology',
    firstCA: 15,
    secondCA: 17,
    examScore: 58,
    total: 90,
    grade: 'B',
    status: 'Pass',
  },
];

export function ResultTable(): JSX.Element {
  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th key={head} className="bg-[#FBFBFB] p-4">
              <Typography
                variant="small"
                className={cn(
                  'font-normal text-sm text-gray1 leading-none opacity-70',
                  poppins_400.className
                )}
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={''}>
        {TABLE_ROWS.map(
          (
            {
              serialnumber,
              subject,
              firstCA,
              secondCA,
              examScore,
              total,
              grade,
              status,
            },
            index
          ) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-gray4';

            return (
              <tr key={serialnumber}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className={cn(
                      'font-normal text-gray1',
                      poppins_400.className
                    )}
                  >
                    {serialnumber}
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
                    {subject}
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
                    {firstCA}
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
                    {secondCA}
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
                    {examScore}
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
                    {total}
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
                    {grade}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    className={cn(
                      'font-normal rounded-full w-[92px] py-1.5 px-8',
                      status === 'Pass'
                        ? 'text-primary bg-primary1'
                        : status === 'Good'
                          ? 'text-[#F2994A] bg-[#F2994A14]'
                          : status === 'Fair'
                            ? 'text-[#F2994A] bg-[#F2994A14]'
                            : status === 'Fail'
                              ? 'text-[#EB5757] bg-[#EB575714]'
                              : 'text-gray-600 bg-gray-200',
                      poppins_400.className
                    )}
                  >
                    {status}
                  </Typography>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}
