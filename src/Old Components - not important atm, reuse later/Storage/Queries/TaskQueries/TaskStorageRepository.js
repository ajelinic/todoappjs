/**
 * @TaskStorageRepository
 * @deprecated Will be removed/changed in future releases
 */

import { TaskConfig } from "../../../Task/TaskConfig.js";

/**
 * @class TaskStorageRepository
 * @description TaskStorageRepository
 */
export class TaskStorageRepository {
  constructor(queryContainer) {
    this.queryContainer = queryContainer;
  }

  async getLastTaskId() {
    let database = await this.queryContainer.openDatabase();
    let indexArray = await this.queryContainer.getAllKeysByIndex(
      database,
      "tasks",
      "idX"
    );

    if (indexArray.length > 0) {
      return Math.max(...indexArray) + 1;
    } else {
      return 1;
    }
  }

  async getDueTime(id) {
    let database = await this.queryContainer.openDatabase();
    let getDueTime = await this.queryContainer.readData(id, database, "tasks");

    if (getDueTime) {
      return getDueTime.dueTime;
    } else {
      return TaskConfig.noDueTime();
    }
  }

  async getLastEnteredTask() {
    let database = await this.queryContainer.openDatabase();
    return await this.queryContainer.openCursor(
      database,
      "tasks",
      null,
      "prev"
    );
  }

  async getTaskArrayFromStorage() {
    let database = await this.queryContainer.openDatabase();
    return await this.queryContainer.readAllData(database, "tasks");
  }
}
