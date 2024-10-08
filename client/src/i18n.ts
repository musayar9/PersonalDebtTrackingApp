import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend, { HttpBackendOptions } from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(HttpBackend)
  .init<HttpBackendOptions>({
    // resources: {
    //   en: {
    //     translation: {
    //       welcome: "Welcome",
    //     },
    //   },
    //   tr: {
    //     translation: {
    //       welcome: "Hoş Geldin",
    //     },
    //   },
    // },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
