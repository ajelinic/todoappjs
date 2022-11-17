/**
 * @IndexController
 */

import { TaskListFactory } from "../TaskListFactory.js";
import { TaskListHeaderController } from "./TaskListHeaderController.js";
import { TaskListController } from "./TaskListController.js";
import { DomElementCreator } from "../../../Utils/DomElementCreate/DomElementCreator.js";

export class IndexController {
  static indexAction() {
    this.init();
  }

  static init(data = []) {
    data.push(
      TaskListHeaderController.indexAction(),
      this.createContainer(),
      TaskListController.indexAction(),
      TaskListFactory.createTaskListForm().taskListFormCreateHtml()
    );

    for (let i = 0; i < data.length; i++) {
      data[i];
    }
  }

  static createContainer() {
    let mainContainer = DomElementCreator.createHtmlElement(
      "div",
      "main-container",
      "main-container"
    );
    return TaskListFactory.addBaseElement()[0].appendChild(mainContainer);
  }
}
