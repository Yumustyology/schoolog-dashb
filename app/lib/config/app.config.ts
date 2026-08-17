const environment = process.env.NODE_ENV || 'development';

const rawAxiosBaseUrl =
  process.env.NEXT_PUBLIC_AXIOS_BASE_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'http://localhost:5080';

// Socket.io connects to the server origin directly (no /api prefix, no
// trailing path) — strip whatever path axiosBaseUrl carries.
const socketBaseUrl = (() => {
  try {
    return new URL(rawAxiosBaseUrl).origin;
  } catch {
    return rawAxiosBaseUrl;
  }
})();

export const appConfig = {
  environment,
  // loginRedirectUrl: process.env.VITE_LOGIN_REDIRECT_URL,
  axiosBaseUrl: rawAxiosBaseUrl,
  socketBaseUrl,
  // The root domain of this app (used to detect custom domains). Example: 'schoolog.com' or 'localhost'
  appDomain: process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost',
  // Comma-separated list of additional hostnames schools must not be able to claim as
  // their own custom domain (our future dev/staging/prod deployment URLs, etc.). Populate
  // this as those environments get real hostnames — e.g. "schoolog-dev.vercel.app,staging.schoolog.com".
  reservedDomains: (process.env.NEXT_PUBLIC_RESERVED_DOMAINS || '')
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean),
};
