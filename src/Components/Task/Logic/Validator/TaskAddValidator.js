/**
 * @TaskAddValidator
 */

import { DateHandler } from "../../../../Utils/Date/DateHandler.js";
import { TaskConfig } from "../../TaskConfig.js";

export class TaskAddValidator {
  constructor() {}

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
        return TaskConfig.getMessage(TaskConfig.emptyTask());
      case String(task.match(TaskConfig.numberRegex())):
        return TaskConfig.getMessage(TaskConfig.numberInputed());
      default:
        return TaskConfig.getMessage(TaskConfig.taskAdded());
    }
  }

  validateDueTime(dueTimeValue) {
    if (dueTimeValue !== "") {
      let dueTimeInMillis = DateHandler.getDueTimeInMillis(dueTimeValue);
      let currentDateInMillis = new Date().getTime();

      if (currentDateInMillis > dueTimeInMillis) {
        return TaskConfig.getMessage(TaskConfig.isPastTime());
      } else {
        return;
      }
    }
  }

  createValidateObject(messageArr) {
    return new Set(messageArr);
  }
}
