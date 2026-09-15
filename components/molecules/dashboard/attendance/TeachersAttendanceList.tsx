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

function TeachersAttendanceList() {
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
        <TableRow>
          <TableCell
            colSpan={4}
            className={cn('text-center py-10 text-gray6', Inter_400.className)}
          >
            No attendance records yet. Staff clock-in/out tracking is not set
            up for this school.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default TeachersAttendanceList;
