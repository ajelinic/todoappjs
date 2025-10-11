/**
 * @IndexController
 */

import { TaskListFactory } from "../TaskListFactory.js";
import { TaskListHeaderController } from "./TaskListHeaderController.js";
import { TaskListController } from "./TaskListController.js";

export class IndexController {
  static indexAction() {
    this.init();
  }

  static init(data = []) {
    data.push(
      TaskListHeaderController.createView(),
      TaskListController.createView(),
      TaskListFactory.createTaskListForm().taskListFormCreateHtml()
    );

    for (let i = 0; i < data.length; i++) {
      data[i];
    }
  }
}
