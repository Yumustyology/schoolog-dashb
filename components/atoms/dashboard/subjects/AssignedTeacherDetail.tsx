import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';
import React from 'react';
import { CancelDrawerIcon } from '../../icons/Icons';
import SubjectModal from './subjectsInfoModals/SubjectModal';
import TextAvatar from '@/components/atoms/TextAvatar';
import AvatarIcon from '@/components/atoms/AvatarIcon';

export const AssignedTeacherDetail = ({
  name,
  img,
  subjectAssignedTo,
  setIsTeacherListOpen,
}: {
  name: string;
  img?: any;
  subjectAssignedTo: string;
  setIsTeacherListOpen: any;
}) => {
  const [isRemoveTeacherModalOpen, setIsRemoveTeacherModal] =
    React.useState(false);
  const isStringImg = typeof img === 'string' && img.length > 0;

  return (
    <div>
      <div className="bg-[#f8f8f8] rounded-xl py-3 px-3 mb-4">
        <div className="flex justify-between items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-gray-200">
            {isStringImg ? (
              <Image src={img} alt={name} width={36} height={36} className="w-full h-full object-cover" />
            ) : name ? (
              <TextAvatar firstName={name.split(' ')[0] || ''} lastName={name.split(' ')[1] || ''} size={36} />
            ) : (
              <AvatarIcon size={36} />
            )}
          </div>
          <div className="flex justify-between items-center w-full">
            <div>
              <h3
                className={cn('text-sm font-medium text-gray1', poppins_500.className)}
              >
                {name}
              </h3>
              <p className={cn('text-xs text-gray-500', poppins_400.className)}>
                Assigned to {subjectAssignedTo}
              </p>
            </div>
          </div>

          <div
            className="cursor-pointer p-1 hover:bg-gray-200 rounded-full transition-colors"
            onClick={() => {
              setIsRemoveTeacherModal(true);
            }}
          >
            <CancelDrawerIcon />
          </div>
        </div>
      </div>
      <SubjectModal
        type="delete"
        title="Remove Teacher"
        content={`Are you sure you want to remove ${name} from ${subjectAssignedTo} teachers?`}
        icon={<CancelDrawerIcon />}
        open={isRemoveTeacherModalOpen}
        close={() => setIsRemoveTeacherModal(false)}
      />
    </div>
  );
};

