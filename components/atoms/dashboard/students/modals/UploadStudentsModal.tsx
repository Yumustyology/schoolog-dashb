import React from 'react';
import { useEntity } from 'simpler-state';
import {
  closeUploadStudentModal,
  isUploadStudentsOpen,
} from '@/app/lib/entities/student.entity';
import { BulkImportUploadModal } from '@/components/atoms/dashboard/BulkImportUploadModal';
import studentActions from '@/app/lib/actions/student.actions';

export const UploadStudentsModal = () => {
  const isOpen = useEntity(isUploadStudentsOpen);

  return (
    <BulkImportUploadModal
      isOpen={isOpen}
      onClose={closeUploadStudentModal}
      title="Upload Students"
      description={
        <>
          Upload bulk students at a time by <br /> just uploading student file
        </>
      }
      submitLabel="Upload Students"
      entityLabel="student(s)"
      onUpload={studentActions.bulkCreateStudents}
      onDownloadSample={studentActions.downloadStudentBulkSample}
      staticFallbackBaseName="students-bulk-import-sample"
      mutateKeyPrefix="students"
      uploadErrorMessage="Failed to upload students file"
    />
  );
};
