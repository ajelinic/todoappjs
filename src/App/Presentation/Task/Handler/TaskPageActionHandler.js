/**
 * @class TaskPageActionHandler
 * @description Handles task-page user actions through TaskClient.
 */
export class TaskPageActionHandler {
  constructor(taskClient) {
    this.taskClient = taskClient;
  }

  async addTask(payload = {}) {
    return this.taskClient.addTask(payload);
  }

  async toggleTask(payload = {}) {
    await this.taskClient.toggleTask(payload);
    return {};
  }

  async deleteTask(payload = {}) {
    await this.taskClient.deleteTask(payload);
    return {};
  }

  async clearCompleted() {
    return this.taskClient.clearCompletedTasks();
  }
}

export default TaskPageActionHandler;
