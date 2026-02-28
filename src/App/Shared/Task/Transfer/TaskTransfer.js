/**
 * @class TaskTransfer
 * @description Task data transfer contract.
 */
export class TaskTransfer {
  constructor({
    id = null,
    taskValue = "",
    dueTime = null,
    timeAdded = "",
    checked = false,
  } = {}) {
    const parsedId = Number.parseInt(id, 10);

    this.id = Number.isFinite(parsedId) ? parsedId : null;
    this.taskValue = typeof taskValue === "string" ? taskValue : "";
    this.dueTime = Number.isFinite(dueTime) ? dueTime : null;
    this.timeAdded = typeof timeAdded === "string" ? timeAdded : "";
    this.checked = Boolean(checked);
  }

  static from(payload = {}) {
    if (payload instanceof TaskTransfer) {
      return payload;
    }

    return new TaskTransfer(payload);
  }

  toObject() {
    return {
      id: this.id,
      taskValue: this.taskValue,
      dueTime: this.dueTime,
      timeAdded: this.timeAdded,
      checked: this.checked,
    };
  }
}

export default TaskTransfer;
