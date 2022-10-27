/**
 * @StorageUpdater
 */

export class StorageUpdater {
  constructor(storageManager) {
    this.storageManager = storageManager;
  }

  updateTaskStatus(id, checked) {
    this.storageManager.updateTask(id, checked);
  }
}
