/**
 * @class TaskNotificationTransfer
 * @description Notification transfer used by task actions.
 */
export class TaskNotificationTransfer {
  constructor({ type = "", key = "", value = null } = {}) {
    this.type = typeof type === "string" ? type : "";
    this.key = typeof key === "string" ? key : "";
    this.value = typeof value === "string" ? value : null;
  }

  static from(payload = {}) {
    if (payload instanceof TaskNotificationTransfer) {
      return payload;
    }

    if (!payload || typeof payload !== "object") {
      return new TaskNotificationTransfer();
    }

    return new TaskNotificationTransfer(payload);
  }

  hasData() {
    return this.type.length > 0 || this.key.length > 0 || this.value !== null;
  }

  toObject() {
    if (!this.hasData()) {
      return null;
    }

    const result = {
      type: this.type,
      key: this.key,
    };

    if (this.value !== null) {
      result.value = this.value;
    }

    return result;
  }
}

export default TaskNotificationTransfer;
