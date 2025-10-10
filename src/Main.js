/**
 * @MainClass
 */

import { InfoBarConnector } from "./Components/InfoBar/InfoBarConnector.js";
import { StorageConnector } from "./Components/Storage/StorageConnector.js";
import { TaskConnector } from "./Components/Task/TaskConnector.js";
import { TaskListConnector } from "./Components/TaskList/TaskListConnector.js";

export class Main {
  static init() {
    StorageConnector.initStorage().then(() => {
      StorageConnector.importData().then(() => {
        TaskListConnector.initTaskList();
        TaskConnector.renderTasksFromStorage();
        InfoBarConnector.initInfoBar();
        InfoBarConnector.renderTaskInfo();
      });
    });
  }
}
