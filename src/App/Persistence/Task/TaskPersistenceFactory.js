import { AbstractFactory } from "../../../base/Abstracts/AbstractFactory.js";
import { StorageClient } from "../../Client/Storage/StorageClient.js";
import { TaskPersistenceConfig } from "./TaskPersistenceConfig.js";
import { TaskStorageGateway } from "./Gateway/TaskStorageGateway.js";
import { TaskRepository } from "./Repository/TaskRepository.js";

/**
 * @class TaskPersistenceFactory
 * @description TaskPersistenceFactory
 */
export class TaskPersistenceFactory extends AbstractFactory {
  static storageClient = null;
  static taskStorageGateway = null;
  static taskRepository = null;

  static createStorageClient() {
    if (!this.storageClient) {
      this.storageClient = new StorageClient();
    }

    return this.storageClient;
  }

  static createTaskStorageGateway() {
    if (!this.taskStorageGateway) {
      this.taskStorageGateway = new TaskStorageGateway(
        this.createStorageClient(),
        TaskPersistenceConfig
      );
    }

    return this.taskStorageGateway;
  }

  static createTaskRepository() {
    if (!this.taskRepository) {
      this.taskRepository = new TaskRepository(this.createTaskStorageGateway());
    }

    return this.taskRepository;
  }
}
