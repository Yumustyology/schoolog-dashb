import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import showToast from '@/app/lib/utils/toast';
import React, { useState, useCallback, ReactNode } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

export type renderUIProps = {
  isDragOver: boolean;
  file: File | null;
  fileSize: string | null;
  fileName: string | null;
  removeImage: (event?: React.MouseEvent) => void;
  getInputProps: () => object;
  previewUrl?: string | null;
};

interface ImageUploaderProps {
  onImageSelected: (file: File | null) => void;
  className?: string;
  renderUI?: (props: renderUIProps) => ReactNode;
  placeholder?: React.ReactNode;
  preview?: boolean;
  accept?: Record<string, string[]>;
  overwriteAccepted?: boolean;
  bordered?: boolean;
  initialImage?: string | File | null; // base64 string, URL, or File
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  renderUI,
  placeholder,
  className,
  accept,
  bordered = true,
  overwriteAccepted = false,
  preview = false,
  initialImage,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Initialize preview from initialImage prop
  React.useEffect(() => {
    if (initialImage) {
      if (typeof initialImage === 'string') {
        // It's a base64 string or URL
        setPreviewUrl(initialImage);
        setFile(null); // No file object for strings
      } else if (initialImage instanceof File) {
        // It's a File object
        setFile(initialImage);
        if (preview && initialImage.type.startsWith('image/')) {
          const url = URL.createObjectURL(initialImage);
          setPreviewUrl(url);
        }
      }
    } else {
      // Clear if initialImage becomes null/undefined
      setFile(null);
      setPreviewUrl(null);
    }
  }, [initialImage, preview]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];

      const maxSizeInMB = 5;
      if (selectedFile.size > maxSizeInMB * 1024 * 1024) {
        showToast(
          `File is too large. Maximum size is ${maxSizeInMB}MB.`,
          'file-size-large',
          {
            theme: 'light',
            type: 'info',
          }
        );
        setFile(null);
        onImageSelected(null);
        return;
      }

      setFile(selectedFile);
      onImageSelected(selectedFile);
      setIsDragOver(true);
      if (preview && selectedFile && selectedFile.type.startsWith('image/')) {
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      }
    },
    [onImageSelected, preview]
  );

  // revoke preview URL when component unmounts or when previewUrl changes
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
    if (previewUrl) {
      // Only revoke blob URLs, not data: or http(s):
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
    }
  };

  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const fileSize = file ? formatFileSize(file.size) : null;
  const fileName = file ? file.name : null;
  // Default UI when renderUI prop is not provided
  const DefaultUI = ({
    isDragOver,
    file,
    fileSize,
    fileName,
    removeImage,
    getInputProps,
    previewUrl,
  }: renderUIProps) => {
    const inputProps = getInputProps() as React.InputHTMLAttributes<HTMLInputElement>;
    return (
      <>
        <input {...inputProps} />
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
          {file || previewUrl ? (
            <div className="flex flex-col items-center gap-2">
              {previewUrl ? (
                <div className="relative h-40 w-full py-4 flex items-center justify-center  rounded">
                  {previewUrl.startsWith('blob:') || previewUrl.startsWith('data:') ? (
                    // object URLs (blob:) and base64 (data:) cannot be handled by next/image — use native img
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewUrl} alt={fileName ?? 'preview'} className="w-full h-full object-contain rounded" />
                  ) : (
                    <Image
                      src={previewUrl ?? ''}
                      alt={fileName ?? 'preview'}
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="(max-width: 640px) 100vw, 280px"
                      className="rounded"
                    />
                  )}
                  <button
                    type="button"
                    onClick={removeImage}
                    aria-label="Remove image"
                    className="absolute top-2 -right-2 bg-white rounded-full shadow p-1 text-gray-600 hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : file ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm font-medium">{fileName}</div>
                  {fileSize ? <div className="text-xs text-gray-500">{fileSize}</div> : null}
                  <button
                    type="button"
                    onClick={removeImage}
                    aria-label="Remove image"
                    className="mt-2 bg-white rounded-full shadow p-1 text-gray-600 hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className={cn('text-center text-sm text-gray-500', isDragOver ? 'opacity-80' : 'opacity-60', poppins_400.className)}>
              {placeholder ? (
                typeof placeholder === 'string' ? <p>{placeholder}</p> : placeholder
              ) : (
                <p>Drag & drop an image here, or click to select one</p>
              )}
            </div>
          )}
        </div>
      </>
    );
  };

  const RenderUI = typeof renderUI === 'function' ? renderUI : DefaultUI;

  return (
    <div
      {...getRootProps()}
      className={cn(
        `relative w-full overflow-x-hidden lg:h-44 bg-[#FCFFFD] rounded-lg border-dashed border-2 cursor-pointer transition-opacity py-5 lg:py-0`,
        isDragOver ? 'border-cdial-orange-500' : 'border-gray-200',
        !bordered ? 'border-none p-0 lg:h-auto' : '',
        className,
      )}
    >
      {RenderUI({
        isDragOver,
        file,
        fileSize,
        fileName,
        removeImage,
        getInputProps,
        previewUrl,
      })}
    </div>
  );
};

export default ImageUploader;
