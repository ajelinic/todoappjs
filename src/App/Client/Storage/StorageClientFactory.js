import { AbstractClientFactory } from "../../../base/Abstracts/AbstractClientFactory.js";
import { StorageClientConfig } from "./StorageClientConfig.js";
import { StorageClientDependencyProvider } from "./StorageClientDependencyProvider.js";

/**
 * @class StorageClientFactory
 * @description StorageClientFactory
 */
export class StorageClientFactory extends AbstractClientFactory {
  static CONFIG_CLASS = StorageClientConfig;
  static DEPENDENCY_PROVIDER_CLASS = StorageClientDependencyProvider;

  static createStorageFacade() {
    return this.getProvidedDependency(StorageClientDependencyProvider.STORAGE_FACADE);
  }
}
