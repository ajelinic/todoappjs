/**
 * @TaskDependecyProvider
 */
import { TaskConfig } from "./TaskConfig.js";

export class TaskDependecyProvider {
  static queryAddTaskButton() {
    return document.querySelector("#add");
  }

  static queryDeleteTaskButton() {
    return document.querySelector("#clear");
  }

  static queryTaskCheckBox() {
    return document.querySelectorAll("input[name=done]");
  }

  static getHolderElement() {
    return document.querySelector("#taskList");
  }

  static getErrorMessageOnTaskAdd() {
    return TaskConfig.setErrorMessageOnTaskAdd();
  }

  static getOnlyNumbersErrorMessageOnTaskAdd() {
    return TaskConfig.setOnlyNumbersErrorMessageOnTaskAdd();
  }

  static getSuccessMessageOnTaskAdd() {
    return TaskConfig.setSuccessMessageOnTaskAdd();
  }

  static getErrorMessageOnTaskDelete() {
    return TaskConfig.setErrorMessageOnTaskDelete();
  }

  static getSuccessMessageOnTaskDelete() {
    return TaskConfig.getSuccessMessageOnTaskDelete();
  }

  static getWarningMessageOnEmptyTaskList() {
    return TaskConfig.getWarningMessageOnEmptyTaskList();
  }

  static getInputField() {
    return document.querySelector("input[name = 'addTaskField'");
  }
}
