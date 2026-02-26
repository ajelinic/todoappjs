/**
 * @class StorageRepository
 * @description StorageRepository
 */
export class StorageRepository {
  constructor(queryContainer, config) {
    this.queryContainer = queryContainer;
    this.config = config;
  }

  async findOne(storeName, key) {
    return this.queryContainer.get(storeName, key);
  }

  async findAll(storeName) {
    return this.queryContainer.getAll(storeName);
  }

  async count(storeName) {
    return this.queryContainer.count(storeName);
  }

  async findAllKeysByIndex(storeName, indexName) {
    return this.queryContainer.getAllKeysByIndex(storeName, indexName);
  }

  async findAppliedMigrations() {
    return this.findAll(this.config.getMigrationStoreName());
  }
}
