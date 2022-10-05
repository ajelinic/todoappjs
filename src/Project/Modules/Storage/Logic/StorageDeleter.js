/**
 * @StorageDeleter
 */

export class StorageDeleter {
  constructor(storageManager) {
    this.storageManager = storageManager;
  }

  deleteTaskFromStorage(id) {
    this.storageManager.deleteTaskFromStorage(id);
  }
}
