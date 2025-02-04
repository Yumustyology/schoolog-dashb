interface ImportMetaEnv {
  readonly VITE_LOGIN_REDIRECT_URL: string;
  readonly VITE_AXIOS_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
