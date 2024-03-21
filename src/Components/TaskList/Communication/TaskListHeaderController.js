/**
 * @TaskListHeaderController
 */

import { TaskListFactory } from "../TaskListFactory.js";

export class TaskListHeaderController {
  static createView() {
    TaskListFactory.createTaskListHeader().taskListCreateHeader();
  }
}
