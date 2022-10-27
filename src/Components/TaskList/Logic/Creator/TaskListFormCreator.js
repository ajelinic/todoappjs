/**
 * @TaskFormCreator
 */

import { DomElementCreator } from "../../../../Utils/DomElementCreate/DomElementCreator.js";
import { TaskListConnector } from "../../TaskListConnector.js";
import { TaskListListener } from "../TaskListListener/TaskListListener.js";

export class TaskFormCreator {
  constructor(baseElement) {
    this.baseElement = baseElement;
  }

  taskListFormCreateHtml() {
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
