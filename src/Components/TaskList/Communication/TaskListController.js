/**
 * @TaskListController
 */

import { TaskListFactory } from "../TaskListFactory.js";

export class TaskListController {
  static indexAction() {
    this.createView();
  }

  static createView() {
    TaskListFactory.createTaskList().createTaskListContainer();
  }
}
