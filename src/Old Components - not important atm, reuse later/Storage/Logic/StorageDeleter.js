/**
 * @StorageDeleter
 */

export class StorageDeleter {
  constructor(storageManager) {
    this.storageManager = storageManager;
  }

  deleteTaskFromStorage(id) {
    return this.storageManager.deleteTask(id);
  }
}
