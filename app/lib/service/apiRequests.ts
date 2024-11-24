import { AxiosResponse } from "axios";
import axiosConfig, { redirectUser } from "../config/axios.config";
import { handleError } from "../utils/handleError";

const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>
): Promise<AxiosResponse<T> | void> => {
  try {
    return await request;
  } catch (e: any) {
    handleError(e)
    throw e;
  }
};

export const generalGetRequest = async <T>(
  url: string,
  payload?:string,
  token?: string
): Promise<AxiosResponse<T> | void> => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return handleRequest(axiosConfig.get<T>(`${url}${payload? `/${payload}` : ""}`, { headers }));
};

export const postRequest = async <T>(
  endpoint: string,
  payload: any
): Promise<AxiosResponse<T> | void> => {
  const config = {
    ...axiosConfig,
    headers: {
      ...(payload instanceof FormData && { "Content-Type": "multipart/form-data" })
    }
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
  payload?: string
): Promise<AxiosResponse<T> | void> => {
  const url = `${endpoint}${payload ? `/${payload}` : ""}`;
  return handleRequest(axiosConfig.get<T>(url));
};
