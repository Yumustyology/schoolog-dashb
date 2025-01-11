import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomBinary() {
  return Math.round(Math.random());
}

export const truncateText = (text: string, maxLength: number = 10) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
