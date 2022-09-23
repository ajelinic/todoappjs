/**
 * @TaskListHeaderController
 */

import { TaskListFactory } from "../TaskListFactory.js";

export class TaskListHeaderController {
  static createView() {
    let view = TaskListFactory.createTaskListHeader();
    view.taskListCreateMain();
  }
}
