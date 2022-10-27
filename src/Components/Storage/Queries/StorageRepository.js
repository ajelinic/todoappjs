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

  getDueTimeFromStorage(id) {
    let taskArr = StorageFactory.getTasksArray();

    for (let i = 0; i < taskArr.length; i++) {
      if (i == id) {
        return taskArr[i]["dueTime"];
      }
    }
  }
}
