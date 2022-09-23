/**
 * @TaskToTaskListConnector
 */

import { TaskController } from "../../../Modules/Task/Presentation/TaskController.js";

export class TaskToTaskListConnector extends TaskController {
  static connectTaskForm() {
    return super.createFormView();
  }

  static renderTask() {
    return super.createTask();
  }

  static deleteTask() {
    return super.deleteTask();
  }

  static handleTask() {
    return super.handleTask();
  }
}
