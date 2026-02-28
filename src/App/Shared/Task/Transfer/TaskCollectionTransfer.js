import { TaskTransfer } from "./TaskTransfer.js";

/**
 * @class TaskCollectionTransfer
 * @description Task collection transfer contract.
 */
export class TaskCollectionTransfer {
  constructor(tasks = []) {
    this.tasks = Array.isArray(tasks) ? tasks.map((task) => TaskTransfer.from(task)) : [];
  }

  static from(payload = {}) {
    if (payload instanceof TaskCollectionTransfer) {
      return payload;
    }

    if (Array.isArray(payload)) {
      return new TaskCollectionTransfer(payload);
    }

    if (payload && Array.isArray(payload.tasks)) {
      return new TaskCollectionTransfer(payload.tasks);
    }

    return new TaskCollectionTransfer([]);
  }

  getTasks() {
    return this.tasks.map((task) => TaskTransfer.from(task));
  }

  toArray() {
    return this.tasks.map((task) => task.toObject());
  }

  toObject() {
    return {
      tasks: this.toArray(),
    };
  }
}

export default TaskCollectionTransfer;
