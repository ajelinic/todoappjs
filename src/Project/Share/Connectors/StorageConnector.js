/**
 * @StorageConnector
 */

import { StorageController } from "../../Modules/Storage/Communication/StorageController.js";
import { StorageFactory } from "../../Modules/Storage/StorageFactory.js";
import { TaskConnector } from "./TaskConnector.js";

export class StorageConnector {
  static initStorage() {
    return StorageController.createStorageObject();
  }

  static saveTaskToStorage(task) {
    return StorageController.saveToStorage(task);
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
}
