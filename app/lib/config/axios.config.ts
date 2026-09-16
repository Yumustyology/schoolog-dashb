import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
// import showToast from '../utils/toast';
import { appConfig } from './app.config';
import { getTenantFromHost } from '../tenant';
import {
  clearAuthCookies,
  getCookie,
  setAuthCookies,
  setReturnToUrl,
} from '../utils/authCookies';

export const baseURL = `${appConfig.axiosBaseUrl}/`;

const axiosConfig = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  //   timeout: 5000,
});

export const redirectUser = async (response: AxiosResponse) => {
  if (response.status === 401) {
    // On client only: clear storage and redirect with return-to destination
    if (typeof window !== 'undefined') {
      const { origin, pathname, search } = window.location;
      const currentUrl = pathname + search;

      // Preserve current URL destination before clearing session
      if (currentUrl && currentUrl.startsWith('/') && !currentUrl.includes('/login') && !currentUrl.includes('/signup')) {
        setReturnToUrl(currentUrl);
      }

      setTimeout(async () => {
        try {
          const lfModule = await import('localforage');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const lf: any = lfModule?.default ?? lfModule;
          await lf.clear();
        } catch {
          // ignore storage clear failures
        }
        clearAuthCookies();

        const redirectQuery = currentUrl && !currentUrl.includes('/login') && !currentUrl.includes('/signup')
          ? `?redirect=${encodeURIComponent(currentUrl)}`
          : '';

        window.location.replace(`${origin}/login${redirectQuery}`);
      }, 300);
    } else {
      // server-side: nothing to do, just log
      // eslint-disable-next-line no-console
      console.warn('redirectUser called on server; skipping client redirect');
    }
  }
};

axiosConfig.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Only attempt to read client-local storage when running in the browser
    if (typeof window !== 'undefined') {
      try {
        let token = getCookie('schoolog_access_token');
        if (!token) {
          const lfModule = await import('localforage');
          // localforage uses a default export in ESM interop
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const lf: any = lfModule?.default ?? lfModule;
          token = await lf.getItem('accessToken');
        }

        if (token && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } catch {
        // localforage can fail in SSR or restricted environments; ignore
      }
    }
    // Attach tenant header for multi-tenant requests (client-side)
    try {
      if (config.headers) {
        const existing =
          config.headers['X-Tenant'] || config.headers['x-tenant'];
        if (!existing && typeof window !== 'undefined') {
          const hostname = window.location.hostname || '';
          const tenant = getTenantFromHost(hostname);
          if (tenant) {
            // For subdomains send the subdomain id (e.g. 'ehs'),
            // for custom root domains send the full hostname (e.g. 'myschool.com')
            const xTenant = tenant.isSubdomain ? tenant.id : tenant.hostname;
            config.headers['x-tenant'] = xTenant;
          }
        }
      }
    } catch (e) {
      // ignore tenant detection errors
      // eslint-disable-next-line no-console
      console.log('tenant detection err', e);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const refreshAuthToken = async (): Promise<string | null> => {
  try {
    let refreshToken: string | null = getCookie('schoolog_refresh_token');
    if (!refreshToken && typeof window !== 'undefined') {
      const lfModule = await import('localforage');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lf: any = lfModule?.default ?? lfModule;
      refreshToken = await lf.getItem('refreshToken');
    }

    if (!refreshToken) throw new Error('No refresh token available');

    let xTenant = '';
    if (typeof window !== 'undefined') {
      try {
        const hostname = window.location.hostname || '';
        const tenant = getTenantFromHost(hostname);
        if (tenant) {
          xTenant = tenant.isSubdomain ? tenant.id : tenant.hostname;
        }
      } catch {
        // ignore tenant error
      }
    }

    const response = await axios.post(
      `${baseURL}auth/refresh-token`,
      {
        refreshToken,
        token: refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          ...(xTenant && { 'x-tenant': xTenant, 'X-Tenant': xTenant }),
        },
      }
    );

    const resData = response.data;
    const tokenData = resData?.data || resData || {};
    const accessToken =
      tokenData.accessToken || tokenData.token || resData.accessToken || resData.token;
    const newRefreshToken = tokenData.refreshToken || resData.refreshToken;

    if (!accessToken) throw new Error('Refresh response missing access token');

    if (typeof window !== 'undefined') {
      const lfModule = await import('localforage');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lf: any = lfModule?.default ?? lfModule;
      await lf.setItem('accessToken', accessToken);
      if (newRefreshToken) {
        await lf.setItem('refreshToken', newRefreshToken);
      }
      setAuthCookies(accessToken, newRefreshToken || refreshToken, true);
    }

    return accessToken;
  } catch (e) {
    console.error('Token refresh failed', e);
    await redirectUser({ status: 401 } as AxiosResponse);
    return null;
  }
};

// If refreshAuthToken is called on server-side, short-circuit to avoid localforage errors
// (server code should not attempt to refresh tokens using client storage)
const originalRefreshAuthToken = refreshAuthToken;
const refreshAuthTokenWrapper = async (): Promise<string | null> => {
  if (typeof window === 'undefined') return null;
  return originalRefreshAuthToken();
};

// Note: refreshAuthTokenWrapper is used inside the response interceptor below when needed.

axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error?.response?.status === 401 && !originalRequest._retry) {
      // Check if this is a public API call (e.g., login, email-signin)
      // If public, don't treat 401 as session expiry — let caller handle it
      const isPublic =
        originalRequest.headers?.['X-api-public'] === true ||
        originalRequest.headers?.['X-api-public'] === 'true';

      if (isPublic) {
        // Public API — don't redirect, let caller handle the error
        return Promise.reject(error);
      }

      // Private API — attempt token refresh
      originalRequest._retry = true;
      const newToken = await refreshAuthTokenWrapper();

      if (newToken) {
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        }
        return axiosConfig(originalRequest);
      }

      // Refresh failed — redirect to login
      await redirectUser({ status: 401 } as AxiosResponse);
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
