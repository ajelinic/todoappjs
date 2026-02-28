import { AddTaskRequestTransfer } from "../../../Shared/Task/Transfer/AddTaskRequestTransfer.js";
import { DeleteTaskRequestTransfer } from "../../../Shared/Task/Transfer/DeleteTaskRequestTransfer.js";
import { TaskActionResultTransfer } from "../../../Shared/Task/Transfer/TaskActionResultTransfer.js";
import { ToggleTaskRequestTransfer } from "../../../Shared/Task/Transfer/ToggleTaskRequestTransfer.js";

/**
 * @class TaskPageActionHandler
 * @description Handles task-page user actions through TaskClient.
 */
export class TaskPageActionHandler {
  constructor(taskClient) {
    this.taskClient = taskClient;
  }

  async addTask(payload = {}) {
    const requestTransfer = AddTaskRequestTransfer.from(payload);
    const actionResultTransfer = await this.taskClient.addTask(requestTransfer);

    return TaskActionResultTransfer.from(actionResultTransfer).toObject();
  }

  async toggleTask(payload = {}) {
    const requestTransfer = ToggleTaskRequestTransfer.from(payload);
    const actionResultTransfer = await this.taskClient.toggleTask(requestTransfer);

    return TaskActionResultTransfer.from(actionResultTransfer).toObject();
  }

  async deleteTask(payload = {}) {
    const requestTransfer = DeleteTaskRequestTransfer.from(payload);
    const actionResultTransfer = await this.taskClient.deleteTask(requestTransfer);

    return TaskActionResultTransfer.from(actionResultTransfer).toObject();
  }

  async clearCompleted() {
    const actionResultTransfer = await this.taskClient.clearCompletedTasks();

    return TaskActionResultTransfer.from(actionResultTransfer).toObject();
  }
}

export default TaskPageActionHandler;
