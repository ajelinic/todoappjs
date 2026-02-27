import { AbstractBusinessFactory } from "../../../base/Abstracts/AbstractBusinessFactory.js";
import { StorageFacade } from "./StorageFacade.js";
import { StorageBusinessConfig } from "./StorageBusinessConfig.js";
import { StorageBusinessDependencyProvider } from "./StorageBusinessDependencyProvider.js";

/**
 * @class StorageBusinessFactory
 * @description StorageBusinessFactory
 */
export class StorageBusinessFactory extends AbstractBusinessFactory {
  static CONFIG_CLASS = StorageBusinessConfig;
  static DEPENDENCY_PROVIDER_CLASS = StorageBusinessDependencyProvider;

  static facade = null;

  static createStorageFacade() {
    if (!this.getConfig().useFacadeSingleton()) {
      return new StorageFacade(this);
    }

    if (!this.facade) {
      this.facade = new StorageFacade(this);
    }

    return this.facade;
  }

  static createStorageEntityManager() {
    return this.getProvidedDependency(
      StorageBusinessDependencyProvider.STORAGE_ENTITY_MANAGER
    );
  }

  static createStorageRepository() {
    return this.getProvidedDependency(StorageBusinessDependencyProvider.STORAGE_REPOSITORY);
  }

  static createQueryContainer() {
    return this.getProvidedDependency(StorageBusinessDependencyProvider.QUERY_CONTAINER);
  }
}
