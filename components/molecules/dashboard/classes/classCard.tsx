'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { ArrangeIcon, VIsibilityIcon, AddTeacherIcon, EditIcon, DeleteIcon, PromoteIcon } from '@/components/atoms/icons/Icons';
import MenuLists from '@/components/atoms/dashboard/students/MenuLists';
import Dot from '@/components/atoms/Dot';
import { ClassGrade } from '@/app/lib/types/class.types';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import { mutate } from 'swr';
import showToast from '@/app/lib/utils/toast';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import studentActions from '@/app/lib/actions/student.actions';

const refreshClassLists = () =>
  mutate(
    (key) => typeof key === 'string' && key.startsWith('/class-grades/school'),
    undefined,
    { revalidate: true }
  );

interface ClassCardProps {
  classData: ClassGrade;
  role: 'school' | 'student' | 'teacher';
  onArrange?: () => void;
  totalClasses?: number;
  className?: string;
}

const ClassCard: React.FC<ClassCardProps> = ({
  classData,
  role,
  onArrange,
  totalClasses = 0
}) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [isPromoting, setIsPromoting] = useState(false);
  const [showDemoteModal, setShowDemoteModal] = useState(false);
  const [isDemoting, setIsDemoting] = useState(false);

  const menuItems = [
    {
      label: 'View details',
      onClick: () => router.push(`/${'school'}/classes/${classData._id}`),
      icon: <VIsibilityIcon size={20} />,
    },
    {
      label: 'Add student',
      onClick: () => router.push(`/${'school'}/students/${classData._id}/add-new-student`),
      icon: <AddTeacherIcon size={24} color="#828282" />,
    },
    {
      label: 'Edit class',
      onClick: () => router.push(`/${'school'}/classes/${classData._id}/edit/`),
      icon: <EditIcon size={20} />,
    },
    {
      label: 'Promote class',
      onClick: () => setShowPromoteModal(true),
      icon: <PromoteIcon />,
    },
    {
      label: 'Demote class',
      onClick: () => setShowDemoteModal(true),
      icon: (
        <span className="inline-block rotate-180">
          <PromoteIcon />
        </span>
      ),
    },
    {
      label: 'Delete',
      onClick: () => setShowDeleteModal(true),
      icon: <DeleteIcon />,
      danger: true,
    },
  ];

  return (
    <div
      key={classData._id}
      className="w-full flex flex-col gap-3 justify-between bg-white min-h-[125px] border border-gray-100 rounded-xl p-4 shadow-sm relative"
    >
      <div className="flex items-start justify-between">
        <h3 className={cn('text-base text-[#071E3B] ', poppins_500.className)}>
          {classData?.name}
        </h3>
        {totalClasses >= 2 && (
          <button
            type="button"
            aria-label="Arrange class"
            onClick={(e) => {
              e.stopPropagation();
              onArrange?.();
            }}
            className="text-gray-300 text-xs cursor-pointer p-1 rounded"
          >
            <ArrangeIcon color="#CECECE" />
          </button>
        )}
      </div>

      <div className={cn('text-sm flex items-center text-gray-500', poppins_400.className)}>
        <span className="text-gray6 text-sm font-medium">
          {classData.studentCount}
        </span>
        <span className="ml-1 text-gray3 text-sm"> students</span>
        <Dot />
        <span className="text-gray6 text-sm font-medium">
          {classData.studentMaleCount}
        </span>
        <span className="ml-1 text-gray3 text-sm"> Male</span>
        <Dot />
        <span className="text-gray6 text-sm font-medium">
          {classData.studentFemaleCount}
        </span>
        <span className="ml-1 text-gray3 text-sm"> Female</span>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1.5">
          {classData?.classTeacher?.image ? (
            <Image
              src={classData.classTeacher.image}
              alt={classData.classTeacher.firstName}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : null}

          <div>
            <span
              className={cn(
                'text-[#333333] text-sm font-medium ',
                poppins_400.className
              )}
            > 
              {classData?.classTeacher
                ? `${classData.classTeacher.firstName} ${classData.classTeacher.lastName}`
                : 'No assigned teacher'}
            </span>
          </div>
        </div>

        {role === 'school' && (
          <MenuLists
            label="Options"
            items={menuItems}
            placement="bottom-start"
            maxHeight="150px"
          />
        )}
      </div>

      <ConfirmModal
        open={showDeleteModal}
        close={() => setShowDeleteModal(false)}
        title="Delete class"
        body="Are you sure you want to delete this class? This action cannot be undone."
        icon={<DeleteIcon />}
        isLoading={isDeleting}
        confirmText="Delete"
        confirmClassName="bg-r text-white"
        onConfirm={async () => {
          setIsDeleting(true);
          try {
            await classGradeActions.deleteClassGrade(classData._id);
            showToast('Class deleted', 'class-deleted', { type: 'success' });
            setShowDeleteModal(false);
            refreshClassLists();
          } catch (err) {
            console.error(err);
            showToast('Failed to delete class', 'class-delete-error', { type: 'error' });
          } finally {
            setIsDeleting(false);
          }
        }}
      />

      <ConfirmModal
        open={showPromoteModal}
        close={() => setShowPromoteModal(false)}
        title="Promote class"
        body={`This will move every active student currently in ${classData?.name} up to the next class grade. If ${classData?.name} is the highest class grade, its students will be graduated instead. This action cannot be undone.`}
        icon={<PromoteIcon />}
        isLoading={isPromoting}
        confirmText="Promote"
        confirmClassName="bg-primary text-white"
        onConfirm={async () => {
          setIsPromoting(true);
          try {
            const res = await studentActions.promoteClassGrade(classData._id);
            showToast(res.message || 'Class promoted', 'class-promoted', { type: 'success' });
            setShowPromoteModal(false);
            refreshClassLists();
          } catch {
            // handleRequest already surfaces a toast for API errors
          } finally {
            setIsPromoting(false);
          }
        }}
      />

      <ConfirmModal
        open={showDemoteModal}
        close={() => setShowDemoteModal(false)}
        title="Demote class"
        body={`This will move every active student currently in ${classData?.name} down to the previous class grade. This action cannot be undone.`}
        icon={
          <span className="inline-block rotate-180">
            <PromoteIcon />
          </span>
        }
        isLoading={isDemoting}
        confirmText="Demote"
        confirmClassName="bg-r text-white"
        onConfirm={async () => {
          setIsDemoting(true);
          try {
            const res = await studentActions.demoteClassGrade(classData._id);
            showToast(res.message || 'Class demoted', 'class-demoted', { type: 'success' });
            setShowDemoteModal(false);
            refreshClassLists();
          } catch {
            // handleRequest already surfaces a toast for API errors
          } finally {
            setIsDemoting(false);
          }
        }}
      />
    </div>
  );
};

export default ClassCard;
