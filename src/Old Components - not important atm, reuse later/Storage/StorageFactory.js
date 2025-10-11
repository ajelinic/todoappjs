/**
 * @StorageFactory
 * @deprecated Will be removed/changed in future releases
 */

import { StorageCreator } from "./Logic/StorageCreator.js";
import { StorageDBInitiator } from "./Logic/StorageDBInitiator.js";
import { StorageDeleter } from "./Logic/StorageDeleter.js";
import { StorageReader } from "./Logic/StorageReader.js";
import { StorageSaver } from "./Logic/StorageSaver.js";
import { StorageUpdater } from "./Logic/StorageUpdater.js";
import { GlossaryStorageManager } from "./Queries/GlossaryQueries/GlossaryStorageManager.js";
import { GlossaryStorageRepository } from "./Queries/GlossaryQueries/GlossaryStorageRepository.js";
import { StorageQueryContainer } from "./Queries/StorageQueryContainer.js";
import { TaskStorageManager } from "./Queries/TaskQueries/TaskStorageManager.js";
import { TaskStorageRepository } from "./Queries/TaskQueries/TaskStorageRepository.js";

export class StorageFactory {
  static createDBInitiator() {
    return new StorageDBInitiator(this.createStorage());
  }

  static createStorage() {
    return new StorageCreator();
  }

  static openDatabaseCon(name) {
    return window.indexedDB.open(name);
  }

  static createStorageSaver() {
    return new StorageSaver(
      this.createTaskStorageManager(),
      this.createGlossaryStorageManager()
    );
  }

  static createStorageDeleter() {
    return new StorageDeleter(this.createTaskStorageManager());
  }

  static createStorageUpdater() {
    return new StorageUpdater(this.createTaskStorageManager());
  }

  static createStorageReader() {
    return new StorageReader(
      this.createTaskStorageRepository(),
      this.createGlossaryStorageRepository()
    );
  }

  static createTaskStorageManager() {
    return new TaskStorageManager(StorageQueryContainer);
  }

  static createTaskStorageRepository() {
    return new TaskStorageRepository(StorageQueryContainer);
  }

  static createGlossaryStorageManager() {
    return new GlossaryStorageManager(StorageQueryContainer);
  }

  static createGlossaryStorageRepository() {
    return new GlossaryStorageRepository(StorageQueryContainer);
  }
}
