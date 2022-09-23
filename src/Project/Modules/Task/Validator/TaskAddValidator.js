/**
 * @TaskAddValidator
 */

import { UtilsFactory } from "../../Utils/UtilsFactory.js";

export class TaskAddValidator {
  constructor(errorMessage, successMessage, numberErrorMessage) {
    this.errorMessage = errorMessage;
    this.numberErrorMessage = numberErrorMessage;
    this.successMessage = successMessage;
  }

  validate(task) {
    if (task == "") {
      return this.getMessage(this.errorMessage);
    } else if (task.match(/^\d+$/)) {
      return this.getMessage(this.numberErrorMessage);
    } else {
      return this.getMessage(this.successMessage);
    }
  }

  getMessage(message) {
    let createMessage = UtilsFactory.createNotificationUtil();
    createMessage.createTaskNotification(message);
    return message.type;
  }
}
