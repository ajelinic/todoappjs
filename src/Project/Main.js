/**
 * @MainClass
 */

import { StorageConnector } from "./Share/Connectors/StorageConnector.js";
import { TaskListConnector } from "./Share/Connectors/TaskListConnector.js";

export class Main {
  static init() {
    TaskListConnector.initTaskList();
    StorageConnector.initStorage();
  }
}
