import React from 'react';
import { useEntity } from 'simpler-state';
import {
  closeUploadTeacherModal,
  isUploadTeachersOpen,
} from '@/app/lib/entities/staff.entity';
import { BulkImportUploadModal } from '@/components/atoms/dashboard/BulkImportUploadModal';
import staffActions from '@/app/lib/actions/staff.action';

export const UploadTeachersModal = () => {
  const isOpen = useEntity(isUploadTeachersOpen);

  return (
    <BulkImportUploadModal
      isOpen={isOpen}
      onClose={closeUploadTeacherModal}
      title="Upload Teachers"
      description={
        <>
          Upload bulk teachers at a time by <br /> just uploading teacher file
        </>
      }
      submitLabel="Upload teachers"
      entityLabel="teacher(s)"
      onUpload={staffActions.bulkCreateStaff}
      onDownloadSample={staffActions.downloadStaffBulkSample}
      staticFallbackBaseName="staff-bulk-import-sample"
      mutateKeyPrefix="staff"
      uploadErrorMessage="Failed to upload teachers file"
    />
  );
};
