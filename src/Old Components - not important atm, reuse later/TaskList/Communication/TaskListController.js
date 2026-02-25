/**
 * @TaskListController
 * @deprecated Will be removed/changed in future releases
 */

import { TaskListFactory } from "../TaskListFactory.js";

/**
 * @class TaskListController
 * @description TaskListController
 */
export class TaskListController {
  static createView() {
    TaskListFactory.createTaskList().createTaskListContainer();
  }
}
