/**
 * @TaskListFooterController
 */

import { TaskListFactory } from "../TaskListFactory.js";

export class TaskListFooterController {
  static indexAction() {
    this.createView();
  }

  static createView() {
    let view = TaskListFactory.createTaskListFooter();
    view.taskListFooterCreateHtml();
  }
}
