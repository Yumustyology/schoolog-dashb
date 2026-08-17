import { getRequest, patchRequest, deleteRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type Book = {
  _id: string;
  title: string;
  author: string;
  copies: number;
  isArchived?: boolean;
};

/**
 * Fetch paginated books for a school
 */
export const fetchBooks = async (
  query?: Record<string, string | number>
): Promise<ResponseType<Book[]>> => {
  return getRequest<Book[]>('/library/books', query);
};

export const fetchBookById = async (
  id: string
): Promise<ResponseType<Book>> => {
  return getRequest<Book>(`/library/book/${id}`);
};

/** Archive a book by id */
export const archiveBook = async (
  id: string
): Promise<ResponseType<Book>> => {
  return patchRequest<Book>(`/library/book/${id}/archive`, {});
};

/** Unarchive a book by id */
export const unarchiveBook = async (
  id: string
): Promise<ResponseType<Book>> => {
  return patchRequest<Book>(`/library/book/${id}/unarchive`, {});
};

/** Delete a book by id */
export const deleteBook = async (
  id: string
): Promise<ResponseType<null>> => {
  return deleteRequest<null>('/library/book', id);
};

const libraryActions = {
  fetchBooks,
  fetchBookById,
  archiveBook,
  unarchiveBook,
  deleteBook,
};

export default libraryActions;
