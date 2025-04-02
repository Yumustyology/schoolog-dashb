export function truncateText(text: string, length: number = 20): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function truncateFileText(text: string, length: number = 20): string {
  if (text.length <= length) return text;

  const lastDotIndex = text.lastIndexOf('.');
  if (lastDotIndex === -1) return text.slice(0, length) + '...';

  const namePart = text.slice(0, lastDotIndex);
  const extension = text.slice(lastDotIndex);

  const truncatedName =
    namePart.length > length ? namePart.slice(0, length) + '...' : namePart;

  return truncatedName + extension;
}
