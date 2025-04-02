import { cn } from '@/app/lib/utils';
import React, { useState, useCallback, ReactNode } from 'react';
import { useDropzone } from 'react-dropzone';

export type renderUIProps = {
  isDragOver: boolean;
  file: File | null;
  fileSize: string | null;
  fileName: string | null;
  removeImage: (event?: React.MouseEvent) => void;
  getInputProps: () => object;
};

interface ImageUploaderProps {
  onImageSelected: (file: File | null) => void;
  className?: string;
  renderUI: (props: renderUIProps) => ReactNode;
  accept?: Record<string, string[]>;
  overwriteAccepted?: boolean;
  bordered?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  renderUI,
  className,
  accept,
  bordered = true,
  overwriteAccepted = false,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];

      const maxSizeInMB = 5;
      if (selectedFile.size > maxSizeInMB * 1024 * 1024) {
        // showToast(
        //   `File is too large. Maximum size is ${maxSizeInMB}MB.`,
        //   'file-size-large',
        //   {
        //     theme: 'light',
        //     type: 'info',
        //   }
        // );
        setFile(null);
        onImageSelected(null);
        return;
      }

      setFile(selectedFile);
      onImageSelected(selectedFile);
      setIsDragOver(true);
    },
    [onImageSelected]
  );

  // Default accepted MIME types
  const defaultAccept = {
    'image/jpeg': [],
    'image/png': [],
    'image/svg+xml': [],
    'image/jpg': [],
    'image/gif': [],
    'image/webp': [],
  };

  // Determine the final accept object
  const finalAccept = overwriteAccepted
    ? accept || defaultAccept
    : { ...defaultAccept, ...accept };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: finalAccept,
    multiple: false,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
  });

  const removeImage = (event?: React.MouseEvent) => {
    event?.stopPropagation?.();
    setFile(null);
    onImageSelected(null);
    setIsDragOver(false);
  };

  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const fileSize = file ? formatFileSize(file.size) : null;
  const fileName = file ? file.name : null;

  return (
    <div
      {...getRootProps()}
      className={cn(
        `relative w-full overflow-x-hidden lg:h-44 bg-[#FCFFFD] rounded-lg border-dashed border-2 cursor-pointer transition-opacity py-5 lg:py-0`,
        isDragOver ? 'border-primary' : 'border-gray-200',
        !bordered ? 'border-none p-0 lg:h-auto' : '',
        className
      )}
    >
      {renderUI({
        isDragOver,
        file,
        fileSize,
        fileName,
        removeImage,
        getInputProps,
      })}
    </div>
  );
};

export default ImageUploader;
