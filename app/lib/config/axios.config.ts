import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import localforage from 'localforage';
// import showToast from '../utils/toast';
import { appConfig } from './app.config';
import { getTenantFromHost } from '../tenant';

export const baseURL = `${appConfig.axiosBaseUrl}/`;

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
    // Attach tenant header for multi-tenant requests (client-side)
    try {
      if (config.headers) {
        const existing = config.headers['X-Tenant'] || config.headers['x-tenant'];
        if (!existing && typeof window !== 'undefined') {
          const hostname = window.location.hostname || '';
          const tenant = getTenantFromHost(hostname);
          if (tenant) config.headers['X-Tenant'] = tenant;
        }
      }
    } catch (e) {
      // ignore tenant detection errors
      console.log("err ",e)
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
