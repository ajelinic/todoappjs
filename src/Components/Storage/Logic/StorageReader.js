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

  getDueTimeFromStorage(id) {
    return this.storageRepository.getDueTimeFromStorage(id);
  }
}
