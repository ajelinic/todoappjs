/**
 * @TaskConnector
 * @deprecated Will be removed/changed in future releases
 */

import { InfoBarConnector } from "../InfoBar/InfoBarConnector.js";
import { StorageConnector } from "../Storage/StorageConnector.js";
import { TaskDataProvider } from "./TaskDataProvider.js";
import { TaskFactory } from "./TaskFactory.js";

/**
 * @class TaskConnector
 * @description TaskConnector
 */
export class TaskConnector {
  static renderTaskForm() {
    return TaskFactory.createTaskForm().buildForm();
  }

  static renderTask() {
    return TaskFactory.createTaskFormHandler().addTask();
  }

  static deleteTask() {
    return TaskFactory.createTaskDeleter().deleteTask();
  }

  static handleTask() {
    return TaskFactory.createTaskHandler().handleTask();
  }

  static checkTaskDueTime() {
    return TaskFactory.createTaskHandler().checkTaskDueTime();
  }

  static hideDueButtonAndShowDateTimeInput() {
    return TaskFactory.createTaskFormHandler().hideDueButtonAndShowDateTimeInput();
  }

  static getInputField() {
    return TaskDataProvider.inputField;
  }

  static saveTask(task) {
    return StorageConnector.saveTaskToStorage(task);
  }

  static deleteFromStorage(id) {
    return StorageConnector.deleteFromStorage(id);
  }

  static getTasksFromStorage() {
    return StorageConnector.getTasksFromStorage();
  }

  static renderTasksFromStorage() {
    return TaskFactory.createTaskCreator().addTaskFromStorage();
  }

  static updateTaskStatus(item) {
    return StorageConnector.updateTaskStatus(item);
  }

  static getLastTaskId() {
    return StorageConnector.getLastTaskId();
  }

  static renderTaskInfoToInfoTaskBar() {
    return InfoBarConnector.renderLastEnteredTaskInfo();
  }
}
