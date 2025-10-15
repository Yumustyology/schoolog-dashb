/**
 * Date formatting utilities for consistent date display across the application
 */

export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Default format: "Oct 15, 2025"
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return dateObj.toLocaleDateString('en-US', options || defaultOptions);
};

export const formatDateRange = (startDate: string | Date, endDate: string | Date): string => {
  const formattedStart = formatDate(startDate);
  const formattedEnd = formatDate(endDate);
  return `${formattedStart} - ${formattedEnd}`;
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateLong = (date: string | Date): string => {
  return formatDate(date, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateShort = (date: string | Date): string => {
  return formatDate(date, {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  });
};