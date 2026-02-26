import { AbstractClient } from "../../../base/Abstracts/AbstractClient.js";
import { TaskClientFactory } from "./TaskClientFactory.js";

/**
 * @class TaskClient
 * @description TaskClient
 */
export class TaskClient extends AbstractClient {
  getFactory() {
    return TaskClientFactory;
  }

  async bootstrap() {
    return this.getFactory().createTaskFacade().bootstrap();
  }

  async getTasks() {
    return this.getFactory().createTaskFacade().getTasks();
  }

  async addTask(payload) {
    return this.getFactory().createTaskFacade().addTask(payload);
  }

  async toggleTask(payload) {
    return this.getFactory().createTaskFacade().toggleTask(payload);
  }

  async clearCompletedTasks() {
    return this.getFactory().createTaskFacade().clearCompletedTasks();
  }
}
