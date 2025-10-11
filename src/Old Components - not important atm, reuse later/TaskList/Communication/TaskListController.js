/**
 * @TaskListController
 * @deprecated Will be removed/changed in future releases
 */

import { TaskListFactory } from "../TaskListFactory.js";

export class TaskListController {
  static createView() {
    TaskListFactory.createTaskList().createTaskListContainer();
  }
}
