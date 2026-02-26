/**
 * @class StorageEntityManager
 * @description StorageEntityManager
 */
export class StorageEntityManager {
  constructor(queryContainer) {
    this.queryContainer = queryContainer;
  }

  async insert(storeName, entity) {
    return this.queryContainer.add(storeName, entity);
  }

  async upsert(storeName, entity) {
    return this.queryContainer.put(storeName, entity);
  }

  async remove(storeName, key) {
    return this.queryContainer.delete(storeName, key);
  }
}
