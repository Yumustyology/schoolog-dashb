import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import { Upload_Icon2 } from '@/components/atoms/icons/Icons';
import Modal from '@/components/molecules/Modal';
import React from 'react';
import { useEntity } from 'simpler-state';
import { UploadStudentsFile } from '../../students/UploadStudentFile';
import {
  closeUploadTeacherModal,
  isUploadTeachersOpen,
} from '@/app/lib/entities/staff.entity';

export const UploadTeachersModal = () => {
  const isOpen = useEntity(isUploadTeachersOpen);
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeUploadTeacherModal}
      title="Upload Teachers"
    >
      <div className="max-h-80 overflow-y-scroll px-2">
        <div className="">
          <p
            className={cn('text-base text-center my-5', poppins_500.className)}
          >
            Upload bulk teachers at a time by <br /> just uploading teacher file
          </p>
          <p></p>

          <div className="mx-auto mb-4 mt-4 text-center bg-primary bg-opacity-5 border border-primary rounded-xl border-opacity-15 w-full py-7 px-10">
            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary bg-opacity-5  border border-primary border-opacity-15  mx-auto mb-3">
              <Upload_Icon2 />
            </div>
            <p className={cn('text-sm text-primary', poppins_400.className)}>
              {' '}
              Upload file{' '}
            </p>
            <p className={cn('mt-2 text-gray', poppins_400.className)}>
              This upload supports <br /> .csv format
            </p>
          </div>

          <div className="mt-8 ">
            <div className="flex flex-col gap-3">
              <UploadStudentsFile />
            </div>
          </div>
        </div>
      </div>
      <Button
        wide
        round
        className="h-12 mt-7"
        onClick={closeUploadTeacherModal}
      >
        Upload teachers
      </Button>
    </Modal>
  );
};
