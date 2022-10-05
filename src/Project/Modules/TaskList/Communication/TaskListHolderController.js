/**
 * @TaskListHolderController
 */

import { TaskListFactory } from "../TaskListFactory.js";

export class TaskListHolderController {
  static indexAction() {
    this.createView();
  }

  static createView() {
    let view = TaskListFactory.createTaskListHolder();
    view.taskListHolderCreateMain();
  }
}
