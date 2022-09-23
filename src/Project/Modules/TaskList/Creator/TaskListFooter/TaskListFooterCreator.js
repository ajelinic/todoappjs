/**
 * @TaskListFooterCreator
 */

import { DomElementCreator } from "../../../Utils/DomElementCreate/DomElementCreator.js";
import { TaskToTaskListConnector } from "../../../../ModuleConnect/TaskList/TaskToTaskListConnector/TaskToTaskListConnector.js";

export class TaskListFooterCreator {
  constructor(baseElement) {
    this.baseElement = baseElement;
  }

  taskListFooterCreateHtml() {
    let div = DomElementCreator.createHtmlElement(
      "footer",
      "footer",
      "taskListFooter"
    );
    this.baseElement[0].appendChild(div);
    div.appendChild(TaskListFooterCreator.renderTaskForm());
  }

  static renderTaskForm() {
    return TaskToTaskListConnector.connectTaskForm();
  }
}
