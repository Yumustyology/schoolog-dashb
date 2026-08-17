import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import FileUploader from '@/components/atoms/form/FileUploader';
import { Upload_Icon2 } from '@/components/atoms/icons/Icons';
import Modal from '@/components/molecules/Modal';
import React, { useState } from 'react';
import { BulkImportSelectedFile } from '@/components/atoms/dashboard/BulkImportSelectedFile';
import { BulkImportResult } from '@/components/atoms/dashboard/BulkImportResult';
import { BulkImportSampleLinks } from '@/components/atoms/dashboard/BulkImportSampleLinks';
import type { BulkImportSummary } from '@/app/lib/types/bulk-import.types';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import showToast from '@/app/lib/utils/toast';
import { mutate } from 'swr';

type BulkImportUploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: React.ReactNode;
  submitLabel: string;
  /** e.g. "teacher(s)" / "student(s)" — used in the result toast copy. */
  entityLabel: string;
  onUpload: (file: File) => Promise<ResponseType<BulkImportSummary>>;
  onDownloadSample: (
    format: 'csv' | 'xlsx'
  ) => Promise<{ blob: Blob; filename: string }>;
  staticFallbackBaseName: string;
  /** SWR key prefix to revalidate on success, e.g. 'staff' / 'students'. */
  mutateKeyPrefix: string;
  uploadErrorMessage: string;
};

export const BulkImportUploadModal = ({
  isOpen,
  onClose,
  title,
  description,
  submitLabel,
  entityLabel,
  onUpload,
  onDownloadSample,
  staticFallbackBaseName,
  mutateKeyPrefix,
  uploadErrorMessage,
}: BulkImportUploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<BulkImportSummary | null>(null);

  const resetState = () => {
    setSelectedFile(null);
    setIsUploading(false);
    setResult(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      const response = await onUpload(selectedFile);
      const summary = response.data;
      if (summary) {
        setResult(summary);
        if (summary.successCount > 0) {
          mutate((key) => Array.isArray(key) && key[0] === mutateKeyPrefix);
        }
        showToast(
          `${summary.successCount} ${entityLabel} created, ${summary.failureCount} failed`,
          `upload-${mutateKeyPrefix}-result`,
          {
            theme: 'light',
            type: summary.failureCount > 0 ? 'warning' : 'success',
          }
        );
      }
    } catch (error) {
      showToast(uploadErrorMessage, `upload-${mutateKeyPrefix}-error`, {
        theme: 'light',
        type: 'error',
      });
      console.error(`Error bulk creating ${mutateKeyPrefix}:`, error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <div className="max-h-80 overflow-y-scroll px-2">
        <div className="">
          <p
            className={cn('text-base text-center my-5', poppins_500.className)}
          >
            {description}
          </p>

          {result ? (
            <BulkImportResult summary={result} />
          ) : (
            <>
              <BulkImportSampleLinks
                onDownload={onDownloadSample}
                staticFallbackBaseName={staticFallbackBaseName}
              />
              <FileUploader
                onFileSelected={handleFileSelected}
                accept={{ 'text/csv': ['.csv'] }}
                bordered={false}
                className="mx-auto mb-4 mt-4"
                renderUI={({ isDragOver, getInputProps }) => {
                  const inputProps =
                    getInputProps() as React.InputHTMLAttributes<HTMLInputElement>;
                  return (
                    <>
                      <input {...inputProps} />
                      <div
                        className={cn(
                          'text-center bg-primary bg-opacity-5 border border-primary rounded-xl border-opacity-15 w-full py-7 px-10',
                          isDragOver && 'bg-opacity-10'
                        )}
                      >
                        <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary bg-opacity-5  border border-primary border-opacity-15  mx-auto mb-3">
                          <Upload_Icon2 />
                        </div>
                        <p
                          className={cn(
                            'text-sm text-primary',
                            poppins_400.className
                          )}
                        >
                          {' '}
                          {isDragOver ? 'Drop file here' : 'Upload file'}{' '}
                        </p>
                        <p
                          className={cn('mt-2 text-gray', poppins_400.className)}
                        >
                          This upload supports <br /> .csv format
                        </p>
                      </div>
                    </>
                  );
                }}
              />

              {selectedFile && (
                <div className="mt-8 ">
                  <div className="flex flex-col gap-3">
                    <BulkImportSelectedFile
                      file={selectedFile}
                      onRemove={() => handleFileSelected(null)}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Button
        wide
        round
        className="h-12 mt-7"
        onClick={result ? handleClose : handleSubmit}
        disabled={!result && (!selectedFile || isUploading)}
        loading={isUploading}
      >
        {result ? 'Done' : submitLabel}
      </Button>
    </Modal>
  );
};
