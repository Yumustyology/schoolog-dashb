import { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import axiosConfig, { baseURL } from '../config/axios.config';
import { handleError } from '../utils/handleError';
import type { ResponseType } from '../types/api-response.types';

const handleRequest = async <T>(
  request: Promise<AxiosResponse<ResponseType<T>>>,
  handleInternalError: boolean = true
): Promise<ResponseType<T>> => {
  try {
    const response = await request;
    return response.data;
  } catch (e: unknown) {
    const axiosError = e as AxiosError<ResponseType<T>>;

    if (axiosError.response?.data) {
      if (handleInternalError) {
        handleError(axiosError.response.data);
      }
      throw axiosError.response.data;
    }

    if (handleInternalError) {
      handleError(axiosError);
    }

    throw axiosError;
  }
};

export const generalGetRequest = async <T>(
  url: string,
  payload?: string,
  token?: string
): Promise<ResponseType<T>> => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return handleRequest(
    axiosConfig.get<ResponseType<T>>(`${url}${payload ? `/${payload}` : ''}`, { headers })
  );
};

export const postRequest = async <T>(
  endpoint: string,
  payload: unknown
): Promise<ResponseType<T>> => {
  const config = {
    headers: {
      ...(payload instanceof FormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' }),
    },
  };

  return handleRequest(axiosConfig.post<ResponseType<T>>(endpoint, payload, config));
};

export const putRequest = async <T>(
  endpoint: string,
  payload: unknown
): Promise<ResponseType<T>> => {
  return handleRequest(axiosConfig.put<ResponseType<T>>(endpoint, payload));
};

export const patchRequest = async <T>(
  endpoint: string,
  payload: unknown
): Promise<ResponseType<T>> => {
  return handleRequest(axiosConfig.patch<ResponseType<T>>(endpoint, payload));
};

export const deleteRequest = async <T>(
  endpoint: string,
  payload?: string
): Promise<ResponseType<T>> => {
  return handleRequest(
    axiosConfig.delete<ResponseType<T>>(`${endpoint}${payload ? `/${payload}` : ''}`)
  );
};

export const getRequest = async <T>(
  endpoint: string,
  payload?: string | Record<string, unknown>
): Promise<ResponseType<T>> => {
  let url = endpoint;
  let config = {};

  if (typeof payload === 'string') {
    url += `/${payload}`;
  } else if (typeof payload === 'object' && payload !== null) {
    config = { params: payload };
  }

  return handleRequest(axiosConfig.get<ResponseType<T>>(url, config));
};

/** Downloads a binary response (e.g. a generated CSV/XLSX file) and returns it with its server-suggested filename. */
export const getFileRequest = async (
  endpoint: string,
  params?: Record<string, unknown>
): Promise<{ blob: Blob; filename: string }> => {
  const response = await axiosConfig.get(endpoint, {
    params,
    responseType: 'blob',
  });

  const disposition = response.headers['content-disposition'] as string | undefined;
  const match = disposition?.match(/filename="?([^"]+)"?/);
  const filename = match?.[1] || 'download';

  return { blob: response.data as Blob, filename };
};

// allow sending extra headers (useful for server-side requests where axios interceptor
// can't derive tenant from window.location)
export const getRequestWithHeaders = async <T>(
  endpoint: string,
  payload?: string | Record<string, unknown>,
  extraHeaders?: Record<string, string>
): Promise<ResponseType<T>> => {
  let url = endpoint;
  let config: Record<string, unknown> = {};

  if (typeof payload === 'string') {
    url += `/${payload}`;
  } else if (typeof payload === 'object' && payload !== null) {
    config = { params: payload };
  }

  if (extraHeaders) {
    config = { ...config, headers: extraHeaders };
  }

  // Use a direct axios call (not the shared axiosConfig with client interceptors)
  // for server-side requests so we don't trigger client-side storage logic.
  const fullUrl = `${baseURL}${url.replace(/^\/*/, '')}`;
  return handleRequest(axios.get<ResponseType<T>>(fullUrl, config));
};

export const publicGetRequest = async <T>(
  endpoint: string,
  payload?: string | Record<string, unknown>
): Promise<ResponseType<T>> => {
  let url = endpoint;
  const config: Record<string, unknown> = {
    headers: {
      'X-api-public': true,
    },
  };

  if (typeof payload === 'string') {
    url += `/${payload}`;
  } else if (typeof payload === 'object' && payload !== null) {
    config.params = payload;
  }

  return handleRequest(axiosConfig.get<ResponseType<T>>(url, config));
};

export const publicPostRequest = async <T>(
  endpoint: string,
  payload: unknown
): Promise<ResponseType<T>> => {
  const config = {
    headers: {
      'X-api-public': true,
      ...(payload instanceof FormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' }),
    },
  };

  return handleRequest(axiosConfig.post<ResponseType<T>>(endpoint, payload, config));
};

export const publicPutRequest = async <T>(
  endpoint: string,
  payload: unknown
): Promise<ResponseType<T>> => {
  return handleRequest(
    axiosConfig.put<ResponseType<T>>(endpoint, payload, {
      headers: { 'X-api-public': true },
    })
  );
};

export const publicPatchRequest = async <T>(
  endpoint: string,
  payload: unknown
): Promise<ResponseType<T>> => {
  return handleRequest(
    axiosConfig.patch<ResponseType<T>>(endpoint, payload, {
      headers: { 'X-api-public': true },
    })
  );
};

export const publicDeleteRequest = async <T>(
  endpoint: string,
  payload: unknown
): Promise<ResponseType<T>> => {
  return handleRequest(
    axiosConfig.delete<ResponseType<T>>(`${endpoint}/${payload}`, {
      headers: { 'X-api-public': true },
    })
  );
};
