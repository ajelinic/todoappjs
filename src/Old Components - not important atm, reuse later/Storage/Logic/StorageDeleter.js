/**
 * @StorageDeleter
 * @deprecated Will be removed/changed in future releases
 */

export class StorageDeleter {
  constructor(storageManager) {
    this.storageManager = storageManager;
  }

  deleteTaskFromStorage(id) {
    return this.storageManager.deleteTask(id);
  }
}
