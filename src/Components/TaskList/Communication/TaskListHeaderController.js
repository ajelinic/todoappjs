/**
 * @TaskListHeaderController
 */

import { TaskListFactory } from "../TaskListFactory.js";

export class TaskListHeaderController {
  static indexAction() {
    this.createView();
  }

  static createView() {
    let view = TaskListFactory.createTaskListHeader();
    view.taskListCreateMain();
  }
}
