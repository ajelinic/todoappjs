/**
 * @StorageReader
 */

export class StorageReader {
  constructor(storageRepository) {
    this.storageRepository = storageRepository;
  }

  getTaskArrayLength() {
    this.storageRepository.getTaskArrayLength();
  }

  getTaskArrayFromStorage() {
    return this.storageRepository.getTaskArrayFromStorage();
  }
}
