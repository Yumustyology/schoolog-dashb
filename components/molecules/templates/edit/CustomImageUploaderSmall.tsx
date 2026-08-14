'use client';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { truncateFileText } from '@/app/lib/utils/truncate';
import { renderUIProps } from '@/components/atoms/form/FileUploader';
import ExportIcon from '@/components/atoms/icons/dashboard/ExportIcon';
import EyeClose from '@/components/atoms/icons/EyeClose';
import { DeleteIcon } from '@/components/atoms/icons/Icons';
import Image from 'next/image';
import React, { useEffect } from 'react';

const CustomImageUploaderSmall = ({
  isDragOver,
  selectedFile,
  file,
  removeFile,
  getInputProps,
  fileSize,
  fileName,
  className,
}: renderUIProps & { selectedFile?: File | null; className?: string }) => {
  useEffect(() => {
    if (!selectedFile) removeFile();
  }, [selectedFile, removeFile]);
  return (
    <>
      <div
        className={cn(
          'flex flex-col justify-between items-center p-4 font-nunito text-sm w-full',
          className
        )}
      >
        {file ? (
          <div className="flex items-center relative w-full">
            <div className="h-[42px] relative w-full max-w-[70px]  flex items-center justify-center">
              {file && file.type.startsWith('image/') && (
                <Image
                  layout="fill"
                  src={URL.createObjectURL(file)}
                  alt="uploaded-file"
                  className="max-w-36"
                />
              )}
            </div>

            <div className="mt-1 ml-3">
              <p
                className={cn(
                  'text-sm text-left rounded-lg leading-4 text-gray6',
                  poppins_500.className
                )}
              >
                Upload by clicking or dropping image here
              </p>
              <p
                className={cn(
                  'text-xs mt-1.5 text-gray3',
                  poppins_400.className
                )}
              >
                {truncateFileText(fileName ?? '', 10)}
                {' - '}
                <span className="mt-[2px] text-[#292D32] text-xs">
                  {fileSize}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              `flex items-center ${isDragOver ? 'text-green-500' : ''}`,
              className
            )}
          >
            <div className="h-[42px] w-[42px] bg-[#ECECEC] flex items-center justify-center rounded-full">
              <ExportIcon color="#828282" size={20} />
            </div>

            <div className="mt-1">
              <p
                className={cn(
                  'text-sm text-left rounded-lg leading-4 text-gray6',
                  poppins_500.className
                )}
              >
                Upload by clicking or dropping image here
              </p>
              <p
                className={cn(
                  'text-xs mt-1.5 text-gray3',
                  poppins_400.className
                )}
              >
                PNG or JPEG file not more than 100KB
              </p>
            </div>

            <input {...getInputProps()} />
          </div>
        )}
        <div className="flex-grow justify-end gap-3 flex items-center bg-red-500-- ">
          <button
            onClick={removeFile}
            type="button"
            className="h-8 w-8 items-center justify-center flex bg-[#ECECEC] rounded-full"
          >
            <EyeClose />
          </button>
          <button
            onClick={removeFile}
            type="button"
            className="h-8 w-8 items-center justify-center flex bg-[#FFEAEA] rounded-full"
          >
            <DeleteIcon className="scale-75" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomImageUploaderSmall;
