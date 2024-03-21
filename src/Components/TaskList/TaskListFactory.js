/**
 * @TaskList
 */

import { TaskListCreator } from "./Logic/Creator/TaskListCreator.js";
import { TaskListHeaderCreator } from "./Logic/Creator/TaskListHeaderCreator.js";
import { TaskFormCreator } from "./Logic/Creator/TaskListFormCreator.js";
import { TaskListDataProvider } from "./TaskListDataProvider.js";
import { DomElementCreator } from "../../Utils/DomElementCreate/DomElementCreator.js";
import { Glossary } from "../../Utils/Glossary/Glossary.js";
import { TaskListListener } from "./Logic/TaskListListener/TaskListListener.js";
import { TaskListConnector } from "./TaskListConnector.js";
import { DateTimeHandler } from "../../Utils/DateTimeHandle/DateTimeHandler.js";

export class TaskListFactory {
  static createTaskList() {
    return new TaskListCreator(
      DomElementCreator,
      TaskListDataProvider,
      TaskListListener
    );
  }

  static createTaskListHeader() {
    return new TaskListHeaderCreator(
      DateTimeHandler,
      DomElementCreator,
      TaskListDataProvider,
      Glossary
    );
  }

  static createTaskListForm() {
    return new TaskFormCreator(
      DomElementCreator,
      TaskListDataProvider,
      TaskListListener,
      TaskListConnector
    );
  }
}
