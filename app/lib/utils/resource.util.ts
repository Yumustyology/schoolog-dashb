import React from 'react';
import type { MaterialType } from '@/app/lib/types/materials.types';
import type { Resource } from '@/app/lib/types/resources.types';
import FolderIcon from '@/components/atoms/icons/dashboard/materials/Folder';
import PdfIcon from '@/components/atoms/icons/dashboard/materials/Pdf';
import WordIcon from '@/components/atoms/icons/dashboard/materials/Word';
import ExcelIcon from '@/components/atoms/icons/dashboard/materials/Excel';
import ImageIcon from '@/components/atoms/icons/dashboard/materials/Image';
import MediumIcon from '@/components/atoms/icons/dashboard/materials/Medium';
import { formatFileSize } from '@/app/lib/utils';
import { FOLDER_PATH_DELIMITER } from '@/app/lib/constants/resources.constants';

export const getFileIcon = (resource: Resource): React.ReactNode => {
  if (resource.type === 'folder') {
    return React.createElement(FolderIcon);
  }

  const mimeType = resource.mimeType?.toLowerCase();
  const fileName = resource.fileName?.toLowerCase() || resource.name.toLowerCase();

  if (mimeType?.includes('pdf') || fileName.endsWith('.pdf')) {
    return React.createElement(PdfIcon);
  }

  if (
    mimeType?.includes('msword') ||
    mimeType?.includes('wordprocessingml') ||
    fileName.endsWith('.doc') ||
    fileName.endsWith('.docx')
  ) {
    return React.createElement(WordIcon);
  }

  if (
    mimeType?.includes('spreadsheet') ||
    mimeType?.includes('excel') ||
    fileName.endsWith('.xls') ||
    fileName.endsWith('.xlsx') ||
    fileName.endsWith('.csv')
  ) {
    return React.createElement(ExcelIcon);
  }

  if (
    mimeType?.startsWith('image/') ||
    fileName.match(/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/)
  ) {
    return React.createElement(ImageIcon);
  }

  if (
    mimeType?.includes('presentation') ||
    mimeType?.includes('powerpoint') ||
    fileName.endsWith('.ppt') ||
    fileName.endsWith('.pptx')
  ) {
    return React.createElement(MediumIcon);
  }

  if (
    mimeType?.startsWith('video/') ||
    fileName.match(/\.(mp4|avi|mov|wmv|flv|mkv|webm)$/)
  ) {
    return React.createElement(MediumIcon);
  }

  if (
    mimeType?.startsWith('audio/') ||
    fileName.match(/\.(mp3|wav|ogg|m4a|flac)$/)
  ) {
    return React.createElement(MediumIcon);
  }

  return React.createElement(MediumIcon);
};

export const convertResourceToMaterial = (resource: Resource): MaterialType => ({
  id: resource._id,
  name: resource.name,
  type: resource.type as 'folder' | 'material',
  icon: getFileIcon(resource),
  size: resource.fileSize ? formatFileSize(resource.fileSize) : '-',
  date: resource.createdAt ? new Date(resource.createdAt).toLocaleDateString() : '-',
  folderId: resource.folderId || undefined,
});

export const parseFolderPath = (folderPath?: string | null): string[] => {
  if (!folderPath) return [];
  return folderPath.split(FOLDER_PATH_DELIMITER).filter(Boolean);
};

export const getCurrentFolderId = (folderIds: string[]): string | undefined => {
  if (folderIds.length === 0) return undefined;
  return folderIds[folderIds.length - 1];
};

export const appendFolderPath = (
  folderPath: string | undefined,
  id: string
): string => {
  if (!folderPath) return id;
  return `${folderPath}${FOLDER_PATH_DELIMITER}${id}`;
};

export const removeLastFolderPath = (folderIds: string[]): string | undefined => {
  if (folderIds.length <= 1) return undefined;
  return folderIds.slice(0, -1).join(FOLDER_PATH_DELIMITER);
};

export const sliceFolderPath = (folderIds: string[], index: number): string | undefined => {
  if (index < 0) return undefined;
  return folderIds.slice(0, index + 1).join(FOLDER_PATH_DELIMITER);
};
