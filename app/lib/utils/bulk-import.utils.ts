import { triggerBlobDownload } from '@/app/lib/utils';

/**
 * Fetches a static bulk-import sample file from /public/samples and triggers
 * a browser download. Used as a fallback when the backend-generated sample
 * endpoint is unreachable.
 */
export async function downloadStaticBulkImportSample(
  baseName: string,
  format: 'csv' | 'xlsx'
): Promise<void> {
  const filename = `${baseName}.${format}`;
  const response = await fetch(`/samples/${filename}`);
  if (!response.ok) {
    throw new Error(`Static sample file not found: ${filename}`);
  }
  triggerBlobDownload(await response.blob(), filename);
}
