/**
 * @TaskForm
 */

import { DomElementCreator } from "../../../Utils/DomElementCreate/DomElementCreator.js";
import { TaskConfig } from "../TaskConfig.js";

export class TaskForm {
  buildForm() {
    const formElementsArray = [
      this.appendTaskInputField(),
      this.appendDueTimeButton(),
      this.appendDueTimeInput(),
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
      "add",
      TaskConfig.setAddButtonInnerText(),
      "button button--border button--color button--font"
    );
  }

  appendDueTimeButton() {
    return DomElementCreator.createButtonElement(
      "due-time",
      "+Due",
      "button button--border button--color button--font"
    );
  }

  appendClearTaskButton() {
    return DomElementCreator.createButtonElement(
      "clear",
      TaskConfig.setClearButtonInnerText(),
      "button button--border button--color button--font"
    );
  }

  appendTaskInputField() {
    return DomElementCreator.createInputElement(
      "text",
      "addTaskField",
      "addTaskField",
      "",
      "input input__add-task"
    );
  }

  appendDueTimeInput() {
    return DomElementCreator.createInputElement(
      "datetime-local",
      "due-time-input",
      "due-time-input",
      "",
      "input is--hidden"
    );
  }
}
