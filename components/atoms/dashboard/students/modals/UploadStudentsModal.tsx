import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import { AdditionIcon, Upload_Icon2 } from '@/components/atoms/icons/Icons';
import Modal from '@/components/molecules/Modal';
import React from 'react';
import { AddedResource } from '../../subjects/AddedResource';
import { useEntity } from 'simpler-state';
import {
  closeUploadStudentModal,
  isUploadStudentsOpen,
} from '@/app/lib/entities/student.entity';
import { UploadStudentsFile } from '../UploadStudentFile';

export const UploadStudentsModal = () => {
  const isOpen = useEntity(isUploadStudentsOpen);
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeUploadStudentModal}
      title="Upload Students"
    >
      <div className="max-h-80 overflow-y-scroll px-2">
        <div className="">
          <p
            className={cn('text-base text-center my-5', poppins_500.className)}
          >
            Upload bulk students at a time by <br /> just uploading student file
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
        onClick={closeUploadStudentModal}
      >
        Upload Students
      </Button>
    </Modal>
  );
};
