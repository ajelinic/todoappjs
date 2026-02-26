/**
 * @class TodoMessageService
 * @description TodoMessageService
 */
export class TodoMessageService {
  static error(key) {
    return { type: "errorMessage", key };
  }

  static success(key) {
    return { type: "successMessage", key };
  }

  static warning(key) {
    return { type: "warningMessage", key };
  }

  static emptyTask() {
    return this.error("task.notification.empty");
  }

  static numberTask() {
    return this.error("task.notification.onlynumbers");
  }

  static pastDueTime() {
    return this.error("task.notification.pastdue");
  }

  static taskAdded() {
    return this.success("task.notification.added");
  }

  static clearSuccess() {
    return this.success("task.notification.clearsuccess");
  }

  static clearNoSelection() {
    return this.error("task.notification.clearnoselection");
  }

  static clearEmptyList() {
    return this.warning("task.notification.clearempty");
  }
}
