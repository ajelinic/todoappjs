/**
 * @TaskConnector
 */

import { TaskController } from "../../Modules/Task/Communication/TaskController.js";
import { TaskFactory } from "../../Modules/Task/TaskFactory.js";
import { StorageConnector } from "./StorageConnector.js";

export class TaskConnector {
  static renderTaskForm() {
    return TaskController.createFormView();
  }

  static renderTask() {
    return TaskController.createTask();
  }

  static deleteTask() {
    return TaskController.deleteTask();
  }

  static handleTask() {
    return TaskController.handleTask();
  }

  static hideDueButtonAndShowDateTimeInput() {
    return TaskController.hideDueButtonAndShowDateTimeInput();
  }

  static getInputField() {
    return TaskFactory.addInputField();
  }

  static saveTask(task) {
    return StorageConnector.saveTaskToStorage(task);
  }

  static deleteFromStorage(id) {
    return StorageConnector.deleteFromStorage(id);
  }

  static getTasksFromStorage(taskArr) {
    return TaskFactory.createTaskCreator().addTaskFromStorage(taskArr);
  }

  static updateTaskStatus(id, checked) {
    return StorageConnector.updateTaskStatus(id, checked);
  }
}
