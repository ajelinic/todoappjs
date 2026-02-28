/** Application configuration */

/* -------- APPLICATION NAMESPACE -------- */
export const APP_NAMESPACE = "App";

/* -------- Database -------- */
export const USE_INDEX_DB = true;
export const INDEX_DB_NAME = "ToDoApp";

/* -------- Registered bundles -------- */
export const REGISTERED_BUNDLES = {
  PRESENTATION_BUNDLES: ["Index", "LanguageSwitcher", "Task"],
  CLIENT_BUNDLES: ["Storage", "Task", "Glossary", "LanguageSwitcher"],
  BUSINESS_BUNDLES: ["Storage", "Task", "Glossary", "LanguageSwitcher"],
  SHARED_BUNDLES: ["Task", "LanguageSwitcher"],
  SERVICE_BUNDLES: [],
  PERSISTENCE_BUNDLES: ["Storage", "Task", "Glossary", "LanguageSwitcher"],
};
