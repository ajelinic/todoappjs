/**
 * @class GlossaryStorageGateway
 * @description GlossaryStorageGateway
 */
export class GlossaryStorageGateway {
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

  async getEntryByTextKey(textKey) {
    await this.ensureStorageReady();
    return this.storageClient.findOne(this.persistenceConfig.getStoreName(), textKey);
  }

  async countRows() {
    await this.ensureStorageReady();
    return this.storageClient.count(this.persistenceConfig.getStoreName());
  }

  async ensureStorageReady() {
    await this.registerSchema();
    await this.storageClient.bootstrap();
  }
}
