/**
 * @MainClass
 */

import { StorageConnector } from "./Components/Storage/StorageConnector.js";
import { TaskListConnector } from "./Components/TaskList/TaskListConnector.js";

export class Main {
  static init() {
    TaskListConnector.initTaskList();
    StorageConnector.initStorage();
    TaskListConnector.checkTaskDueTime();
  }
}
