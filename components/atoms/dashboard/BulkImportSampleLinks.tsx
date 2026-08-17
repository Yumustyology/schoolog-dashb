import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn, triggerBlobDownload } from '@/app/lib/utils';
import { downloadStaticBulkImportSample } from '@/app/lib/utils/bulk-import.utils';
import showToast from '@/app/lib/utils/toast';

type BulkImportSampleLinksProps = {
  onDownload: (format: 'csv' | 'xlsx') => Promise<{ blob: Blob; filename: string }>;
  /** Basename (no extension) of the static file under /public/samples used when the API call fails. */
  staticFallbackBaseName: string;
};

export const BulkImportSampleLinks = ({
  onDownload,
  staticFallbackBaseName,
}: BulkImportSampleLinksProps) => {
  const [downloading, setDownloading] = useState<'csv' | 'xlsx' | null>(null);

  const handleDownload = async (format: 'csv' | 'xlsx') => {
    setDownloading(format);
    try {
      const { blob, filename } = await onDownload(format);
      triggerBlobDownload(blob, filename);
    } catch (apiError) {
      console.warn(
        'Bulk import sample API failed, falling back to static file:',
        apiError
      );
      try {
        await downloadStaticBulkImportSample(staticFallbackBaseName, format);
      } catch (fallbackError) {
        showToast('Failed to download sample file', 'download-sample-error', {
          theme: 'light',
          type: 'error',
        });
        console.error('Error downloading sample file:', fallbackError);
      }
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {(['csv', 'xlsx'] as const).map((format) => (
        <button
          key={format}
          type="button"
          onClick={() => handleDownload(format)}
          disabled={downloading !== null}
          className={cn(
            'flex items-center gap-1.5 text-xs text-primary hover:underline underline-offset-2 disabled:opacity-50',
            poppins_400.className
          )}
        >
          <Download size={14} />
          {downloading === format
            ? 'Downloading…'
            : `Sample ${format.toUpperCase()}`}
        </button>
      ))}
    </div>
  );
};
