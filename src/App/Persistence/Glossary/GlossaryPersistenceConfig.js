/**
 * @class GlossaryPersistenceConfig
 * @description GlossaryPersistenceConfig
 */
export class GlossaryPersistenceConfig {
  static STORE_NAME = "glossaryEntries";
  static SCHEMA_VERSION = 4;
  static DEFAULT_LOCALE = "en-US";

  static getStoreName() {
    return this.STORE_NAME;
  }

  static getSchemaUrl() {
    return new URL("./Schema/glossaryschema.xml", import.meta.url).href;
  }

  static getSchemaVersion() {
    return this.SCHEMA_VERSION;
  }

  static getDefaultLocale() {
    return this.DEFAULT_LOCALE;
  }

  static getGlossaryCsvUrl() {
    return new URL(
      "../../../../data/Install/Data/Glossary/glossary.csv",
      import.meta.url
    ).href;
  }
}
