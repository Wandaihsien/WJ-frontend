interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_BASE_URL: string
  readonly VITE_GOOGLE_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
