import { TaskActionUiTransfer } from "./TaskActionUiTransfer.js";
import { TaskNotificationTransfer } from "./TaskNotificationTransfer.js";

/**
 * @class TaskActionResultTransfer
 * @description Action result transfer for task write operations.
 */
export class TaskActionResultTransfer {
  constructor({ notification = null, ui = null } = {}) {
    this.notification = TaskNotificationTransfer.from(notification);
    this.ui = TaskActionUiTransfer.from(ui);
  }

  static from(payload = {}) {
    if (payload instanceof TaskActionResultTransfer) {
      return payload;
    }

    if (!payload || typeof payload !== "object") {
      return new TaskActionResultTransfer();
    }

    return new TaskActionResultTransfer(payload);
  }

  hasNotification() {
    return this.notification.hasData();
  }

  hasUi() {
    return this.ui.hasData();
  }

  isEmpty() {
    return !this.hasNotification() && !this.hasUi();
  }

  toObject() {
    if (this.isEmpty()) {
      return {};
    }

    const result = {};

    if (this.hasNotification()) {
      result.notification = this.notification.toObject();
    }

    if (this.hasUi()) {
      result.ui = this.ui.toObject();
    }

    return result;
  }
}

export default TaskActionResultTransfer;
