'use client';
import { teacherImg2 } from '@/app/assets';
import PaginationBox from '@/components/atoms/dashboard/subjects/Pagination';
import SelectBox from '@/components/atoms/dashboard/subjects/Select';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';

const TABLE_HEAD: string[] = [
  'S/N',
  'Student name',
  'ID',
  'Class',
  'Attendance',
  'Grade',
  'Rank',
];

export type TableRow = {
  subject: string;
  studentId: string;
  secondCA: number;
  examScore: number;
  total: number;
  rank: string;
  paid?: boolean;
  grade: string;
  status: 'Good' | 'Pass' | 'Fail' | 'Fair';
};

const TABLE_ROWS: TableRow[] = [
  {
    subject: 'Mathematics',
    studentId: '172928739HD',
    secondCA: 18,
    examScore: 60,
    total: 90,
    grade: 'A',
    status: 'Pass',
    rank: 'First',
  },
  {
    subject: 'English',
    studentId: '172928739HD',
    secondCA: 16,
    examScore: 55,
    total: 85,
    rank: 'First',
    grade: 'B',
    status: 'Fair',
  },
  {
    subject: 'Physics',
    studentId: '172928739HD',
    rank: 'First',
    secondCA: 17,
    examScore: 62,
    total: 97,
    grade: 'A',
    status: 'Fail',
  },
  {
    subject: 'Chemistry',
    studentId: '172928739HD',
    secondCA: 19,
    examScore: 60,
    total: 95,
    grade: 'A',
    rank: 'First',
    status: 'Good',
  },
  {
    subject: 'Biology',
    studentId: '172928739HD',
    secondCA: 17,
    examScore: 58,
    total: 90,
    rank: 'First',
    grade: 'B',
    status: 'Pass',
  },
];

export function StudentsListTable(): JSX.Element {
  return (
    <div>
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
                subject,
                studentId,
                secondCA,
                examScore,
                total,
                grade,
                status,
                rank,
              },
              index
            ) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? 'p-4 text-sm'
                : 'p-4 border-b border-gray4 text-sm';

              return (
                <tr key={studentId}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className={cn(
                        'font-normal text-gray1 flex items-center gap-3',
                        poppins_400.className
                      )}
                    >
                      <Image src={teacherImg2} alt="teacher-image" />
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
                      {studentId}
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
                        'font-normal rounded-full w-[92px] py-1.5 px-8',
                        status === 'Pass'
                          ? 'text-lightSuccess bg-success'
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
                      {total}%
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
                        'font-normal text-gray1',
                        poppins_400.className
                      )}
                    >
                      {rank}
                    </Typography>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <footer
        className={cn(
          'w-full mt-6 flex justify-between items-center',
          poppins_500.className
        )}
      >
        <div className="flex gap-4 items-center">
          <h5> Showing </h5>
          <SelectBox />
        </div>

        <div>
          <PaginationBox />
        </div>
      </footer>
    </div>
  );
}
