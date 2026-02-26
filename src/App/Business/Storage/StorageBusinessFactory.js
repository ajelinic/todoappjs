import { AbstractBusinessFactory } from "../../../base/Abstracts/AbstractBusinessFactory.js";
import { StoragePersistenceFactory } from "../../Persistence/Storage/StoragePersistenceFactory.js";
import { StorageFacade } from "./StorageFacade.js";

/**
 * @class StorageBusinessFactory
 * @description StorageBusinessFactory
 */
export class StorageBusinessFactory extends AbstractBusinessFactory {
  static facade = null;

  static createStorageFacade() {
    if (!this.facade) {
      this.facade = new StorageFacade(this);
    }

    return this.facade;
  }

  static createStorageEntityManager() {
    return StoragePersistenceFactory.createStorageEntityManager();
  }

  static createStorageRepository() {
    return StoragePersistenceFactory.createStorageRepository();
  }

  static createQueryContainer() {
    return StoragePersistenceFactory.createQueryContainer();
  }
}
