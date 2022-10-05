/**
 * @TaskListFooterCreator
 */

import { DomElementCreator } from "../../../../Service/DomElementCreate/DomElementCreator.js";
import { TaskListConnector } from "../../../../Share/Connectors/TaskListConnector.js";
import { TaskListListener } from "../TaskListListener/TaskListListener.js";

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
    div.appendChild(TaskListConnector.renderTaskForm());
    TaskListListener.preventKeyPressOnTaskCreate();
    TaskListConnector.hideDueButtonAndShowDateTimeInput();
  }
}
