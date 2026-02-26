import { AbstractClientFactory } from "../../../base/Abstracts/AbstractClientFactory.js";
import { StorageBusinessFactory } from "../../Business/Storage/StorageBusinessFactory.js";

/**
 * @class StorageClientFactory
 * @description StorageClientFactory
 */
export class StorageClientFactory extends AbstractClientFactory {
  static createStorageFacade() {
    return StorageBusinessFactory.createStorageFacade();
  }
}
