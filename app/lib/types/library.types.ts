export type BookFormat = 'physical' | 'online';
export type BookFileType = 'pdf' | 'epub' | 'audio' | 'video' | 'image' | 'other';

export type Book = {
  _id: string;
  title: string;
  author: string;
  copies: number;
  format: BookFormat;
  fileType?: BookFileType | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  mimeType?: string | null;
  isArchived?: boolean;
  schoolId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BookMaterial = {
  _id: string;
  title: string;
  author: string;
  fileUrl: string;
  fileName?: string | null;
  fileType?: BookFileType | null;
  mimeType?: string | null;
};

export type BorrowAudienceType = 'Student' | 'Staff' | 'Admin';

export type BorrowRecord = {
  _id: string;
  bookId: string;
  bookTitle: string | null;
  audienceId: string;
  audienceType: BorrowAudienceType;
  audienceName: string | null;
  audienceImage: string | null;
  borrowedDate: string;
  expecteReturnDate: string;
  returnDate?: string | null;
  isReturned: boolean;
};

export type BookReader = {
  audienceId: string;
  audienceType: BorrowAudienceType;
  audienceName: string | null;
  audienceImage: string | null;
  readCount: number;
  lastReadAt: string;
};

export type ListBooksQuery = {
  page?: number;
  limit?: number;
  search?: string;
  format?: BookFormat;
  fileType?: BookFileType;
  archived?: 'true' | 'false';
};

export type ListBorrowsQuery = {
  page?: number;
  limit?: number;
  bookId?: string;
  audienceId?: string;
  isReturned?: 'true' | 'false';
};
