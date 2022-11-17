/**
 * @TaskStorageRepository
 */

import { TaskConfig } from "../../../Task/TaskConfig.js";
import { StorageConfig } from "../../StorageConfig.js";
import { StorageFactory } from "../../StorageFactory.js";

export class TaskStorageRepository {
  constructor(queryContainer) {
    this.queryContainer = queryContainer;
  }

  async getLastTaskId() {
    let database = await this.queryContainer.openDatabase();
    let cursor = await this.queryContainer.openCursor(
      database,
      "tasks",
      null,
      "prev"
    );

    if (cursor) {
      return Number(cursor.value.id) + 1;
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

  async getTaskArrayFromStorage() {
    let database = await this.queryContainer.openDatabase();
    return await this.queryContainer.readAllData(database, "tasks");
  }
}
