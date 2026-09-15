import { postRequest, getRequest, patchRequest, deleteRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import type {
  Book,
  BookMaterial,
  BookReader,
  BorrowRecord,
  ListBooksQuery,
  ListBorrowsQuery,
} from '@/app/lib/types/library.types';

export type CreateBookPayload = {
  title: string;
  author: string;
  copies: number;
};

export const createBook = async (
  payload: CreateBookPayload
): Promise<ResponseType<Book>> => {
  return postRequest<Book>('/library/book', payload);
};

export const uploadOnlineBook = async (payload: {
  file: File;
  title: string;
  author: string;
}): Promise<ResponseType<Book>> => {
  const formData = new FormData();
  formData.append('file', payload.file);
  formData.append('title', payload.title);
  formData.append('author', payload.author);
  return postRequest<Book>('/library/book/online', formData);
};

export const listBooks = async (
  query?: ListBooksQuery
): Promise<ResponseType<Book[]>> => {
  return getRequest<Book[]>('/library/books', query as Record<string, unknown>);
};

export const getBook = async (id: string): Promise<ResponseType<Book>> => {
  return getRequest<Book>('/library/book', id);
};

export const openBook = async (id: string): Promise<ResponseType<BookMaterial>> => {
  return getRequest<BookMaterial>(`/library/book/${id}/open`);
};

export const getBookReaders = async (
  id: string,
  pagination?: { page?: number; limit?: number }
): Promise<ResponseType<BookReader[]>> => {
  return getRequest<BookReader[]>(
    `/library/book/${id}/readers`,
    pagination as Record<string, unknown>
  );
};

export const archiveBook = async (id: string): Promise<ResponseType<Book>> => {
  return patchRequest<Book>(`/library/book/${id}/archive`, {});
};

export const unarchiveBook = async (id: string): Promise<ResponseType<Book>> => {
  return patchRequest<Book>(`/library/book/${id}/unarchive`, {});
};

export const deleteBook = async (id: string): Promise<ResponseType<null>> => {
  return deleteRequest<null>('/library/book', id);
};

export type BorrowBookPayload = {
  bookId: string;
  audienceId: string;
  audienceType: 'Student' | 'Staff' | 'Admin';
  returnDate: string;
};

export const borrowBook = async (
  payload: BorrowBookPayload
): Promise<ResponseType<BorrowRecord>> => {
  return postRequest<BorrowRecord>('/library/borrow', payload);
};

export const returnBook = async (
  borrowId: string
): Promise<ResponseType<BorrowRecord>> => {
  return postRequest<BorrowRecord>('/library/return', { borrowId });
};

export const listBorrows = async (
  query?: ListBorrowsQuery
): Promise<ResponseType<BorrowRecord[]>> => {
  return getRequest<BorrowRecord[]>('/library/borrows', query as Record<string, unknown>);
};

const libraryActions = {
  createBook,
  uploadOnlineBook,
  listBooks,
  getBook,
  openBook,
  getBookReaders,
  archiveBook,
  unarchiveBook,
  deleteBook,
  borrowBook,
  returnBook,
  listBorrows,
};

export default libraryActions;
