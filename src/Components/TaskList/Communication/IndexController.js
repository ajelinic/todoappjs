/**
 * @IndexController
 */

import { TaskListConnector } from "../TaskListConnector.js";
import { TaskListFactory } from "../TaskListFactory.js";
import { TaskListHeaderController } from "./TaskListHeaderController.js";
import { TaskListHolderController } from "./TaskListHolderController.js";

export class IndexController {
  static indexAction() {
    this.init();
  }

  static init(data = []) {
    data.push(
      TaskListHeaderController.indexAction(),
      TaskListHolderController.indexAction(),
      TaskListFactory.createTaskListForm().taskListFormCreateHtml()
    );
    for (let i = 0; i < data.length; i++) {
      data[i];
    }
  }
}
