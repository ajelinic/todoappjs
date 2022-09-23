/**
 * @TaskAddValidator
 */

import { UtilsFactory } from "../../Utils/UtilsFactory.js";

export class TaskDeleteValidator {
  constructor(errorMessage, successMessage, warningMessage) {
    this.errorMessage = errorMessage;
    this.successMessage = successMessage;
    this.warningMessage = warningMessage;
  }

  validate(checked) {
    if (checked == false) {
      return this.getMessage(this.errorMessage);
    } else {
      return this.getMessage(this.successMessage);
    }
  }

  emptyValue(value) {
    if (!value) {
      return this.getMessage(this.warningMessage);
    }
  }

  getMessage(message) {
    let createMessage = UtilsFactory.createNotificationUtil();
    createMessage.createTaskNotification(message);
    return message.type;
  }
}
