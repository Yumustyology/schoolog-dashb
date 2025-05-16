// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { AxiosResponse } from 'axios';
import axiosConfig from '../config/axios.config';

const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>
): Promise<AxiosResponse<T> | void> => {
  try {
    return await request;
  } catch (e: any) {
    // handleError(e);
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
