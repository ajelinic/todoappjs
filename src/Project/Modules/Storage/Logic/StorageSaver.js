/**
 * @StorageSaver
 */

export class StorageSaver {
  constructor(storageManager) {
    this.storageManager = storageManager;
  }
  saveTaskToStorage(item) {
    this.storageManager.saveTaskToStorage(item);
  }
}
