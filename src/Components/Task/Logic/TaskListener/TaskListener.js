/**
 * @TaskListener
 */

import { UtilsFactory } from "../../../../Utils/UtilsFactory.js";
import { TaskConfig } from "../../TaskConfig.js";
import { TaskFactory } from "../../TaskFactory.js";
import { TaskHandler } from "../Handler/TaskHandler.js";

export class TaskListener {
  static listenIfAddToListIsClicked(addButton, dueTimeInput, taskInput) {
    addButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        taskInput.value !== "" &&
        !dueTimeInput.classList.contains(TaskConfig.getHiddenClass()) &&
        !taskInput.value.match(TaskConfig.numberRegex())
      ) {
        let taskFormHandler = TaskFactory.createTaskFormHandler();
        taskFormHandler.showDueButtonAndShowDateTimeInput();
      }
      TaskFactory.createTaskCreator().addTask();
    });
  }

  static listenIfDueButtonIsClicked(dueButton, timeDueInput, taskInput) {
    dueButton.addEventListener("click", (e) => {
      e.preventDefault();
      let message;
      let createMessage = UtilsFactory.createNotificationUtil();
      if (
        taskInput.value !== "" &&
        taskInput.value.match(TaskConfig.numberRegex())
      ) {
        message = TaskConfig.getMessage(TaskConfig.numberInputed());
        return createMessage.createTaskNotification(message);
      } else if (taskInput.value !== "") {
        TaskHandler.handleTaskDueTime(dueButton, timeDueInput);
      } else {
        message = TaskConfig.getMessage(TaskConfig.isInputFieldEmpty());
        return createMessage.createTaskNotification(message);
      }
    });
  }
}
