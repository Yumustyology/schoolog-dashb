import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomBinary() {
  return Math.round(Math.random());
}

import type { ActiveTerm } from '@/app/lib/types/class.types';

export function formatActiveTermYears(term?: ActiveTerm | null) {
  if (!term) return '';
  try {
    const start = term.startDate ? new Date(term.startDate).getFullYear() : undefined;
    const end = term.endDate ? new Date(term.endDate).getFullYear() : undefined;
    if (start && end) return `${start}/${end}`;
    if (start) return `${start}`;
    if (end) return `${end}`;
  } catch {
    // fallback to empty
  }
  return '';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/** Two-letter initials from a first/last name, e.g. "Jane" + "Doe" -> "JD". Blank-safe. */
export function getInitials(firstName?: string | null, lastName?: string | null): string {
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
}

/** Formats an amount stored in the smallest currency unit (kobo/cents) as a display string, e.g. formatCurrency(1000000, 'NGN') -> "₦10,000". */
export function formatCurrency(amountInSmallestUnit: number, currency = 'NGN'): string {
  try {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amountInSmallestUnit / 100);
  } catch {
    return `${currency} ${(amountInSmallestUnit / 100).toLocaleString()}`;
  }
}

/** Triggers a browser "Save As" download for an in-memory Blob (e.g. a downloaded file response). */
export function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function truncateFileName(fileName: string, maxBaseLength = 19): string {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex <= 0 || lastDotIndex === fileName.length - 1) {
    return fileName.length > maxBaseLength
      ? `${fileName.slice(0, maxBaseLength)}...`
      : fileName;
  }

  const baseName = fileName.slice(0, lastDotIndex);
  const extension = fileName.slice(lastDotIndex);

  if (baseName.length <= maxBaseLength) {
    return `${baseName}${extension}`;
  }

  return `${baseName.slice(0, maxBaseLength)}...${extension}`;
}
