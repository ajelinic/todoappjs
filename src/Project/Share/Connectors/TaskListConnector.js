/**
 * @TaskListConnector
 */

import { IndexController } from "../../Modules/TaskList/Communication/IndexController.js";
import { TaskConnector } from "./TaskConnector.js";

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
}
