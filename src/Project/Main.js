/**
 * @MainClass
 */

import { TaskListHolderController } from "./Modules/TaskList/Communication/TaskListHolderController.js";
import { TaskListHeaderController } from "./Modules/TaskList/Communication/TaskListHeaderController.js";
import { TaskListFooterController } from "./Modules/TaskList/Communication/TaskListFooterController.js";

export class Main {
  static init() {
    TaskListHeaderController.createView();
    TaskListHolderController.createView();
    TaskListFooterController.createView();
  }
}
