/**
 * @TaskController
 */

import { TaskFactory } from "../TaskFactory.js";

export class TaskController {
  static createFormView() {
    let view = TaskFactory.createTaskForm();
    return view.buildForm();
  }

  static createTask() {
    let TaskFormHandler = TaskFactory.createTaskFormHandler();
    return TaskFormHandler.addTask();
  }

  static deleteTask() {
    let taskDeletor = TaskFactory.createTaskDeleter();
    return taskDeletor.deleteTask();
  }

  static handleTask() {
    let taskHandler = TaskFactory.createTaskHandler();
    return taskHandler.handleTask();
  }

  static hideDueButtonAndShowDateTimeInput() {
    let TaskFormHandler = TaskFactory.createTaskFormHandler();
    return TaskFormHandler.hideDueButtonAndShowDateTimeInput();
  }
}
