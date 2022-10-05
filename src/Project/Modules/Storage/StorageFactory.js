/**
 * @StorageFactory
 */

import { StorageCreator } from "./Logic/StorageCreator.js";
import { StorageDeleter } from "./Logic/StorageDeleter.js";
import { StorageReader } from "./Logic/StorageReader.js";
import { StorageSaver } from "./Logic/StorageSaver.js";
import { StorageUpdater } from "./Logic/StorageUpdater.js";
import { StorageManager } from "./Queries/StorageManager.js";
import { StorageRepository } from "./Queries/StorageRepository.js";
import { StorageConfig } from "./StorageConfig.js";

export class StorageFactory {
  static createStorage() {
    return new StorageCreator();
  }

  static createStorageSaver() {
    return new StorageSaver(this.createStorageManager());
  }

  static createStorageDeleter() {
    return new StorageDeleter(this.createStorageManager());
  }

  static createStorageUpdater() {
    return new StorageUpdater(this.createStorageManager());
  }

  static createStorageReader() {
    return new StorageReader(this.createStorageRepository());
  }

  static createStorageManager() {
    return new StorageManager();
  }

  static createStorageRepository() {
    return new StorageRepository();
  }

  static getTasksArray() {
    return JSON.parse(localStorage.getItem(StorageConfig.setTasks()));
  }
}
