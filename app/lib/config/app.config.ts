const environment = process.env.NODE_ENV || 'development';
export const appConfig = {
  environment,
  loginRedirectUrl: import.meta.env.VITE_LOGIN_REDIRECT_URL,
  axiosBaseUrl: import.meta.env.VITE_AXIOS_BASE_URL,
};
