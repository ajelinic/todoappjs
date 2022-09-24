/**
 * @TaskListFooterController
 */

import { TaskListFactory } from "../TaskListFactory.js";

export class TaskListFooterController {
  static createView() {
    let view = TaskListFactory.createTaskListFooter();
    view.taskListFooterCreateHtml();
  }
}
