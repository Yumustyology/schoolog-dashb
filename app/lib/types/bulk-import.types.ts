export type BulkImportRowResult = {
  row: number;
  identifier: string;
  status: 'success' | 'failed';
  message: string;
};

export type BulkImportSummary = {
  totalRows: number;
  successCount: number;
  failureCount: number;
  results: BulkImportRowResult[];
};
