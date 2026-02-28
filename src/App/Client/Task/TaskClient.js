import { AbstractClient } from "../../../base/Abstracts/AbstractClient.js";
import { AddTaskRequestTransfer } from "../../Shared/Task/Transfer/AddTaskRequestTransfer.js";
import { DeleteTaskRequestTransfer } from "../../Shared/Task/Transfer/DeleteTaskRequestTransfer.js";
import { TaskActionResultTransfer } from "../../Shared/Task/Transfer/TaskActionResultTransfer.js";
import { TaskCollectionTransfer } from "../../Shared/Task/Transfer/TaskCollectionTransfer.js";
import { ToggleTaskRequestTransfer } from "../../Shared/Task/Transfer/ToggleTaskRequestTransfer.js";
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
    const taskCollectionTransfer = await this.getFactory().createTaskFacade().getTasks();
    return TaskCollectionTransfer.from(taskCollectionTransfer);
  }

  async addTask(payload) {
    const requestTransfer = AddTaskRequestTransfer.from(payload);
    const actionResultTransfer = await this.getFactory()
      .createTaskFacade()
      .addTask(requestTransfer);

    return TaskActionResultTransfer.from(actionResultTransfer);
  }

  async toggleTask(payload) {
    const requestTransfer = ToggleTaskRequestTransfer.from(payload);
    const actionResultTransfer = await this.getFactory()
      .createTaskFacade()
      .toggleTask(requestTransfer);

    return TaskActionResultTransfer.from(actionResultTransfer);
  }

  async deleteTask(payload) {
    const requestTransfer = DeleteTaskRequestTransfer.from(payload);
    const actionResultTransfer = await this.getFactory()
      .createTaskFacade()
      .deleteTask(requestTransfer);

    return TaskActionResultTransfer.from(actionResultTransfer);
  }

  async clearCompletedTasks() {
    const actionResultTransfer = await this.getFactory()
      .createTaskFacade()
      .clearCompletedTasks();

    return TaskActionResultTransfer.from(actionResultTransfer);
  }
}
