/**
 * @StorageQueryContainer
 */

import { StorageConfig } from "../StorageConfig.js";
import { StorageFactory } from "../StorageFactory.js";

export class StorageQueryContainer {
  static async openDatabase() {
    let openConnection = new Promise((resolve, reject) => {
      StorageFactory.openDatabaseCon(StorageConfig.getDBName()).onerror = (
        event
      ) => {
        reject(event.target.result);
      };

      StorageFactory.openDatabaseCon(StorageConfig.getDBName()).onsuccess = (
        event
      ) => {
        resolve(event.target.result);
      };
    });
    return openConnection;
  }

  static async openKeyCursor(database, store, mode = "readonly") {
    let keyCursor = new Promise((resolve, reject) => {
      database
        .transaction(store, mode)
        .objectStore(store)
        .openKeyCursor().onerror = (event) => {
        reject(event.target.result);
      };

      database
        .transaction(store, mode)
        .objectStore(store)
        .openKeyCursor().onsuccess = (event) => {
        resolve(event.target.result);
      };
    });

    return await keyCursor;
  }

  static async openCursor(
    database,
    store,
    value,
    direction,
    mode = "readonly"
  ) {
    let cursor = new Promise((resolve, reject) => {
      database
        .transaction(store, mode)
        .objectStore(store)
        .openCursor(value, direction).onerror = (event) => {
        reject(event.target.result);
      };

      database
        .transaction(store, mode)
        .objectStore(store)
        .openCursor(value, direction).onsuccess = (event) => {
        resolve(event.target.result);
      };
    });

    return await cursor;
  }

  static async importData(entity, database, store, mode = "readwrite") {
    return new Promise((resolve, reject) => {
      resolve(database.transaction(store, mode).objectStore(store).add(entity));
    });
  }

  static async updateData(entity, database, store, mode = "readwrite") {
    return new Promise((resolve, reject) => {
      resolve(database.transaction(store, mode).objectStore(store).put(entity));
    });
  }

  static async deleteData(entity, database, store, mode = "readwrite") {
    return new Promise((resolve, reject) => {
      resolve(
        database.transaction(store, mode).objectStore(store).delete(entity)
      );
    });
  }

  static async readData(entity, database, store, mode = "readonly") {
    return new Promise((resolve, reject) => {
      database
        .transaction(store, mode)
        .objectStore(store)
        .get(entity).onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }

  static async readAllData(database, store, mode = "readonly") {
    return new Promise((resolve, reject) => {
      database.transaction(store, mode).objectStore(store).getAll().onsuccess =
        (event) => {
          resolve(event.target.result);
        };
    });
  }
}
