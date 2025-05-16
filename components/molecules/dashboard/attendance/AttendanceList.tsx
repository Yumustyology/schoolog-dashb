import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Unmarked from '@/components/atoms/icons/dashboard/Unmarked';
import CancelIcon from '@/components/atoms/icons/dashboard/CancelIcon';
import Image from 'next/image';
import { teacherImg } from '@/app/assets';

function AttendanceList() {
  type AttendanceList = {
    type?: 'students' | 'teachers';
    date: string;
    checkInStatus: 'present' | 'absent' | 'late';
    checkInTime: string;
    checkOutStatus: 'present' | 'absent' | 'late';
    checkOutTime: string;
    teacherName: string;
  }[];

  const attendanceList: AttendanceList = [
    {
      date: 'Monday 12, August 2024',
      checkInStatus: 'present',
      checkInTime: '8:10 AM',
      checkOutStatus: 'late',
      checkOutTime: '12:30 PM',
      teacherName: 'Muhammad Jamiu',
    },
    {
      date: 'Monday 12, August 2024',
      checkInStatus: 'absent',
      checkInTime: '',
      checkOutStatus: 'absent',
      checkOutTime: '',
      teacherName: 'Muhammad Jamiu',
    },
    {
      date: 'Monday 12, August 2024',
      checkInStatus: 'present',
      checkInTime: '8:10 AM',
      checkOutStatus: 'late',
      checkOutTime: '12:30 PM',
      teacherName: 'Muhammad Jamiu',
    },
    {
      date: 'Monday 12, August 2024',
      checkInStatus: 'present',
      checkInTime: '8:10 AM',
      checkOutStatus: 'late',
      checkOutTime: '12:30 PM',
      teacherName: 'Muhammad Jamiu',
    },
    {
      date: 'Monday 12, August 2024',
      checkInStatus: 'present',
      checkInTime: '8:10 AM',
      checkOutStatus: 'late',
      checkOutTime: '12:30 PM',
      teacherName: 'Muhammad Jamiu',
    },
    {
      date: 'Monday 12, August 2024',
      checkInStatus: 'late',
      checkInTime: '10:10 AM',
      checkOutStatus: 'present',
      checkOutTime: '12:30 PM',
      teacherName: 'Muhammad Jamiu',
    },
    {
      date: 'Monday 12, August 2024',
      checkInStatus: 'late',
      checkInTime: '9:50 AM',
      checkOutStatus: 'present',
      checkOutTime: '12:30 PM',
      teacherName: 'Muhammad Jamiu',
    },
    {
      date: 'Monday 12, August 2024',
      checkInStatus: 'present',
      checkInTime: '8:10 AM',
      checkOutStatus: 'late',
      checkOutTime: '12:30 PM',
      teacherName: 'Muhammad Jamiu',
    },
  ];

  return (
    <Table className="border-none ">
      <TableHeader
        className={cn(
          'bg-[#FBFBFB] border-none text-gray text-sm',
          Inter_500.className
        )}
      >
        <TableRow className="border-none">
          <TableHead>Date</TableHead>
          <TableHead>Check in</TableHead>
          <TableHead>Checkout</TableHead>
          <TableHead>Teacher</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {attendanceList.map((attendance) => (
          <TableRow
            key={attendance.date}
            className={cn(
              'border-b border-gray4 text-gray1 text-sm',
              Inter_400.className
            )}
          >
            <TableCell> {attendance.date}</TableCell>
            <TableCell>
              <div className="flex gap-1.5 items-center">
                {attendance.checkInStatus === 'present' ? (
                  <Unmarked color="#21B55A" />
                ) : attendance.checkInStatus === 'late' ? (
                  <Unmarked color="#F2994A" />
                ) : (
                  <CancelIcon />
                )}
                <p>{attendance.checkInTime}</p>
              </div>
            </TableCell>

            <TableCell>
              <div className="flex gap-1.5 items-center">
                {attendance.checkInStatus === 'present' ? (
                  <Unmarked color="#21B55A" />
                ) : attendance.checkInStatus === 'late' ? (
                  <Unmarked color="#F2994A" />
                ) : (
                  <CancelIcon />
                )}
                <p>{attendance.checkOutTime}</p>
              </div>
            </TableCell>

            <TableCell>
              <div className="flex gap-1.5 items-center">
                <Image src={teacherImg} alt="img" width={32} height={32} />

                {attendance.teacherName}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AttendanceList;
