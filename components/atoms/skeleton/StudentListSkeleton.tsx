import React from "react";
import { cn } from "@/app/lib/utils";
import { Inter_500 } from "@/app/lib/config/font.config";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  selectedClassGrade: string | undefined;
}

const StudentListSkeleton: React.FC<Props> = ({ selectedClassGrade }) => (
  <table className="w-full min-w-max table-auto text-left border-none bg-white">
    <thead className={cn("bg-[#FBFBFB] border-none text-gray text-sm", Inter_500.className)}>
      <tr className="border-none text-gray3 text-sm">
        <th className="p-4">Student Name</th>
        <th className="p-4">ID</th>
        {selectedClassGrade === 'all' && <th className="p-4">Grade</th>}
        <th className="p-4">Attendance</th>
        <th className="p-4">Rank</th>
        <th className="p-4">Status</th>
        <th className="p-4"></th>
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={`skeleton-${i}`} className="border-b border-gray4">
          <td className="p-4"><Skeleton className="h-6 w-40" /></td>
          <td className="p-4"><Skeleton className="h-4 w-24" /></td>
          {selectedClassGrade === 'all' && <td className="p-4"><Skeleton className="h-6 w-12" /></td>}
          <td className="p-4"><Skeleton className="h-4 w-12" /></td>
          <td className="p-4"><Skeleton className="h-4 w-8" /></td>
          <td className="p-4"><Skeleton className="h-6 w-20" /></td>
          <td className="p-4"><Skeleton className="h-6 w-6" /></td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default StudentListSkeleton;