interface ImportMetaEnv {
  // readonly VITE_LOGIN_REDIRECT_URL: string;
  readonly NEXT_PUBLIC_AXIOS_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
