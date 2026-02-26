import { AbstractFacade } from "../../../base/Abstracts/AbstractFacade.js";

/**
 * @class StorageFacade
 * @description StorageFacade
 */
export class StorageFacade extends AbstractFacade {
  constructor(factory) {
    super();
    this.factory = factory;
  }

  getFactory() {
    return this.factory;
  }

  async bootstrap() {
    await this.getFactory().createQueryContainer().openDatabase();
  }

  registerSchemaUrl(schemaUrl, schemaVersion = 1) {
    this.getFactory()
      .createQueryContainer()
      .registerSchemaUrl(schemaUrl, schemaVersion);
  }

  async insert(storeName, entity) {
    await this.bootstrap();
    return this.getFactory().createStorageEntityManager().insert(storeName, entity);
  }

  async upsert(storeName, entity) {
    await this.bootstrap();
    return this.getFactory().createStorageEntityManager().upsert(storeName, entity);
  }

  async remove(storeName, key) {
    await this.bootstrap();
    return this.getFactory().createStorageEntityManager().remove(storeName, key);
  }

  async findOne(storeName, key) {
    await this.bootstrap();
    return this.getFactory().createStorageRepository().findOne(storeName, key);
  }

  async findAll(storeName) {
    await this.bootstrap();
    return this.getFactory().createStorageRepository().findAll(storeName);
  }

  async count(storeName) {
    await this.bootstrap();
    return this.getFactory().createStorageRepository().count(storeName);
  }

  async findAllKeysByIndex(storeName, indexName) {
    await this.bootstrap();
    return this.getFactory()
      .createStorageRepository()
      .findAllKeysByIndex(storeName, indexName);
  }

  async getAppliedMigrations() {
    await this.bootstrap();
    return this.getFactory().createStorageRepository().findAppliedMigrations();
  }
}
