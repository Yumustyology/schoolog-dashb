import type { ApiResponse, ApiListResponse } from './api-response.types';

/**
 * Resource Types
 */
export type ResourceType = 'folder' | 'material';

export type Resource = {
  _id: string;
  name: string;
  type: ResourceType;
  folderId?: string | null;
  classGradeId?: string | null;
  subjectId?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  mimeType?: string | null;
  uploadedBy?: string | null;
  metadata?: Record<string, any>;
  archived?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Request/Response Types
 */
export type CreateFolderRequest = {
  name: string;
  parentFolderId?: string;
  classGradeId?: string;
  subjectId?: string;
  metadata?: Record<string, any>;
};

export type CreateFolderResponse = ApiResponse<Resource>;

export type UploadResourceRequest = {
  file: File;
  name?: string;
  folderId?: string;
  classGradeId?: string;
  classId?: string;
  subjectId?: string;
  metadata?: Record<string, any>;
};

export type UploadResourceResponse = ApiResponse<Resource>;

export type ListResourcesQuery = {
  folderId?: string | null;
  classGradeId?: string;
  subjectId?: string;
  type?: ResourceType;
  search?: string;
  page?: number;
  limit?: number;
  archived?: boolean;
};

export type ListResourcesResponse = ApiListResponse<Resource>;

export type UpdateResourceRequest = {
  name?: string;
  folderId?: string | null;
  metadata?: Record<string, any>;
};

export type UpdateResourceResponse = ApiResponse<Resource>;

export type MoveResourceRequest = {
  targetFolderId?: string | null;
};

export type MoveResourceResponse = ApiResponse<Resource>;

export type DeleteResourceResponse = ApiResponse<null>;

export type DownloadResourceOptions = {
  rangeStart?: number;
  rangeEnd?: number;
};
