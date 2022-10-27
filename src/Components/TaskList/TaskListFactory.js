/**
 * @TaskList
 */

import { TaskListHolderCreator } from "./Logic/Creator/TaskListHolderCreator.js";
import { TaskListHeaderCreator } from "./Logic/Creator/TaskListHeaderCreator.js";
import { TaskFormCreator } from "./Logic/Creator/TaskListFormCreator.js";
import { TaskListDataProvider } from "./TaskListDataProvider.js";

export class TaskListFactory {
  static createTaskListHolder() {
    return new TaskListHolderCreator(this.addBaseElement());
  }

  static createTaskListHeader() {
    return new TaskListHeaderCreator(this.addBaseElement());
  }

  static createTaskListForm() {
    return new TaskFormCreator(this.addBaseElement());
  }

  static addBaseElement() {
    return TaskListDataProvider.getBaseElement();
  }
}
