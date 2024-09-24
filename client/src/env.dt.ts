// env.d.ts
interface ImportMetaEnv {
  VITE_FIREBASE_API_KEY: string;
  VITE_FIREBASE_APPID: string;
  // Diğer ortam değişkenleri varsa buraya ekleyin
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
