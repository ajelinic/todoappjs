import { AbstractRepository } from "../../../../base/Abstracts/AbstractRepository.js";

/**
 * @class TaskRepository
 * @description TaskRepository
 */
export class TaskRepository extends AbstractRepository {
  constructor(taskStorageGateway) {
    super(taskStorageGateway);
    this.taskStorageGateway = taskStorageGateway;
  }

  async saveTask(task) {
    await this.taskStorageGateway.saveTask(task);
    return task;
  }

  async updateTask(task) {
    await this.taskStorageGateway.updateTask(task);
    return task;
  }

  async getTaskById(id) {
    return this.taskStorageGateway.getTaskById(id);
  }

  async getAllTasks() {
    const tasks = await this.taskStorageGateway.getAllTasks();
    return tasks.sort((left, right) => left.id - right.id);
  }

  async getNextTaskId() {
    const keys = await this.taskStorageGateway.getAllTaskIds();

    if (!keys.length) {
      return 1;
    }

    return Math.max(...keys) + 1;
  }

  async updateCheckedStatus(id, checked) {
    const task = await this.getTaskById(id);
    if (!task) {
      return null;
    }

    const updated = {
      ...task,
      checked: Boolean(checked),
    };

    return this.updateTask(updated);
  }

  async deleteTaskById(id) {
    await this.taskStorageGateway.deleteTaskById(id);
  }

  async deleteCompletedTasks() {
    const tasks = await this.getAllTasks();
    const completedTasks = tasks.filter((task) => Boolean(task.checked));

    for (const task of completedTasks) {
      await this.deleteTaskById(task.id);
    }

    return completedTasks.length;
  }
}
