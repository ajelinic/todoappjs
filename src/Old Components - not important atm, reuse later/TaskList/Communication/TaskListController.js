/**
 * @TaskListController
 */

import { TaskListFactory } from "../TaskListFactory.js";

export class TaskListController {
  static createView() {
    TaskListFactory.createTaskList().createTaskListContainer();
  }
}
