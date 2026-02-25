import { AppCoreConfig } from "../../../base/AppCoreConfig.js";

/**
 * @class MockPersistenceConfig
 * @description MockPersistenceConfig
 */
export class MockPersistenceConfig {
  static getDatabaseName() {
    return AppCoreConfig.get("INDEX_DB_NAME") || "ToDoApp";
  }

  static getDatabaseVersion() {
    return 1;
  }

  static getSchemaUrl() {
    return new URL("./Schema/todoappschema.xml", import.meta.url).href;
  }

  static getGlossaryCsvUrl() {
    return new URL(
      "../../../../data/Install/Data/Glossary/glossary.csv",
      import.meta.url
    ).href;
  }
}
