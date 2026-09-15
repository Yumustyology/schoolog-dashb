/**
 * Auth cookie & session storage helpers for Remember Me, Refresh Token & Return-To URL handling
 */

export const setAuthCookies = (
  accessToken?: string,
  refreshToken?: string,
  rememberMe: boolean = true
) => {
  if (typeof document === 'undefined') return;

  // Max age: 30 days if rememberMe is true, else session cookie (expires on browser close)
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 : undefined;
  const maxAgeStr = maxAge ? `; max-age=${maxAge}` : '';

  if (accessToken) {
    document.cookie = `schoolog_access_token=${encodeURIComponent(accessToken)}; path=/${maxAgeStr}; SameSite=Lax`;
  }
  if (refreshToken) {
    document.cookie = `schoolog_refresh_token=${encodeURIComponent(refreshToken)}; path=/${maxAgeStr}; SameSite=Lax`;
  }
};

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
};

export const clearAuthCookies = () => {
  if (typeof document === 'undefined') return;
  document.cookie = 'schoolog_access_token=; path=/; max-age=0; SameSite=Lax';
  document.cookie = 'schoolog_refresh_token=; path=/; max-age=0; SameSite=Lax';
};

export const setReturnToUrl = (url: string) => {
  if (typeof window === 'undefined') return;
  try {
    // Only store safe internal app paths
    if (url && url.startsWith('/') && !url.includes('/login') && !url.includes('/signup')) {
      sessionStorage.setItem('schoolog_return_to', url);
      document.cookie = `schoolog_return_to=${encodeURIComponent(url)}; path=/; max-age=3600; SameSite=Lax`;
    }
  } catch {
    // ignore storage errors
  }
};

export const getReturnToUrl = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    // 1. Check URL query string first: ?redirect=...
    const urlParams = new URLSearchParams(window.location.search);
    const redirectParam = urlParams.get('redirect');
    if (redirectParam && redirectParam.startsWith('/') && !redirectParam.includes('/login') && !redirectParam.includes('/signup')) {
      return redirectParam;
    }

    // 2. Check sessionStorage
    const sessionUrl = sessionStorage.getItem('schoolog_return_to') || sessionStorage.getItem('returnTo');
    if (sessionUrl && sessionUrl.startsWith('/') && !sessionUrl.includes('/login') && !sessionUrl.includes('/signup')) {
      return sessionUrl;
    }

    // 3. Check cookie
    const cookieUrl = getCookie('schoolog_return_to');
    if (cookieUrl && cookieUrl.startsWith('/') && !cookieUrl.includes('/login') && !cookieUrl.includes('/signup')) {
      return cookieUrl;
    }
  } catch {
    // ignore storage errors
  }
  return null;
};

export const clearReturnToUrl = () => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem('schoolog_return_to');
    sessionStorage.removeItem('returnTo');
    document.cookie = 'schoolog_return_to=; path=/; max-age=0; SameSite=Lax';
  } catch {
    // ignore storage errors
  }
};
