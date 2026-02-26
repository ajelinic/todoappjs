import { AbstractFactory } from "../../../base/Abstracts/AbstractFactory.js";
import { StoragePersistenceConfig } from "./StoragePersistenceConfig.js";
import { SchemaParser } from "./Parser/SchemaParser.js";
import { StorageQueryContainer } from "./QueryContainer/StorageQueryContainer.js";
import { StorageEntityManager } from "./Manager/StorageEntityManager.js";
import { StorageRepository } from "./Repository/StorageRepository.js";

/**
 * @class StoragePersistenceFactory
 * @description StoragePersistenceFactory
 */
export class StoragePersistenceFactory extends AbstractFactory {
  static queryContainer = null;
  static schemaParser = null;
  static storageEntityManager = null;
  static storageRepository = null;

  static createQueryContainer() {
    if (!this.queryContainer) {
      this.queryContainer = new StorageQueryContainer(
        StoragePersistenceConfig,
        this.createSchemaParser()
      );
    }

    return this.queryContainer;
  }

  static createSchemaParser() {
    if (!this.schemaParser) {
      this.schemaParser = new SchemaParser();
    }

    return this.schemaParser;
  }

  static createStorageEntityManager() {
    if (!this.storageEntityManager) {
      this.storageEntityManager = new StorageEntityManager(
        this.createQueryContainer()
      );
    }

    return this.storageEntityManager;
  }

  static createStorageRepository() {
    if (!this.storageRepository) {
      this.storageRepository = new StorageRepository(
        this.createQueryContainer(),
        StoragePersistenceConfig
      );
    }

    return this.storageRepository;
  }
}
