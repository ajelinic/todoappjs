/**
 * @StorageCreator
 */

import { StorageConnector } from "../../../Share/Connectors/StorageConnector.js";
import { StorageConfig } from "../StorageConfig.js";
import { StorageFactory } from "../StorageFactory.js";

export class StorageCreator {
  initStorage() {
    if (
      !localStorage.getItem(StorageConfig.setTasks()) ||
      JSON.parse(localStorage.getItem(StorageConfig.setTasks())).length === 0
    ) {
      const tasks = [];
      const statistics = [];
      let storage = window.localStorage.setItem(
        StorageConfig.setTasks(),
        JSON.stringify(tasks)
      );
      storage = window.localStorage.setItem(
        StorageConfig.setStatistics(),
        JSON.stringify(statistics)
      );
      return storage;
    } else {
      return StorageConnector.getTasksFromStorage(
        StorageFactory.createStorageReader().getTaskArrayFromStorage()
      );
    }
  }
}
