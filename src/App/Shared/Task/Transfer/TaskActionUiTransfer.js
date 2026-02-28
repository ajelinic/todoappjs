/**
 * @class TaskActionUiTransfer
 * @description UI-state transfer for task action responses.
 */
export class TaskActionUiTransfer {
  constructor({ taskValue = "", dueTimeInput = "", showDueInput = false } = {}) {
    this.taskValue = typeof taskValue === "string" ? taskValue : "";
    this.dueTimeInput = typeof dueTimeInput === "string" ? dueTimeInput : "";
    this.showDueInput = Boolean(showDueInput);
  }

  static from(payload = {}) {
    if (payload instanceof TaskActionUiTransfer) {
      return payload;
    }

    if (!payload || typeof payload !== "object") {
      return new TaskActionUiTransfer();
    }

    return new TaskActionUiTransfer(payload);
  }

  hasData() {
    return (
      this.taskValue.length > 0 ||
      this.dueTimeInput.length > 0 ||
      this.showDueInput === true
    );
  }

  toObject() {
    return {
      taskValue: this.taskValue,
      dueTimeInput: this.dueTimeInput,
      showDueInput: this.showDueInput,
    };
  }
}

export default TaskActionUiTransfer;
