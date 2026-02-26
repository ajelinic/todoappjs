/**
 * @class LanguageSwitcherStorageGateway
 * @description LanguageSwitcherStorageGateway
 */
export class LanguageSwitcherStorageGateway {
  constructor(storageClient, persistenceConfig) {
    this.storageClient = storageClient;
    this.persistenceConfig = persistenceConfig;
  }

  async registerSchema() {
    await this.storageClient.registerSchemaUrl(
      this.persistenceConfig.getSchemaUrl(),
      this.persistenceConfig.getSchemaVersion()
    );
  }

  async saveEntry(entry) {
    await this.ensureStorageReady();
    return this.storageClient.upsert(this.persistenceConfig.getStoreName(), entry);
  }

  async getEntryByKey(key) {
    await this.ensureStorageReady();
    return this.storageClient.findOne(this.persistenceConfig.getStoreName(), key);
  }

  async ensureStorageReady() {
    await this.registerSchema();
    await this.storageClient.bootstrap();
  }
}
