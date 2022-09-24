/**
 * @TaskListHolderController
 */

import { TaskListFactory } from "../TaskListFactory.js";

export class TaskListHolderController {
  static createView() {
    let view = TaskListFactory.createTaskListHolder();
    view.taskListHolderCreateMain();
  }
}
