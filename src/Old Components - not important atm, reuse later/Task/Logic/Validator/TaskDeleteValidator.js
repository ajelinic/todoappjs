/**
 * @TaskAddValidator
 * @deprecated Will be removed/changed in future releases
 */

export class TaskDeleteValidator {
  constructor(notification, taskConfig) {
    this.taskConfig = taskConfig;
    this.notification = notification;
  }

  validate(checked) {
    if (checked == false) {
      return this.getMessage(
        this.taskConfig.getMessage(this.taskConfig.taskClearError)
      );
    } else {
      return this.getMessage(
        this.taskConfig.getMessage(this.taskConfig.taskClearSuccess)
      );
    }
  }

  emptyValue(value) {
    if (!value) {
      return this.getMessage(
        this.taskConfig.getMessage(this.taskConfig.emptyListWarning)
      );
    }
  }

  getMessage(message) {
    this.notification.createTaskNotification(message);
    return message.type;
  }
}
