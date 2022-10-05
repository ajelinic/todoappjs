/**
 * @StorageController
 */

import { StorageFactory } from "../StorageFactory.js";

export class StorageController {
  static createStorageObject() {
    let storage = StorageFactory.createStorage();
    return storage.initStorage();
  }

  static saveToStorage(item) {
    let saver = StorageFactory.createStorageSaver();
    saver.saveTaskToStorage(item);
  }

  static deleteFromStorage() {}

  static readFromStorage() {}
}
/* nacrt za localstorage json
{
  tasks:{
    task{
      id: broj,
      value: ono kaj je task
      date-time-added: vrijeme u milisekundama
      due-time: vrijeme u milisekundama
    }
  },
  statistics:{
    broj taskova i sl
  }
}



*/
