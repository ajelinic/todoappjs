/**
 * @StorageController
 */

import { StorageFactory } from "../StorageFactory.js";

export class StorageController {
  static createStorageObject() {
    let storage = StorageFactory.createStorage();
    return storage.initStorage();
  }
}
