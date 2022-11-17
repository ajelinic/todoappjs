/**
 * @StorageConnector
 */

import { StorageFactory } from "./StorageFactory.js";

export class StorageConnector {
  static initStorage() {
    return StorageFactory.createStorage().initStorage();
  }

  static importData() {
    return StorageFactory.createStorageSaver().importData();
  }

  static saveTaskToStorage(task) {
    return StorageFactory.createStorageSaver().saveTaskToStorage(task);
  }

  static getLastTaskId() {
    return StorageFactory.createStorageReader().getLastTaskIdFromStorage();
  }

  static getDueTime(id) {
    return StorageFactory.createStorageReader().getDueTime(id);
  }

  static deleteFromStorage(id) {
    return StorageFactory.createStorageDeleter().deleteTaskFromStorage(id);
  }

  static updateTaskStatus(item) {
    return StorageFactory.createStorageUpdater().updateTaskStatus(item);
  }

  static getTasksFromStorage() {
    return StorageFactory.createStorageReader().getTaskArrayFromStorage();
  }

  static getGlossaryValue(key) {
    return StorageFactory.createStorageReader().getGlossaryValue(key);
  }
}
