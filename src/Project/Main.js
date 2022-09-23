/**
 * @MainClass
 */

import { TaskListHolderController } from "./Modules/TaskList/Presentation/TaskListHolderController.js";
import { TaskListHeaderController } from "./Modules/TaskList/Presentation/TaskListHeaderController.js";
import { TaskListFooterController } from "./Modules/TaskList/Presentation/TaskListFooterController.js";

export class Main {
  static init() {
    TaskListHeaderController.createView();
    TaskListHolderController.createView();
    TaskListFooterController.createView();
  }
}
