/**
 * @TaskListConnector
 */

import { IndexController } from "./Communication/IndexController.js";
import { TaskConnector } from "../Task/TaskConnector.js";
import { TaskListFactory } from "./TaskListFactory.js";

export class TaskListConnector {
  static initTaskList() {
    IndexController.indexAction();
  }

  static renderTaskForm() {
    return TaskConnector.renderTaskForm();
  }

  static renderTask() {
    return TaskConnector.renderTask();
  }

  static deleteTask() {
    return TaskConnector.deleteTask();
  }

  static handleTask() {
    return TaskConnector.handleTask();
  }

  static hideDueButtonAndShowDateTimeInput() {
    return TaskConnector.hideDueButtonAndShowDateTimeInput();
  }

  static getInputField() {
    return TaskConnector.getInputField();
  }

  static createNotification() {
    return TaskListFactory.createNotification();
  }
}
