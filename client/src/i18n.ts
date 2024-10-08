import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // i18next'i React ile entegre eder
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
        },
      },
      tr: {
        translation: {
          welcome: "Hoş Geldin",
        },
      },
    },
    lng: "en", // Varsayılan dil
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React'te HTML escape etmeye gerek yok
    },
  });

export default i18n;
