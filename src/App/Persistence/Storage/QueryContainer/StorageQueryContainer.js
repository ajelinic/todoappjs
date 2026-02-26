import { AbstractQueryContainer } from "../../../../base/Abstracts/AbstractQueryContainer.js";

/**
 * @class StorageQueryContainer
 * @description StorageQueryContainer
 */
export class StorageQueryContainer extends AbstractQueryContainer {
  constructor(config, schemaParser) {
    super();
    this.config = config;
    this.schemaParser = schemaParser;
    this.databasePromise = null;
    this.databaseConnection = null;
    this.databaseVersion = null;
    this.pendingTargetVersion = null;
    this.schemaRegistry = new Map();
  }

  registerSchemaUrl(schemaUrl, schemaVersion = 1) {
    if (!schemaUrl || typeof schemaUrl !== "string") {
      return;
    }

    if (
      !Number.isInteger(schemaVersion) ||
      schemaVersion < this.config.getDatabaseVersion()
    ) {
      throw new Error(
        `[StorageQueryContainer] Invalid schema version (${schemaVersion}) for ${schemaUrl}`
      );
    }

    const normalizedSchemaUrl = this.normalizeSchemaUrl(schemaUrl);
    const existingSchema = this.schemaRegistry.get(normalizedSchemaUrl);
    const existingVersion = existingSchema?.version ?? 0;
    const nextVersion = Math.max(existingVersion, schemaVersion);

    this.schemaRegistry.set(normalizedSchemaUrl, {
      key: this.getSchemaKey(normalizedSchemaUrl),
      url: normalizedSchemaUrl,
      version: nextVersion,
    });

    if (this.databaseVersion === null) {
      return;
    }

    if (!existingSchema && nextVersion <= this.databaseVersion) {
      throw new Error(
        `[StorageQueryContainer] Schema ${normalizedSchemaUrl} requires DB version greater than ${this.databaseVersion}. Bump schema version to add new stores/indexes.`
      );
    }

    const targetVersion = this.getTargetDatabaseVersion();
    if (targetVersion > this.databaseVersion) {
      this.resetDatabaseConnection();
    }
  }

  async openDatabase() {
    if (!window.indexedDB) {
      throw new Error("[StorageQueryContainer] IndexedDB is not available.");
    }

    const targetVersion = this.getTargetDatabaseVersion();
    if (this.databasePromise) {
      const activeVersion = this.databaseVersion ?? this.pendingTargetVersion;
      if (activeVersion === targetVersion) {
        return this.databasePromise;
      }

      if (this.databaseVersion === null) {
        await this.databasePromise;
        return this.openDatabase();
      }

      this.resetDatabaseConnection();
    }

    const schemaDefinitions = this.getSchemaDefinitions();
    const stores = await this.resolveStores(schemaDefinitions);

    this.pendingTargetVersion = targetVersion;
    this.databasePromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(
        this.config.getDatabaseName(),
        targetVersion
      );

      request.onupgradeneeded = (event) => {
        const database = event.target.result;
        this.runMigrations(
          database,
          event.target.transaction,
          stores,
          schemaDefinitions,
          event.oldVersion,
          event.newVersion
        );
      };

      request.onsuccess = (event) => {
        const database = event.target.result;
        this.databaseConnection = database;
        this.databaseVersion = database.version;
        this.pendingTargetVersion = null;
        resolve(database);
      };

      request.onerror = () => {
        this.resetDatabaseConnection();
        reject(request.error);
      };
    });

    return this.databasePromise;
  }

  getSchemaDefinitions() {
    return [...this.schemaRegistry.values()].sort((left, right) => {
      return left.version - right.version;
    });
  }

  getTargetDatabaseVersion() {
    const baseVersion = this.config.getDatabaseVersion();
    const schemaVersions = this.getSchemaDefinitions().map((schema) => {
      return schema.version;
    });

    return Math.max(baseVersion, ...schemaVersions);
  }

  normalizeSchemaUrl(schemaUrl) {
    try {
      return new URL(schemaUrl, this.getBaseUrl()).href;
    } catch (error) {
      return schemaUrl;
    }
  }

  getSchemaKey(schemaUrl) {
    try {
      const parsedUrl = new URL(schemaUrl);
      return parsedUrl.pathname;
    } catch (error) {
      return schemaUrl;
    }
  }

  getBaseUrl() {
    if (typeof document !== "undefined" && document.baseURI) {
      return document.baseURI;
    }

    return import.meta.url;
  }

  async resolveStores(schemaDefinitions = this.getSchemaDefinitions()) {
    const stores = [];

    for (const schema of schemaDefinitions) {
      const parsedSchema = await this.schemaParser.parseFromUrl(schema.url);
      stores.push(...(parsedSchema?.stores ?? []));
    }

    return this.deduplicateStores(stores);
  }

  runMigrations(
    database,
    transaction,
    stores,
    schemaDefinitions,
    oldVersion,
    newVersion
  ) {
    const migrationStore = this.ensureMigrationStore(database, transaction);
    this.createStores(database, stores, transaction);
    this.recordMigrations(
      migrationStore,
      schemaDefinitions,
      oldVersion,
      newVersion
    );
  }

  ensureMigrationStore(database, transaction) {
    const storeName = this.config.getMigrationStoreName();
    const keyPath = this.config.getMigrationStoreKeyPath();

    if (!database.objectStoreNames.contains(storeName)) {
      const objectStore = database.createObjectStore(storeName, { keyPath });
      objectStore.createIndex("schemaKeyX", "schemaKey", { unique: false });
      objectStore.createIndex("versionX", "version", { unique: false });
      objectStore.createIndex("appliedAtX", "appliedAt", { unique: false });
      return objectStore;
    }

    const objectStore = transaction?.objectStore(storeName);
    if (!objectStore) {
      throw new Error(
        `[StorageQueryContainer] Migration store is unavailable in transaction: ${storeName}`
      );
    }

    this.createMissingIndexes(objectStore, ["schemaKey", "version", "appliedAt"]);

    return objectStore;
  }

  recordMigrations(
    migrationStore,
    schemaDefinitions,
    oldVersion,
    newVersion
  ) {
    if (!migrationStore) {
      return;
    }

    const appliedAt = new Date().toISOString();
    schemaDefinitions.forEach((schema) => {
      if (schema.version <= oldVersion || schema.version > newVersion) {
        return;
      }

      migrationStore.put({
        id: `${schema.key}@${schema.version}`,
        schemaKey: schema.key,
        schemaUrl: schema.url,
        version: schema.version,
        fromVersion: oldVersion,
        toVersion: newVersion,
        appliedAt,
      });
    });
  }

  resetDatabaseConnection() {
    if (this.databaseConnection) {
      this.databaseConnection.close();
      this.databaseConnection = null;
    }

    this.databasePromise = null;
    this.databaseVersion = null;
    this.pendingTargetVersion = null;
  }

  async closeDatabase() {
    this.resetDatabaseConnection();
  }

  deduplicateStores(stores) {
    const map = new Map();

    stores.forEach((store) => {
      if (!store?.name || !store?.keyPath) {
        return;
      }

      const normalizedStore = {
        name: store.name,
        keyPath: store.keyPath,
        indexes: Array.isArray(store.indexes)
          ? [...new Set(store.indexes.filter(Boolean))]
          : [],
      };

      const existingStore = map.get(normalizedStore.name);
      if (!existingStore) {
        map.set(normalizedStore.name, normalizedStore);
        return;
      }

      if (existingStore.keyPath !== normalizedStore.keyPath) {
        throw new Error(
          `[StorageQueryContainer] Store keyPath mismatch for ${normalizedStore.name}`
        );
      }

      map.set(normalizedStore.name, {
        ...existingStore,
        indexes: [
          ...new Set([...existingStore.indexes, ...normalizedStore.indexes]),
        ],
      });
    });

    return [...map.values()];
  }

  createStores(database, stores, transaction) {
    stores.forEach((storeConfig) => {
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
