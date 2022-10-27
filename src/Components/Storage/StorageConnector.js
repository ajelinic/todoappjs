/**
 * @StorageConnector
 */

import { StorageFactory } from "./StorageFactory.js";
import { TaskConnector } from "../Task/TaskConnector.js";

export class StorageConnector {
  static initStorage() {
    return StorageFactory.createStorage().initStorage();
  }

  static saveTaskToStorage(task) {
    return StorageFactory.createStorageSaver().saveTaskToStorage(task);
  }

  static getTaskArrLength() {
    return StorageFactory.createStorageRepository().getTaskArrayLength();
  }

  static deleteFromStorage(id) {
    return StorageFactory.createStorageDeleter().deleteTaskFromStorage(id);
  }

  static updateTaskStatus(id, checked) {
    return StorageFactory.createStorageUpdater().updateTaskStatus(id, checked);
  }

  static getTasksFromStorage(taskArr) {
    return TaskConnector.getTasksFromStorage(taskArr);
  }

  static getDueTimeFromStorage(id) {
    return StorageFactory.createStorageReader().getDueTimeFromStorage(id);
  }
}
