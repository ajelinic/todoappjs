import { AbstractClient } from "../../../base/Abstracts/AbstractClient.js";
import { StorageClientFactory } from "./StorageClientFactory.js";

/**
 * @class StorageClient
 * @description StorageClient
 */
export class StorageClient extends AbstractClient {
  getFactory() {
    return StorageClientFactory;
  }

  async bootstrap() {
    return this.getFactory().createStorageFacade().bootstrap();
  }

  async registerSchemaUrl(schemaUrl, schemaVersion = 1) {
    return this.getFactory()
      .createStorageFacade()
      .registerSchemaUrl(schemaUrl, schemaVersion);
  }

  async insert(storeName, entity) {
    return this.getFactory().createStorageFacade().insert(storeName, entity);
  }

  async upsert(storeName, entity) {
    return this.getFactory().createStorageFacade().upsert(storeName, entity);
  }

  async remove(storeName, key) {
    return this.getFactory().createStorageFacade().remove(storeName, key);
  }

  async findOne(storeName, key) {
    return this.getFactory().createStorageFacade().findOne(storeName, key);
  }

  async findAll(storeName) {
    return this.getFactory().createStorageFacade().findAll(storeName);
  }

  async count(storeName) {
    return this.getFactory().createStorageFacade().count(storeName);
  }

  async findAllKeysByIndex(storeName, indexName) {
    return this.getFactory()
      .createStorageFacade()
      .findAllKeysByIndex(storeName, indexName);
  }

  async getAppliedMigrations() {
    return this.getFactory().createStorageFacade().getAppliedMigrations();
  }
}
