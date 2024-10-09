import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "../public/locales/en/translation.json";
import trTranslation from "../public/locales/tr/translation.json";
// i18next yapılandırması
i18n
  .use(LanguageDetector) 
  .use(HttpBackend) 
  .use(initReactI18next) 
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
    fallbackLng: "en", 
    debug: true, 
    interpolation: {
      escapeValue: false, // XSS saldırılarını engellemek için değerlerin otomatik olarak kaçış yapmasını kapattık
    },
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
      ],
      caches: ["localStorage", "cookie"], 
    },
    lng: "en", 
  });

export default i18n;
