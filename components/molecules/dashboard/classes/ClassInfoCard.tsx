import {
  ArchiveModalIcon,
  DeleteModalIcon,
  UnachiveModalIcon,
} from '@/components/atoms/icons/Icons';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn, formatActiveTermYears } from '@/app/lib/utils';
import React, { useState } from 'react';
import type { ActiveTerm } from '@/app/lib/types/class.types';
import SubjectModal from '@/components/atoms/dashboard/subjects/subjectsInfoModals/SubjectModal';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
import Button from '@/components/atoms/form/Button';
import Timetable from '@/components/atoms/icons/SideBar/Timetable';

type StudentCounts = { total: number; male: number; female: number };
type Attendance = { todayPercentage: number; monthPercentage: number };

// `formatActiveTermYears` imported from shared utils

function ClassInfoCard({
  classId,
  classGradeName,
  studentCounts,
  attendance,
  activeTerm,
}: {
  classId: string;
  classGradeName: string;
  studentCounts?: StudentCounts | null;
  attendance?: Attendance | null;
  activeTerm?: ActiveTerm | null;
}) {
  // mark classId as used to avoid lint "defined but never used"
  void classId;
  const [deleteModal, setDeleteModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [unarchiveModal, setUnarchiveModal] = useState(false);

  const { theme } = useSlgTheme();

  const totalStudents = studentCounts?.total ?? 0;
  const todayAttendance = attendance?.todayPercentage ?? 0;
  const monthAttendance = attendance?.monthPercentage ?? 0;

  return (
    <Card className="bg-white py-6 h-[320px] pb-10 px-6 rounded-md col-span-2 border-none">
      <CardHeader className="w-full p-0 min-h-[68px]">
        <div className="flex items-center gap-3 mb-4">
            <div>
            <h1 className={cn('text-sm text-black1', poppins_500.className)}>
              {classGradeName}
            </h1>
            {activeTerm ? (
              <div className={cn('text-sm text-gray3 mt-1.5 flex items-center gap-2', poppins_500.className)}>
                <p>{activeTerm.name}</p>
                <div className="h-2 w-2 rounded-full bg-gray2" />
                <p>{formatActiveTermYears(activeTerm)}</p>
              </div>
            ) : null}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col p-0 gap-8">
        <main className="flex justify-between items-center">
          <section className="flex flex-col gap-6 w-full">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className={cn('text-sm text-black1 mb-1.5', poppins_500.className)}>
                  {totalStudents}
                </h3>
                <p className={cn('text-sm text-gray', poppins_400.className)}>
                  Total Students
                </p>
              </div>

              <div>
                <h3 className={cn('text-sm text-black1 items-end text-right mb-1.5', poppins_500.className)}>
                  0%
                </h3>
                <p className={cn('text-sm text-gray', poppins_400.className)}>
                  Average Performance
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className={cn('text-sm text-gray mb-1', poppins_400.className)}>
                Student attendance:
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-baseline gap-2">
                  <h3 className={cn('text-sm text-black1', poppins_500.className)}>{todayAttendance}%</h3>
                  <span className={cn('text-sm text-gray', poppins_400.className)}>Today</span>
                </div>

                <div className="flex items-baseline gap-2 justify-end">
                  <h3 className={cn('text-sm text-black1', poppins_500.className)}>{monthAttendance}%</h3>
                  <span className={cn('text-sm text-gray', poppins_400.className)}>This month</span>
                </div>
              </div>
            </div>
          </section>
        </main>

        <div className="flex w-full justify-between items-center gap-4">
          <div className="flex-1">
            <Button
              round
              flat
              wide
              className={cn('flex  text-primary h-[48px] w-full border bg-primary1 border-primary1')}
            >
              <Timetable color={theme.primary} />
              <span className="text-primary">View timetable</span>
            </Button>
          </div>
        </div>
      </CardContent>

      <SubjectModal
        type="delete"
        title="Delete Subject"
        content="Are you sure you want to delete this subject? this subject can’t be recovered"
        icon={<DeleteModalIcon />}
        open={deleteModal}
        close={() => setDeleteModal(false)}
      />
      <SubjectModal
        type="archive"
        title="Archive study"
        content="Are you sure you want to archive this subjest? it won’t be visible to students and teachers again"
        icon={<ArchiveModalIcon color="#F59E0B" />}
        open={archiveModal}
        close={() => setArchiveModal(false)}
      />
      <SubjectModal
        type="unarchive"
        title="Post Subject"
        content="Are you sure you want to post this subject? This will make it visible to students and teachers"
        icon={
          <UnachiveModalIcon color={{ light: theme.light, primary: theme.primary }} />
        }
        open={unarchiveModal}
        close={() => setUnarchiveModal(false)}
      />
    </Card>
  );
}

export default ClassInfoCard;
