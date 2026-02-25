/**
 * @TaskDueTimeListener
 * @deprecated Will be removed/changed in future releases
 */

/**
 * @class TaskDueTimeSubmitListener
 * @description TaskDueTimeSubmitListener
 */
export class TaskDueTimeSubmitListener {
  constructor(notification, taskConfig, taskHandler) {
    this.notification = notification;
    this.taskConfig = taskConfig;
    this.taskHandler = taskHandler;
  }

  listenIfDueButtonIsClicked(dueButton, timeDueInput, taskInput) {
    dueButton.addEventListener("click", (e) => {
      e.preventDefault();
      let message;
      if (
        taskInput.value !== "" &&
        taskInput.value.match(this.taskConfig.numberRegex())
      ) {
        message = this.taskConfig.getMessage(this.taskConfig.numberInputed());
        return this.notification.createTaskNotification(message);
      } else if (taskInput.value !== "") {
        this.taskHandler.handleTaskDueTime(dueButton, timeDueInput);
      } else {
        message = this.taskConfig.getMessage(
          this.taskConfig.isInputFieldEmpty()
        );
        return this.notification.createTaskNotification(message);
      }
    });
  }
}
