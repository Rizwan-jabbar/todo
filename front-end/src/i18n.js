import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ur from "./languages/urdu/translation";
import en from "./languages/english/translation"; // create this

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ur: { translation: ur },
      en: { translation: en },
    },
    lng: localStorage.getItem("lang") || "en", // DEFAULT English
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
