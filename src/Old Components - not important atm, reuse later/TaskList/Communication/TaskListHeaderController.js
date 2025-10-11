/**
 * @TaskListHeaderController
 * @deprecated Will be removed/changed in future releases
 */

import { TaskListFactory } from "../TaskListFactory.js";

export class TaskListHeaderController {
  static createView() {
    TaskListFactory.createTaskListHeader().taskListCreateHeader();
  }
}
