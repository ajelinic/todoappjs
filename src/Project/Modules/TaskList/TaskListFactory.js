/**
 * @TaskList
 */

import { TaskListHolderCreator } from "./Logic/Creator/TaskListHolder/TaskListHolderCreator.js";
import { TaskListHeaderCreator } from "./Logic/Creator/TaskListHeader/TaskListHeaderCreator.js";
import { TaskListFooterCreator } from "./Logic/Creator/TaskListFooter/TaskListFooterCreator.js";
import { TaskListDependecyProvider } from "./TaskListDependecyProvider.js";

export class TaskListFactory {
  static createTaskListHolder() {
    return new TaskListHolderCreator(this.addBaseElement());
  }

  static createTaskListHeader() {
    return new TaskListHeaderCreator(this.addBaseElement());
  }

  static createTaskListFooter() {
    return new TaskListFooterCreator(this.addBaseElement());
  }

  static addBaseElement() {
    return TaskListDependecyProvider.getBaseElement();
  }
}
