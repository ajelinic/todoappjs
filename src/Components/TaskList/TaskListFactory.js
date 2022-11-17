/**
 * @TaskList
 */

import { TaskListCreator } from "./Logic/Creator/TaskListCreator.js";
import { TaskListHeaderCreator } from "./Logic/Creator/TaskListHeaderCreator.js";
import { TaskFormCreator } from "./Logic/Creator/TaskListFormCreator.js";
import { TaskListDataProvider } from "./TaskListDataProvider.js";

export class TaskListFactory {
  static createTaskList() {
    return new TaskListCreator(this.addMainContainer());
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

  static addMainContainer() {
    return TaskListDataProvider.getMainContainer();
  }
}
