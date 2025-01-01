'use client';
import Dot from '@/app/components/atoms/dashboard/subjects/Dot';
import Button from '@/app/components/atoms/form/Button';
import DownloadIcon from '@/app/components/atoms/icons/dashboard/DownloadIcon';
import ScreenIcon from '@/app/components/atoms/icons/dashboard/ScreenIcon';
import ShowArrow from '@/app/components/atoms/icons/dashboard/ShowArrow';
import HideArrow from '@/app/components/atoms/icons/dashboard/SideBar/HideArrow';
import {
  Inter_400,
  Inter_500,
  Inter_600,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import { Card, Typography } from '@material-tailwind/react';
import { useState } from 'react';

// Type for a single table description
type TableDescription = {
  id: number;
  class: string;
  term: string;
  date: string;
  time: string;
  number_of_subjects: number;
  open: boolean;
};

// Type for each row in the table
type TableRow = {
  serialnumber: string;
  subject: string;
  firstCA: number;
  secondCA: number;
  examScore: number;
  total: number;
  grade: string;
  status: 'Good' | 'Pass' | 'Fail' | 'Fair';
};

const tableDescription: TableDescription[] = [
  {
    id: 1,
    class: 'SS1',
    term: 'first',
    date: 'Nov 12, 2024',
    time: '9am',
    number_of_subjects: 7,
    open: false,
  },
  {
    id: 2,
    class: 'SS1',
    term: 'second',
    date: 'Dec 12, 2024',
    time: '10am',
    number_of_subjects: 6,
    open: false,
  },
];

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

export function ResultLists(): JSX.Element {
  const [openTable, setOpenTable] = useState<Record<number, boolean>>({});

  const toggleDrawer = (id: number): void => {
    setOpenTable((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <Card className="h-full w-full overflow-scroll p-3.5 mt-8">
      {tableDescription.map((description) => (
        <div key={description.id}>
          <div className="flex justify-between items-center mb-6 border-[#E0E0E0] border p-3.5 rounded-md">
            <div>
              <h4
                className={cn('text-sm text-gray6 mb-1.5', Inter_500.className)}
              >
                {description.class} {description.term} term result
              </h4>
              <div
                className={cn(
                  'flex items-center gap-2 text-gray3 text-xs',
                  poppins_400.className
                )}
              >
                <span className="text-gray3 text-xs">
                  {description.number_of_subjects} subjects
                </span>
                <Dot size={1} />
                <span className="text-gray3 text-xs">
                  {description.date} - {description.time}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              {openTable[description.id] && (
                <Button
                  round
                  className={cn(
                    'text-primary text-[16px] flex gap-4 bg-primary1',
                    Inter_600.className
                  )}
                >
                  <ScreenIcon /> <span>Full screen</span>
                </Button>
              )}
              <Button
                round
                className={cn(
                  'text-white text-[16px] flex gap-4 bg-primary',
                  Inter_600.className
                )}
              >
                <DownloadIcon size="20" color="#ffffff" /> <span>Download</span>
              </Button>
              <div
                className="cursor-pointer"
                onClick={() => toggleDrawer(description.id)}
              >
                {openTable[description.id] ? <ShowArrow /> : <HideArrow />}
              </div>
            </div>
          </div>

          {openTable[description.id] && (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="bg-[#FBFBFB] p-4">
                      <Typography
                        variant="small"
                        className="font-normal text-gray1 leading-none opacity-70"
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
                    const classes = isLast
                      ? 'p-4'
                      : 'p-4 border-b border-gray4';

                    return (
                      <tr key={serialnumber}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray1"
                          >
                            {serialnumber}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray1"
                          >
                            {subject}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray1"
                          >
                            {firstCA}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray1"
                          >
                            {secondCA}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray1"
                          >
                            {examScore}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray1"
                          >
                            {total}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray1"
                          >
                            {grade}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className={cn(
                              'font-normal rounded-full w-[92px] py-1.5 px-8 ',
                              status === 'Pass'
                                ? 'text-primary bg-primary1'
                                : status === 'Good'
                                  ? 'text-[#F2994A] bg-[#F2994A14]'
                                  : status === 'Fair'
                                    ? 'text-[#F2994A] bg-[#F2994A14]'
                                    : status === 'Fail'
                                      ? 'text-[#EB5757] bg-[#EB575714]'
                                      : 'text-gray-600 bg-gray-200'
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
          )}
        </div>
      ))}
    </Card>
  );
}
