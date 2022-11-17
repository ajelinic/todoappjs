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

  async taskListFormCreateHtml() {
    let div = DomElementCreator.createHtmlElement(
      "div",
      "form-container",
      "form-container"
    );
    this.baseElement[0].appendChild(div);
    div.appendChild(await TaskListConnector.renderTaskForm());
    TaskListConnector.renderTask();
    TaskListConnector.deleteTask();
    TaskListListener.preventKeyPressOnTaskCreate();
    TaskListConnector.hideDueButtonAndShowDateTimeInput();
  }
}
