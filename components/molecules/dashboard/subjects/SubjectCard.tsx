 'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import Link from 'next/link';
import { DeleteModalIcon, OptionIcon } from '@/components/atoms/icons/Icons';
import OptionsSubjectDropdown from '../../../atoms/dashboard/subjects/OptionsSubjectDropdown';
import { SubjectType } from '@/app/lib/types';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import subjectsActions from '@/app/lib/actions/subjects.action';
import { toast } from 'sonner';
import { mutate } from 'swr';

interface SubjectCardProps {
  subject: SubjectType;
  role: 'school' | 'student' | 'teacher';
  onDeleteSuccess?: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, role, onDeleteSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if the image is a base64 string
  const isBase64Image = subject.textbookImg?.startsWith('data:image');

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await subjectsActions.deleteSubject(String(subject.id));
      
      if (response?.data?.status === 'success') {
        toast.success('Subject deleted successfully');
        setShowDeleteModal(false);
        
        // Invalidate SWR cache to refresh the subjects list
        mutate(key => typeof key === 'string' && key.includes('/subjects/school'));
        
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      } else {
        toast.error('Failed to delete subject');
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
      toast.error('An error occurred while deleting the subject');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      key={subject.id}
      className="flex flex-col gap-4 min-w-[300px] relative"
    >
      <Link href={`/${role}/subjects/1234`}>
        {isBase64Image ? (
          <img
            className="w-full rounded-lg object-cover"
            src={subject.textbookImg}
            alt={subject.subject}
          />
        ) : (
          <Image
            className="w-full"
            src={subject.textbookImg}
            alt={subject.subject}
            width={300}
            height={200}
          />
        )}
      </Link>
      <div className="flex flex-col gap-3">
        {/* <Link href={`/${role}/subjects/1234`}> */}
        <div className="flex justify-between items-center">
          <h3
            className={cn(
              'text-base text-gray1 font-semibold',
              poppins_500.className
            )}
          >
            {subject.subject}
          </h3>
          {role === 'school' && (
            <div>
              <div
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <OptionIcon />
              </div>

              <OptionsSubjectDropdown 
                setIsOpen={setIsOpen} 
                isOpen={isOpen} 
                onDelete={handleDeleteClick}
              />
            </div>
          )}
        </div>
        {/* </Link> */}
        <p className={cn('text-sm text-gray6', poppins_400.className)}>
          {subject.currentTopic}
        </p>
        <div
          className={cn(
            'flex items-center gap-2 text-gray6',
            poppins_400.className
          )}
        >
          <div className="flex items-center gap-2">
            {subject.teacherImg && (
              subject.teacherImg.startsWith('data:image') ? (
                <img 
                  src={subject.teacherImg} 
                  alt={subject.teacher || 'Teacher'}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <Image 
                  src={subject.teacherImg} 
                  alt={subject.teacher || 'Teacher'}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )
            )}
            <span>{subject.teacher}</span>
          </div>
          <div className="h-2 w-2 rounded-full bg-gray2"></div>
          <p className="text-sm">
            <span className="font-semibold">
              {subject.number_of_topics_covered}{' '}
            </span>
            /{subject.number_of_topics} topics covered
          </p>
        </div>
      </div>

      <ConfirmModal
        open={showDeleteModal}
        close={() => setShowDeleteModal(false)}
        title="Delete Subject"
        body="Are you sure you want to delete this subject? This action cannot be undone."
        icon={<DeleteModalIcon />}
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
        confirmClassName="bg-r text-white"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default SubjectCard;
