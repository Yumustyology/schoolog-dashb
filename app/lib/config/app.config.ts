const environment = process.env.NODE_ENV || 'development';
export const appConfig = {
  environment,
  // loginRedirectUrl: process.env.VITE_LOGIN_REDIRECT_URL,
  axiosBaseUrl: process.env.NEXT_PUBLIC_AXIOS_BASE_URL,
  // The root domain of this app (used to detect custom domains). Example: 'schoolog.com' or 'localhost'
  appDomain: process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost',
};
