/**
 * @StorageDeleter
 * @deprecated Will be removed/changed in future releases
 */

/**
 * @class StorageDeleter
 * @description StorageDeleter
 */
export class StorageDeleter {
  constructor(storageManager) {
    this.storageManager = storageManager;
  }

  deleteTaskFromStorage(id) {
    return this.storageManager.deleteTask(id);
  }
}
