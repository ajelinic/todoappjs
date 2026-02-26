/**
 * @class TaskStorageGateway
 * @description TaskStorageGateway
 */
export class TaskStorageGateway {
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

  async saveTask(task) {
    await this.ensureStorageReady();
    return this.storageClient.insert(this.persistenceConfig.getStoreName(), task);
  }

  async updateTask(task) {
    await this.ensureStorageReady();
    return this.storageClient.upsert(this.persistenceConfig.getStoreName(), task);
  }

  async deleteTaskById(id) {
    await this.ensureStorageReady();
    return this.storageClient.remove(this.persistenceConfig.getStoreName(), id);
  }

  async getTaskById(id) {
    await this.ensureStorageReady();
    return this.storageClient.findOne(this.persistenceConfig.getStoreName(), id);
  }

  async getAllTasks() {
    await this.ensureStorageReady();
    return this.storageClient.findAll(this.persistenceConfig.getStoreName());
  }

  async getAllTaskIds() {
    await this.ensureStorageReady();
    return this.storageClient.findAllKeysByIndex(
      this.persistenceConfig.getStoreName(),
      this.persistenceConfig.getIdIndexName()
    );
  }

  async ensureStorageReady() {
    await this.registerSchema();
    await this.storageClient.bootstrap();
  }
}
