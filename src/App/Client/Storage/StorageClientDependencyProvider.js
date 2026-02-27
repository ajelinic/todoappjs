import { AbstractDependencyProvider } from "../../../base/Abstracts/AbstractDependencyProvider.js";
import { StorageBusinessFactory } from "../../Business/Storage/StorageBusinessFactory.js";

/**
 * @class StorageClientDependencyProvider
 * @description Storage client dependencies.
 */
export class StorageClientDependencyProvider extends AbstractDependencyProvider {
  static container = new Map();
  static STORAGE_FACADE = "STORAGE_FACADE";

  static provideDependencies(container) {
    container.set(this.STORAGE_FACADE, () => StorageBusinessFactory.createStorageFacade());
    return container;
  }
}

export default StorageClientDependencyProvider;
