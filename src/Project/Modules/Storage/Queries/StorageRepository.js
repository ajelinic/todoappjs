/**
 * @StorageRepository
 */

import { StorageFactory } from "../StorageFactory.js";

export class StorageRepository {
  getTaskArrayLength() {
    let taskArr = StorageFactory.getTasksArray();
    return taskArr.length;
  }

  getTaskArrayFromStorage() {
    let taskArr = StorageFactory.getTasksArray();
    return taskArr;
  }
}
