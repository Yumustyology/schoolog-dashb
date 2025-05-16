const environment = process.env.NODE_ENV || 'development';
export const appConfig = {
  environment,
  // loginRedirectUrl: process.env.VITE_LOGIN_REDIRECT_URL,
  axiosBaseUrl: process.env.NEXT_PUBLIC_AXIOS_BASE_URL,
};
