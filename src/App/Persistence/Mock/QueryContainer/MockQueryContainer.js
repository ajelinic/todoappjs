import { AbstractQueryContainer } from "../../../../base/Abstracts/AbstractQueryContainer.js";

/**
 * @class MockQueryContainer
 * @description MockQueryContainer
 */
export class MockQueryContainer extends AbstractQueryContainer {
  constructor(config, schemaParser) {
    super();
    this.config = config;
    this.schemaParser = schemaParser;
    this.databasePromise = null;
  }

  async openDatabase() {
    if (this.databasePromise) {
      return this.databasePromise;
    }

    if (!window.indexedDB) {
      throw new Error("[MockQueryContainer] IndexedDB is not available.");
    }

    const schema = await this.schemaParser.parseFromUrl(
      this.config.getSchemaUrl()
    );

    this.databasePromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(
        this.config.getDatabaseName(),
        this.config.getDatabaseVersion()
      );

      request.onupgradeneeded = (event) => {
        const database = event.target.result;
        this.createStores(database, schema, event.target.transaction);
      };

      request.onsuccess = (event) => resolve(event.target.result);

      request.onerror = () => {
        this.databasePromise = null;
        reject(request.error);
      };
    });

    return this.databasePromise;
  }

  createStores(database, schema, transaction) {
    schema.stores.forEach((storeConfig) => {
      if (!database.objectStoreNames.contains(storeConfig.name)) {
        const objectStore = database.createObjectStore(storeConfig.name, {
          keyPath: storeConfig.keyPath,
        });
        this.createIndexes(objectStore, storeConfig.indexes);
        return;
      }

      const objectStore = transaction?.objectStore(storeConfig.name);
      if (objectStore) {
        this.createMissingIndexes(objectStore, storeConfig.indexes);
      }
    });
  }

  createIndexes(objectStore, indexes) {
    indexes.forEach((index) => {
      const indexName = `${index}X`;
      objectStore.createIndex(indexName, index, { unique: false });
    });
  }

  createMissingIndexes(objectStore, indexes) {
    indexes.forEach((index) => {
      const indexName = `${index}X`;
      if (!objectStore.indexNames.contains(indexName)) {
        objectStore.createIndex(indexName, index, { unique: false });
      }
    });
  }

  async withStore(storeName, mode, callback) {
    const database = await this.openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      let result;

      transaction.oncomplete = () => resolve(result);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);

      Promise.resolve(callback(store))
        .then((value) => {
          result = value;
        })
        .catch((error) => {
          try {
            transaction.abort();
          } catch (abortError) {
            // no-op
          }
          reject(error);
        });
    });
  }

  async add(storeName, entity) {
    return this.withStore(storeName, "readwrite", async (store) => {
      return this.requestToPromise(store.add(entity));
    });
  }

  async put(storeName, entity) {
    return this.withStore(storeName, "readwrite", async (store) => {
      return this.requestToPromise(store.put(entity));
    });
  }

  async delete(storeName, key) {
    return this.withStore(storeName, "readwrite", async (store) => {
      return this.requestToPromise(store.delete(key));
    });
  }

  async get(storeName, key) {
    return this.withStore(storeName, "readonly", async (store) => {
      return this.requestToPromise(store.get(key));
    });
  }

  async getAll(storeName) {
    return this.withStore(storeName, "readonly", async (store) => {
      return this.requestToPromise(store.getAll());
    });
  }

  async count(storeName) {
    return this.withStore(storeName, "readonly", async (store) => {
      return this.requestToPromise(store.count());
    });
  }

  async getAllKeysByIndex(storeName, indexName) {
    return this.withStore(storeName, "readonly", async (store) => {
      return this.requestToPromise(store.index(indexName).getAllKeys());
    });
  }
}
