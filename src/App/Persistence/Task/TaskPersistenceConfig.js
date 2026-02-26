/**
 * @class TaskPersistenceConfig
 * @description TaskPersistenceConfig
 */
export class TaskPersistenceConfig {
  static STORE_NAME = "tasks";
  static ID_INDEX_NAME = "idX";
  static SCHEMA_VERSION = 2;

  static getStoreName() {
    return this.STORE_NAME;
  }

  static getIdIndexName() {
    return this.ID_INDEX_NAME;
  }

  static getSchemaUrl() {
    return new URL("./Schema/taskschema.xml", import.meta.url).href;
  }

  static getSchemaVersion() {
    return this.SCHEMA_VERSION;
  }
}
