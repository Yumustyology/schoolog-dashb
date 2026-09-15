'use client';
import React from 'react';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import { CancelDrawerIcon, DocumentFileIcon, Upload_Icon2 } from '@/components/atoms/icons/Icons';
import Modal from '@/components/molecules/Modal';
import { useEntity } from 'simpler-state';
import {
  closeUploadTeacherModal,
  isUploadTeachersOpen,
} from '@/app/lib/entities/staff.entity';
import staffActions, { BulkUploadStaffResult } from '@/app/lib/actions/staff.action';
import showToast from '@/app/lib/utils/toast';

type UploadTeachersModalProps = {
  onUploaded?: () => void;
};

export const UploadTeachersModal = ({ onUploaded }: UploadTeachersModalProps) => {
  const isOpen = useEntity(isUploadTeachersOpen);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [result, setResult] = React.useState<BulkUploadStaffResult | null>(null);

  const reset = () => {
    setFile(null);
    setResult(null);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClose = () => {
    reset();
    closeUploadTeacherModal();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setResult(null);
    if (!selected) {
      setFile(null);
      return;
    }
    if (!/\.csv$/i.test(selected.name)) {
      showToast('Please select a .csv file', 'staff-upload-bad-type', { type: 'error' });
      return;
    }
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) {
      showToast('Choose a CSV file first', 'staff-upload-no-file', { type: 'error' });
      return;
    }
    setIsUploading(true);
    try {
      const res = await staffActions.bulkUploadStaff(file);
      if (res.data) {
        setResult(res.data);
        if (res.data.successCount > 0) {
          onUploaded?.();
        }
        showToast(
          `Imported ${res.data.successCount}/${res.data.totalRows} staff`,
          'staff-upload-done',
          { type: res.data.failureCount > 0 ? 'warning' : 'success' }
        );
      }
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Upload Teachers">
      <div className="max-h-80 overflow-y-scroll px-2">
        <div className="">
          <p className={cn('text-base text-center my-5', poppins_500.className)}>
            Upload bulk teachers at a time by <br /> just uploading a teacher file
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="mx-auto mb-4 mt-4 text-center bg-primary bg-opacity-5 border border-primary rounded-xl border-opacity-15 w-full py-7 px-10 cursor-pointer"
          >
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

          {file && (
            <div className="mt-8 ">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center bg-gray4 p-3.5 rounded-md">
                  <div className="flex gap-3">
                    <div>
                      <DocumentFileIcon />
                    </div>
                    <div className="flex-col gap-1.5">
                      <h6 className={cn('text-sm text-gray6', poppins_500.className)}>
                        {file.name}
                      </h6>
                      <p className="text-xs text-gray3">
                        {(file.size / 1024).toFixed(0)}KB
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    <CancelDrawerIcon />
                  </button>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-4 flex flex-col gap-1 text-xs">
              {result.results
                .filter((r) => r.status === 'failed')
                .slice(0, 10)
                .map((r) => (
                  <p key={r.row} className="text-red-500">
                    Row {r.row} ({r.identifier}): {r.message}
                  </p>
                ))}
            </div>
          )}
        </div>
      </div>
      <Button
        wide
        round
        className="h-12 mt-7"
        onClick={handleUpload}
        loading={isUploading}
        disabled={isUploading || !file}
      >
        Upload teachers
      </Button>
    </Modal>
  );
};
