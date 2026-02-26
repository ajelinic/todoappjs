import { AppCoreConfig } from "../../../base/AppCoreConfig.js";

/**
 * @class StoragePersistenceConfig
 * @description StoragePersistenceConfig
 */
export class StoragePersistenceConfig {
  static MIGRATION_STORE_NAME = "_storageMigrations";
  static MIGRATION_STORE_KEY_PATH = "id";

  static getDatabaseName() {
    return AppCoreConfig.get("INDEX_DB_NAME") || "ToDoApp";
  }

  static getDatabaseVersion() {
    return 1;
  }

  static getMigrationStoreName() {
    return this.MIGRATION_STORE_NAME;
  }

  static getMigrationStoreKeyPath() {
    return this.MIGRATION_STORE_KEY_PATH;
  }
}
