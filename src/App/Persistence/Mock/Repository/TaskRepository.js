import { AbstractRepository } from "../../../../base/Abstracts/AbstractRepository.js";

/**
 * @class TaskRepository
 * @description TaskRepository
 */
export class TaskRepository extends AbstractRepository {
  static STORE_NAME = "tasks";
  static ID_INDEX_NAME = "idX";

  async saveTask(task) {
    await this.queryContainer.add(TaskRepository.STORE_NAME, task);
    return task;
  }

  async updateTask(task) {
    await this.queryContainer.put(TaskRepository.STORE_NAME, task);
    return task;
  }

  async getTaskById(id) {
    return this.queryContainer.get(TaskRepository.STORE_NAME, id);
  }

  async getAllTasks() {
    const tasks = await this.queryContainer.getAll(TaskRepository.STORE_NAME);
    return tasks.sort((left, right) => left.id - right.id);
  }

  async getNextTaskId() {
    const keys = await this.queryContainer.getAllKeysByIndex(
      TaskRepository.STORE_NAME,
      TaskRepository.ID_INDEX_NAME
    );

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
    await this.queryContainer.delete(TaskRepository.STORE_NAME, id);
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
