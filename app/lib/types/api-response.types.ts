/**
 * Generic API Response format used across all endpoints.
 * All API responses follow this structure.
 */
export type ApiMeta = {
  count?: number;
  page?: string | number;
  limit?: string | number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
};

export interface ResponseType<T = unknown> {
  status: 'success' | 'fail' | 'error';
  message: string;
  statusCode: number;
  data?: T;
  meta?: {
    count: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export type PaginationMeta = NonNullable<ResponseType['meta']>;

export type ApiResponse<T = any> = {
  data: T;
  message: string;
  status: 'success' | 'error';
  statusCode: number;
  meta?: ApiMeta;
};

export type ApiListResponse<T = any> = ApiResponse<T[]>;
