/** Application configuration */

/* -------- APPLICATION NAMESPACE -------- */
export const APP_NAMESPACE = "App";

/* -------- Database -------- */
export const USE_INDEX_DB = true;
export const INDEX_DB_NAME = "ToDoApp";

/* -------- Registered bundles -------- */
export const REGISTERED_BUNDLES = {
  PRESENTATION_BUNDLES: ["Index", "Task"],
  CLIENT_BUNDLES: ["Storage", "Task", "Glossary"],
  LOGIC_BUNDLES: ["Storage", "Task", "Glossary"],
  SHARED_BUNDLES: [],
  UTILS_BUNDLES: [],
  PERSISTENCE_BUNDLES: ["Storage", "Task", "Glossary"],
};
