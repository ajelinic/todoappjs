/**
 * @class AddTaskRequestTransfer
 * @description Request transfer for adding task items.
 */
export class AddTaskRequestTransfer {
  constructor({ taskValue = "", dueTimeInput = "" } = {}) {
    this.taskValue = typeof taskValue === "string" ? taskValue : "";
    this.dueTimeInput = typeof dueTimeInput === "string" ? dueTimeInput : "";
  }

  static from(payload = {}) {
    if (payload instanceof AddTaskRequestTransfer) {
      return payload;
    }

    return new AddTaskRequestTransfer(payload);
  }

  toObject() {
    return {
      taskValue: this.taskValue,
      dueTimeInput: this.dueTimeInput,
    };
  }
}

export default AddTaskRequestTransfer;
