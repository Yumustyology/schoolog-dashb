// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { AxiosResponse } from 'axios';
import axios from 'axios';
import axiosConfig, { baseURL } from '../config/axios.config';
import { handleError } from '../utils/handleError';

const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>
): Promise<AxiosResponse<T> | void> => {
  try {
    return await request;
  } catch (e: any) {
    handleError(e);
    throw e;
  }
};

export const generalGetRequest = async <T>(
  url: string,
  payload?: string,
  token?: string
): Promise<AxiosResponse<T> | void> => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return handleRequest(
    axiosConfig.get<T>(`${url}${payload ? `/${payload}` : ''}`, { headers })
  );
};

export const postRequest = async <T>(
  endpoint: string,
  payload: any
): Promise<AxiosResponse<T> | void> => {
  const config = {
    headers: {
      ...(payload instanceof FormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' }),
    },
  };

  return handleRequest(axiosConfig.post<T>(endpoint, payload, config));
};


export const putRequest = async <T>(
  endpoint: string,
  payload: any
): Promise<AxiosResponse<T> | void> => {
  return handleRequest(axiosConfig.put<T>(endpoint, payload));
};

export const patchRequest = async <T>(
  endpoint: string,
  payload: any
): Promise<AxiosResponse<T> | void> => {
  return handleRequest(axiosConfig.patch<T>(endpoint, payload));
};

export const deleteRequest = async <T>(
  endpoint: string,
  payload: any
): Promise<AxiosResponse<T> | void> => {
  return handleRequest(axiosConfig.delete<T>(`${endpoint}/${payload}`));
};

export const getRequest = async <T>(
  endpoint: string,
  payload?: string | Record<string, any>
): Promise<AxiosResponse<T> | void> => {
  let url = endpoint;
  let config = {};

  if (typeof payload === 'string') {
    url += `/${payload}`;
  } else if (typeof payload === 'object' && payload !== null) {
    config = { params: payload };
  }

  return handleRequest(axiosConfig.get<T>(url, config));
};

// allow sending extra headers (useful for server-side requests where axios interceptor
// can't derive tenant from window.location)
export const getRequestWithHeaders = async <T>(
  endpoint: string,
  payload?: string | Record<string, any>,
  extraHeaders?: Record<string, string>
): Promise<AxiosResponse<T> | void> => {
  let url = endpoint;
  let config: Record<string, any> = {};

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
  return handleRequest(axios.get<T>(fullUrl, config));
};
