/**
 * @TaskAddValidator
 * @deprecated Will be removed/changed in future releases
 */

/**
 * @class TaskAddValidator
 * @description TaskAddValidator
 */
export class TaskAddValidator {
  constructor(dateHandler, taskConfig) {
    this.dateHandler = dateHandler;
    this.taskConfig = taskConfig;
  }

  validate(taskValue, dueTimeValue) {
    let dueTimeValidationMessage = this.validateDueTime(dueTimeValue);
    let taskValidationMessage = this.validateTask(taskValue);
    let validateObject = this.createValidateObject([
      dueTimeValidationMessage,
      taskValidationMessage,
    ]);
    return validateObject;
  }

  validateTask(task) {
    switch (task) {
      case "":
        return this.taskConfig.getMessage(this.taskConfig.emptyTask());
      case String(task.match(this.taskConfig.numberRegex())):
        return this.taskConfig.getMessage(this.taskConfig.numberInputed());
      default:
        return this.taskConfig.getMessage(this.taskConfig.taskAdded());
    }
  }

  validateDueTime(dueTimeValue) {
    if (dueTimeValue !== "") {
      let dueTimeInMillis = this.dateHandler.getTimeInMillis(dueTimeValue);
      let currentDateInMillis = this.dateHandler.getCurrentTime();

      if (currentDateInMillis > dueTimeInMillis) {
        return this.taskConfig.getMessage(this.taskConfig.isPastTime());
      } else {
        return;
      }
    }
  }

  createValidateObject(messageArr) {
    return new Set(messageArr);
  }
}
