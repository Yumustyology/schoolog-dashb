import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import localforage from 'localforage';
// import showToast from '../utils/toast';
import { appConfig } from './app.config';

export const baseURL = `${appConfig.axiosBaseUrl}/user/`;

const axiosConfig = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  //   timeout: 5000,
});

export const redirectUser = async (response: AxiosResponse) => {
  const { origin, pathname } = window.location;

  if (response.status === 401) {
    // showToast(
    //   response.data?.message ||
    //     'Login has expired, kindly login again to proceed',
    //   'error'
    // );
    setTimeout(async () => {
      await localforage.clear();
      sessionStorage.setItem('returnTo', pathname);
      if (pathname.includes('/dashboard/') || pathname.includes('/lobby')) {
        window.location.href = `${origin}/`;
      }
      if (pathname.includes('/admin/')) {
        window.location.href = `${origin}/admin/`;
      }
    }, 2000);
  }
};

axiosConfig.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await localforage.getItem('accessToken');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const refreshAuthToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await localforage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axios.post(`${baseURL}auth/refresh-token`, {
      token: refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    await localforage.setItem('accessToken', accessToken);
    await localforage.setItem('refreshToken', newRefreshToken);

    return accessToken;
  } catch (e) {
    console.error('Token refresh failed', e);
    await redirectUser({ status: 401 } as AxiosResponse);
    return null;
  }
};

axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshAuthToken();

      if (newToken) {
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        }
        return axiosConfig(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
