import { postRequest, getRequest, patchRequest, deleteRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import {
  CreateFolderRequest,
  UploadResourceRequest,
  ListResourcesQuery,
  UpdateResourceRequest,
  Resource,
} from '@/app/lib/types/resources.types';
import { chunk } from '@/app/lib/utils/resources.utils';
import { buildUploadFormData } from '@/app/lib/utils/formData';


export const createFolder = async (
  payload: CreateFolderRequest
): Promise<ResponseType<Resource>> => {
  return postRequest<Resource>('/resources/folders', payload);
};

export const uploadResource = async (
  payload: UploadResourceRequest
): Promise<ResponseType<Resource>> => {
  const formData = buildUploadFormData(payload.file, {
    name: payload.name,
    folderId: payload.folderId,
    classGradeId: payload.classGradeId,
    classId: payload.classId,
    subjectId: payload.subjectId,
    metadata: payload.metadata,
  });
  return postRequest<Resource>('/resources/upload', formData);
};

export const uploadResourcesBatch = async (
  files: File[],
  options?: {
    folderId?: string;
    classGradeId?: string;
    classId?: string;
    subjectId?: string;
    metadata?: Record<string, any>;
    batchSize?: number;
    concurrency?: number;
  }
): Promise<(ResponseType<Resource> | Error)[]> => {
  const {
    folderId,
    classGradeId,
    classId,
    subjectId,
    metadata,
    batchSize = 4,
    concurrency = 2,
  } = options || {};

  const batches = chunk(files, batchSize);
  const results: (ResponseType<Resource> | Error)[] = [];

  type TrackedUpload = {
    id: number;
    promise: Promise<ResponseType<Resource> | Error>;
  };

  let nextId = 0;

  for (const batch of batches) {
    const batchResults: TrackedUpload[] = [];

    for (const file of batch) {
      const promise = uploadResource({
        file,
        folderId,
        classGradeId,
        classId,
        subjectId,
        metadata,
      }).catch((error) => error);

      batchResults.push({ id: nextId++, promise });

      if (batchResults.length >= concurrency) {
        // Race tagged promises (rather than the raw promises themselves,
        // which Promise auto-flattens) so we can reliably find and remove
        // the one that just settled, instead of an arbitrary element.
        const settled = await Promise.race(
          batchResults.map(({ id, promise }) =>
            promise.then((value) => ({ id, value }))
          )
        );
        results.push(settled.value);
        const idx = batchResults.findIndex((b) => b.id === settled.id);
        if (idx !== -1) batchResults.splice(idx, 1);
      }
    }

    if (batchResults.length > 0) {
      const remaining = await Promise.all(batchResults.map((b) => b.promise));
      results.push(...remaining);
    }
  }

  return results;
};

export const listResources = async (
  query?: ListResourcesQuery
): Promise<ResponseType<Resource[]>> => {
  const params = query ? { ...query } : {};
  return getRequest<Resource[]>('/resources', params);
};

export const getResource = async (id: string): Promise<ResponseType<Resource>> => {
  return getRequest<Resource>('/resources', id);
};

export const updateResource = async (
  id: string,
  payload: UpdateResourceRequest
): Promise<ResponseType<Resource>> => {
  return patchRequest<Resource>(`/resources/${id}`, payload);
};

export const deleteResource = async (id: string): Promise<ResponseType<null>> => {
  return deleteRequest<null>('/resources', id);
};

export const moveResource = async (
  id: string,
  targetFolderId?: string | null
): Promise<ResponseType<Resource>> => {
  return postRequest<Resource>(`/resources/${id}/move`, {
    targetFolderId: targetFolderId ?? null,
  });
};

const resourcesActions = {
  createFolder,
  uploadResource,
  uploadResourcesBatch,
  listResources,
  getResource,
  updateResource,
  deleteResource,
  moveResource,
};

export default resourcesActions;
