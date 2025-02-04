'use client';
import { teacherImg2 } from '@/app/assets';
import PaginationBox from '@/app/components/atoms/dashboard/subjects/Pagination';
import SelectBox from '@/app/components/atoms/dashboard/subjects/Select';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';

const TABLE_HEAD: string[] = [
  'Student name',
  'Guardian name',
  'Student ID',
  'Class',
  'Title',
  'Amount',
  'Status',
  'Due date',
];

export type TableRow = {
  subject: string;
  studentId: string;
  guardian: string;
  amount: number;
  total: number;
  classGrade: string;
  paid?: boolean;
  dueDate: string;
  title: string;
  status: 'Good' | 'Pass' | 'Fail' | 'Fair';
};

const TABLE_ROWS: TableRow[] = [
  {
    subject: 'Muh Jamiu',
    studentId: '172928739HD',
       guardian: "Bello Sambo",
    amount: 60,
    total: 90,
    title: "School fee",
    classGrade: 'JSS1',
    dueDate: "30/12/2024",
    status: 'Pass',
  },
  {
    subject: 'Muh Jamiu',
    studentId: '172928739HD',
       guardian: "Bello Sambo",
    amount: 55,
    total: 85,
    title: "School fee",
    classGrade: 'JSS2',
    dueDate: "30/12/2024",
    status: 'Fair',
  },
  {
    subject: 'Muh Jamiu',
    studentId: '172928739HD',
      guardian: "Bello Sambo",
    amount: 62,
    total: 97,
    classGrade: 'SS1',
    title: "School fee",
    dueDate: "30/12/2024",
    status: 'Fail',
  },
  {
    subject: 'Muh Jamiu',
    studentId: '172928739HD',
    guardian: "Bello Sambo",
    amount: 60,
    total: 95,
    title: "School fee",
    classGrade: 'SS3',
    dueDate: "30/12/2024",
    status: 'Good',
  },
  {
    subject: 'Muh Jamiu',
    studentId: '172928739HD',
    guardian: "Bello Sambo",
    amount: 58,
    total: 90,
    classGrade: 'JSS3',
    dueDate: "30/12/2024",
    status: 'Pass',
    title: "School fee",
  },
];

export function AdminPaymentListTable(): JSX.Element {
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
                guardian,
                amount,
                total,
                classGrade,
                status,
                dueDate,
                title
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
                        'font-normal text-gray1 flex items-center gap-3',
                        poppins_400.className
                      )}
                    >
                      <Image src={teacherImg2} alt="teacher-image" />
                      {guardian}
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
                     {classGrade}
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
                     {title}
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
                      ${amount}
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
                      {dueDate}
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
