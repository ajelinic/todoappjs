/**
 * @class TodoMessageService
 * @description TodoMessageService
 */
export class TodoMessageService {
  static error(value) {
    return { type: "errorMessage", value };
  }

  static success(value) {
    return { type: "successMessage", value };
  }

  static warning(value) {
    return { type: "warningMessage", value };
  }

  static emptyTask() {
    return this.error("Can't add empty task!");
  }

  static numberTask() {
    return this.error("Task can't be only numbers!");
  }

  static pastDueTime() {
    return this.error("Tasks can't be set in past, please change due time!");
  }

  static taskAdded() {
    return this.success("Task successfully added!");
  }

  static clearSuccess() {
    return this.success("Cleared done tasks! Well done!");
  }

  static clearNoSelection() {
    return this.error(
      "Please select tasks that are done to delete them from the list!"
    );
  }

  static clearEmptyList() {
    return this.warning("No tasks to clear. Please add some tasks!");
  }
}
