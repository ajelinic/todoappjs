/**
 * @StorageDBInitiator
 * @deprecated Will be removed/changed in future releases
 */

export class StorageDBInitiator {
  constructor(storageCreator) {
    this.storageCreator = storageCreator;
  }

  async initDatabase(name, version) {
    let createDB = new Promise((resolve, reject) => {
      resolve(window.indexedDB.open(name, version));
    });
    return await createDB;
  }
}
