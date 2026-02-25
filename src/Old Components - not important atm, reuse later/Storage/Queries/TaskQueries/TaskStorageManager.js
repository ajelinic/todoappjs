/**
 * @TaskStorageManager
 * @deprecated Will be removed/changed in future releases
 */

/**
 * @class TaskStorageManager
 * @description TaskStorageManager
 */
export class TaskStorageManager {
  constructor(queryContainer) {
    this.queryContainer = queryContainer;
  }

  async saveTask(item) {
    let database = await this.queryContainer.openDatabase();
    return await this.queryContainer.importData(item, database, "tasks");
  }

  async deleteTask(id) {
    let database = await this.queryContainer.openDatabase();
    return await this.queryContainer.deleteData(id, database, "tasks");
  }

  async updateTask(item) {
    let database = await this.queryContainer.openDatabase();
    return await this.queryContainer.updateData(item, database, "tasks");
  }
}
