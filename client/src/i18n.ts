import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "../public/locales/en/translation.json";
import trTranslation from "../public/locales/tr/translation.json";
// i18next yapılandırması
i18n
  .use(LanguageDetector) // Tarayıcı dil algılayıcısı kullanımı
  .use(HttpBackend) // Dil dosyalarını sunucudan yüklemek için HTTP backend
  .use(initReactI18next) // React için i18next adaptörü
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      tr: {
        translation: trTranslation,
      },
    },
    // backend: {
    //   // Dil dosyalarının yolu
    //   loadPath: "/locales/{{lng}}/translation.json",
    // },
    fallbackLng: "en", // Tarayıcı dil algılamazsa kullanılacak dil
    debug: true, // Geliştirme sırasında hata ayıklamak için debug modunu açabilirsin
    interpolation: {
      escapeValue: false, // XSS saldırılarını engellemek için değerlerin otomatik olarak kaçış yapmasını kapattık
    },
    detection: {
      // Tarayıcı dil algılama seçenekleri
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
      ],
      caches: ["localStorage", "cookie"], // Dil tercihlerini localStorage veya cookie'de saklar
    },
    lng: "en", // Varsayılan dil
  });

export default i18n;
