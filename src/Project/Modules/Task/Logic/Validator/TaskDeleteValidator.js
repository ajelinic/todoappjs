/**
 * @TaskAddValidator
 */

import { UtilsFactory } from "../../../../Service/UtilsFactory.js";
import { TaskConfig } from "../../TaskConfig.js";

export class TaskDeleteValidator {
  constructor() {
    this.taskClearError = "taskClearError";
    this.taskClearSuccess = "taskClearSuccess";
    this.emptyListWarning = "emptyListWarning";
  }

  validate(checked) {
    if (checked == false) {
      return this.getMessage(TaskConfig.getMessage(this.taskClearError));
    } else {
      return this.getMessage(TaskConfig.getMessage(this.taskClearSuccess));
    }
  }

  emptyValue(value) {
    if (!value) {
      return this.getMessage(TaskConfig.getMessage(this.emptyListWarning));
    }
  }

  getMessage(message) {
    let createMessage = UtilsFactory.createNotificationUtil();
    createMessage.createTaskNotification(message);
    return message.type;
  }
}
