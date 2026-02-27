import { AbstractDependencyProvider } from "../../../base/Abstracts/AbstractDependencyProvider.js";
import { StoragePersistenceFactory } from "../../Persistence/Storage/StoragePersistenceFactory.js";

/**
 * @class StorageBusinessDependencyProvider
 * @description Storage business dependencies.
 */
export class StorageBusinessDependencyProvider extends AbstractDependencyProvider {
  static container = new Map();

  static STORAGE_ENTITY_MANAGER = "STORAGE_ENTITY_MANAGER";
  static STORAGE_REPOSITORY = "STORAGE_REPOSITORY";
  static QUERY_CONTAINER = "QUERY_CONTAINER";

  static provideDependencies(container) {
    container.set(this.STORAGE_ENTITY_MANAGER, () =>
      StoragePersistenceFactory.createStorageEntityManager()
    );
    container.set(this.STORAGE_REPOSITORY, () =>
      StoragePersistenceFactory.createStorageRepository()
    );
    container.set(this.QUERY_CONTAINER, () =>
      StoragePersistenceFactory.createQueryContainer()
    );

    return container;
  }
}

export default StorageBusinessDependencyProvider;
