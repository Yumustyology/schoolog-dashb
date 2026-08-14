import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn, truncateFileName, formatFileSize } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import { Upload_Icon2 } from '@/components/atoms/icons/Icons';
import Modal from '@/components/molecules/Modal';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FileUploader from '@/components/atoms/form/FileUploader';
import { uploadResourcesBatch } from '@/app/lib/actions/resources.action';
import showToast from '@/app/lib/utils/toast';
import { getCurrentFolderId, parseFolderPath } from '@/app/lib/utils/resource.util';

interface UploadResourcesModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  classGradeId?: string;
  classId?: string;
  subjectId?: string;
  folderId?: string;
  accept?: Record<string, string[]>;
  maxSizeInMB?: number;
  onUploadSuccess?: () => void;
}

export const UploadResourcesModal = ({
  isOpen,
  setIsOpen,
  classGradeId,
  classId,
  subjectId,
  folderId,
  accept,
  maxSizeInMB = 50,
  onUploadSuccess,
}: UploadResourcesModalProps) => {
  const searchParams = useSearchParams();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const urlClassGradeId = searchParams.get('classGrade') || undefined;
  const urlSubjectId = searchParams.get('subjectId') || undefined;
  const urlFolderPath = searchParams.get('folder') || undefined;
  const effectiveClassGradeId = classGradeId ?? classId ?? urlClassGradeId;
  const effectiveSubjectId = subjectId ?? urlSubjectId;
  const effectiveFolderId = folderId ?? getCurrentFolderId(parseFolderPath(urlFolderPath));

  const handleFileSelected = (file: File | null) => {
    if (file) {
      setSelectedFiles(prev => [...prev, file]);
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
    }
  };

  const handleRemoveFile = (index: number) => {
    const file = selectedFiles[index];
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setUploadProgress(prev => {
      const updated = { ...prev };
      delete updated[file.name];
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    try {
      const results = await uploadResourcesBatch(selectedFiles, {
         folderId: effectiveFolderId,
        classGradeId: effectiveClassGradeId,
        classId,
        subjectId: effectiveSubjectId,
        batchSize: 4,
        concurrency: 2,
      });

      const errors = results.filter(r => r instanceof Error || !r);
      if (errors.length > 0) {
        showToast(
          `${errors.length} file(s) failed to upload`,
          'upload-error',
          { theme: 'light', type: 'error' }
        );
      } else {
        showToast(
          `${selectedFiles.length} file(s) uploaded successfully`,
          'upload-success',
          { theme: 'light', type: 'success' }
        );
        onUploadSuccess?.();
      }

      setSelectedFiles([]);
      setUploadProgress({});
      setIsOpen();
    } catch (error) {
      showToast('Upload failed', 'upload-error', { theme: 'light', type: 'error' });
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={setIsOpen} title="Upload resources" className="w-full tablet:w-[550px] tablet:h-[600px]">
      <div className="h-[390px] overflow-y-scroll px-2 w-full">
        <div className="">
          <FileUploader
            onFileSelected={handleFileSelected}
            accept={accept}
            maxSizeInMB={maxSizeInMB}
            multiple={true}
            overwriteAccepted={!accept}
            bordered={false}
            className="mx-auto mb-4 mt-4"
            renderUI={({ isDragOver, getInputProps }) => {
              const inputProps = getInputProps() as React.InputHTMLAttributes<HTMLInputElement>;
              return (
                <>
                  <input {...inputProps} />
                  <div 
                    className={cn(
                      "text-center --bg-primary bg-opacity-5 border-2 border-dashed rounded-xl w-full py-7 px-10 cursor-pointer transition-all",
                      isDragOver ? "border-primary bg-opacity-10" : "border-primary border-opacity-15"
                    )}
                  >
                    <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary-- bg-opacity-5 border border-primary border-opacity-15 mx-auto mb-3">
                      <Upload_Icon2 />
                    </div>
                    <p className={cn('text-sm text-primary', poppins_400.className)}>
                      {isDragOver ? 'Drop files here' : 'Drag & drop files or click to select'}
                    </p>
                    <p className={cn('mt-2 text-gray', poppins_400.className)}>
                      {accept ? 'Supported formats specified' : 'Supports all file formats'} (Max: {maxSizeInMB}MB)
                    </p>
                  </div>
                </>
              );
            }}
          />

          {selectedFiles.length > 0 && (
            <div className="mt-8">
              <h3
                className={cn('text-base text-gray mb-6', poppins_500.className)}
              >
                Selected Files ({selectedFiles.length})
              </h3>
              <div className="flex flex-col gap-3">
                {selectedFiles.map((file, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center bg-gray4 p-3.5 rounded-md"
                  >
                    <div className="flex gap-3 flex-1">
                      <div>
                        <Upload_Icon2 />
                      </div>
                      <div className="flex-col gap-1.5 flex-1">
                        <h6 className={cn('text-sm text-gray6', poppins_500.className)}>
                          {file.name}
                        </h6>
                        <p className="text-xs text-gray3">
                          {formatFileSize(file.size)}
                        </p>
                        {uploadProgress[file.name] !== undefined && uploadProgress[file.name] > 0 && (
                          <div className="w-full bg-gray-300 rounded-full h-1 mt-2">
                            <div
                              className="bg-primary h-1 rounded-full transition-all"
                              style={{ width: `${uploadProgress[file.name]}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {!isUploading && (
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Button 
        wide 
        round 
        className="h-12 mt-7" 
        onClick={handleSubmit}
        disabled={selectedFiles.length === 0 || isUploading}
      >
        {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length > 0 ? `${selectedFiles.length} ` : ''}resource${selectedFiles.length !== 1 ? 's' : ''}`}
      </Button>
    </Modal>
  );
};

