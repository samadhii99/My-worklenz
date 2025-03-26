import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    ns: ["login", "signup", "forgotPassword"], // Specify the namespace
    defaultNS: "login", // Set default namespace
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    supportedLngs: ["en", "es", "fr"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
