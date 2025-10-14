export type ResponseType<T = any> = {
  status: 'success' | 'fail';
  statusCode?: number;
  message: string;
  data?: T;
  error?: any;
  meta?: {
    page?: number;
    limit?: number;
    totalPages?: number;
    count?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
  };
};

export default ResponseType;
