/**
 * @IndexController
 */

import { TaskListFooterController } from "./TaskListFooterController.js";
import { TaskListHeaderController } from "./TaskListHeaderController.js";
import { TaskListHolderController } from "./TaskListHolderController.js";

export class IndexController {
  static indexAction() {
    this.viewResponse();
  }

  static viewResponse(data = []) {
    data.push(
      TaskListHeaderController.indexAction(),
      TaskListHolderController.indexAction(),
      TaskListFooterController.indexAction()
    );
    for (let i = 0; i < data.length; i++) {
      data[i];
    }
  }
}
