/**
 * @TaskConnector
 */

import { StorageConnector } from "../Storage/StorageConnector.js";
import { TaskFactory } from "./TaskFactory.js";

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

  static getDueTimeFromStorage(id) {
    return StorageConnector.getDueTimeFromStorage(id);
  }
}
