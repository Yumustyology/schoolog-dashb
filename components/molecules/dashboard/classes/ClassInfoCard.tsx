import {
  ArchiveIcon,
  DeleteIcon,
  UnarchiveIcon,
} from '@/components/atoms/icons/Icons';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn, formatActiveTermYears } from '@/app/lib/utils';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ActiveTerm } from '@/app/lib/types/class.types';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
import Button from '@/components/atoms/form/Button';
import Timetable from '@/components/atoms/icons/SideBar/Timetable';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import showToast from '@/app/lib/utils/toast';
import { mutate } from 'swr';

type StudentCounts = { total: number; male: number; female: number };
type Attendance = { todayPercentage: number; monthPercentage: number };

// `formatActiveTermYears` imported from shared utils

function ClassInfoCard({
  classId,
  classGradeName,
  studentCounts,
  attendance,
  activeTerm,
  isArchived,
}: {
  classId: string;
  classGradeName: string;
  studentCounts?: StudentCounts | null;
  attendance?: Attendance | null;
  activeTerm?: ActiveTerm | null;
  isArchived?: boolean;
}) {
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [unarchiveModal, setUnarchiveModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { theme } = useSlgTheme();

  const revalidateClass = () =>
    mutate((key) => Array.isArray(key) && key[0] === 'class-grade-detail');

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await classGradeActions.deleteClassGrade(classId);
      showToast('Class deleted successfully', 'class-deleted', {
        theme: 'light',
        type: 'success',
      });
      setDeleteModal(false);
      router.push('/school/classes');
    } catch (error) {
      showToast('Failed to delete class', 'class-delete-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error deleting class:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArchive = async () => {
    setIsSubmitting(true);
    try {
      await classGradeActions.archiveClassGrade(classId);
      showToast('Class archived successfully', 'class-archived', {
        theme: 'light',
        type: 'success',
      });
      setArchiveModal(false);
      revalidateClass();
    } catch (error) {
      showToast('Failed to archive class', 'class-archive-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error archiving class:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnarchive = async () => {
    setIsSubmitting(true);
    try {
      await classGradeActions.unarchiveClassGrade(classId);
      showToast('Class unarchived successfully', 'class-unarchived', {
        theme: 'light',
        type: 'success',
      });
      setUnarchiveModal(false);
      revalidateClass();
    } catch (error) {
      showToast('Failed to unarchive class', 'class-unarchive-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error unarchiving class:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="flex justify-between gap-4">
          <Button
            round
            flat
            className={cn('flex text-r2 h-[48px] w-full border border-r2')}
            onClick={() => setDeleteModal(true)}
          >
            <DeleteIcon />
            <span className="text-r2">Delete Class</span>
          </Button>

          {isArchived ? (
            <Button
              round
              className={cn('flex text-primary h-[48px] w-full bg-light')}
              onClick={() => setUnarchiveModal(true)}
            >
              <UnarchiveIcon color={theme.primary} />
              <span className="text-primary">Unarchive</span>
            </Button>
          ) : (
            <Button
              round
              className={cn('flex text-primary h-[48px] w-full bg-light')}
              onClick={() => setArchiveModal(true)}
            >
              <ArchiveIcon color={theme.primary} />
              <span className="text-primary">Archive</span>
            </Button>
          )}
        </div>
      </CardContent>

      <ConfirmModal
        open={deleteModal}
        close={() => setDeleteModal(false)}
        title="Delete Class"
        body="Are you sure you want to delete this class? this action cannot be undone."
        icon={<DeleteIcon size={24} />}
        onConfirm={handleDelete}
        confirmText="Delete"
        isLoading={isSubmitting}
      />
      <ConfirmModal
        open={archiveModal}
        close={() => setArchiveModal(false)}
        title="Archive Class"
        body="Are you sure you want to archive this class? it won’t be visible to students and teachers again."
        icon={<ArchiveIcon color={theme.primary} size={24} />}
        onConfirm={handleArchive}
        confirmText="Archive"
        isLoading={isSubmitting}
      />
      <ConfirmModal
        open={unarchiveModal}
        close={() => setUnarchiveModal(false)}
        title="Unarchive Class"
        body="Are you sure you want to unarchive this class? This will make it visible to students and teachers again."
        icon={<UnarchiveIcon color={theme.primary} size={24} />}
        onConfirm={handleUnarchive}
        confirmText="Unarchive"
        isLoading={isSubmitting}
      />
    </Card>
  );
}

export default ClassInfoCard;
