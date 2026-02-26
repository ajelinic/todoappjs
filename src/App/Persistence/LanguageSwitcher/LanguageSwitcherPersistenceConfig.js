/**
 * @class LanguageSwitcherPersistenceConfig
 * @description LanguageSwitcherPersistenceConfig
 */
export class LanguageSwitcherPersistenceConfig {
  static STORE_NAME = "languageSwitcher";
  static SCHEMA_VERSION = 5;
  static SELECTED_LOCALE_KEY = "selectedLocale";
  static DEFAULT_LOCALE = "en-US";

  static getStoreName() {
    return this.STORE_NAME;
  }

  static getSchemaUrl() {
    return new URL("./Schema/languageswitcherschema.xml", import.meta.url).href;
  }

  static getSchemaVersion() {
    return this.SCHEMA_VERSION;
  }

  static getSelectedLocaleKey() {
    return this.SELECTED_LOCALE_KEY;
  }

  static getDefaultLocale() {
    return this.DEFAULT_LOCALE;
  }
}
