/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_DATA_SOURCE?: 'mock' | 'api';
  readonly VITE_LOG_LEVEL?: 'debug' | 'info' | 'warn' | 'error' | 'silent';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
