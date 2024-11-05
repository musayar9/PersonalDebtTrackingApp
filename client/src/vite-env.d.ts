/// <reference types="vite/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_APPID: string;
  // Diğer ortam değişkenlerini buraya ekleyin
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
