/**
 * @TaskForm
 */

import { DomElementCreator } from "../../../Service/DomElementCreate/DomElementCreator.js";
import { TaskConfig } from "../TaskConfig.js";

export class TaskForm {
  buildForm() {
    const formElementsArray = [
      this.appendTaskInputField(),
      this.appendAddTaskButton(),
      this.appendClearTaskButton(),
    ];

    let form = DomElementCreator.createHtmlElement("form", "taskForm", "form");

    for (let i = 0; i < formElementsArray.length; i++) {
      form.appendChild(formElementsArray[i]);
    }

    return form;
  }

  appendAddTaskButton() {
    return DomElementCreator.createButtonElement(
      "button",
      "add",
      TaskConfig.setAddButtonInnerText(),
      "button button--border button--color button--font"
    );
  }

  appendClearTaskButton() {
    return DomElementCreator.createButtonElement(
      "button",
      "clear",
      TaskConfig.setClearButtonInnerText(),
      "button button--border button--color button--font"
    );
  }

  appendTaskInputField() {
    return DomElementCreator.createInputElement(
      "input",
      "text",
      "addTaskField",
      "addTaskField",
      "",
      "input input__add-task"
    );
  }
}
