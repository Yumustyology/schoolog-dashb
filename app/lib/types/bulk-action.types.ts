export type BulkActionItemResult = {
  id: string;
  status: 'success' | 'failed';
  message: string;
};

export type BulkActionSummary = {
  total: number;
  successCount: number;
  failureCount: number;
  results: BulkActionItemResult[];
};
