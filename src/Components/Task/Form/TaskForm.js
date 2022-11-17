/**
 * @TaskForm
 */

import { DomElementCreator } from "../../../Utils/DomElementCreate/DomElementCreator.js";
import { Glossary } from "../../../Utils/Glossary/Glossary.js";

export class TaskForm {
  async buildForm() {
    const formElementsArray = [
      this.appendTaskInputField(),
      await this.appendDueTimeButton(),
      this.appendDueTimeInput(),
      await this.appendAddTaskButton(),
      await this.appendClearTaskButton(),
    ];

    let form = DomElementCreator.createHtmlElement("form", "taskForm", "form");

    for (let i = 0; i < formElementsArray.length; i++) {
      form.appendChild(formElementsArray[i]);
    }

    return await form;
  }

  async appendAddTaskButton() {
    return DomElementCreator.createButtonElement(
      "add",
      await Glossary.getGlossaryData("todoapp.input.add"),
      "button button--border button--color button--font"
    );
  }

  async appendDueTimeButton() {
    return DomElementCreator.createButtonElement(
      "due-time",
      await Glossary.getGlossaryData("todoapp.input.due"),
      "button button--border button--color button--font"
    );
  }

  async appendClearTaskButton() {
    return DomElementCreator.createButtonElement(
      "clear",
      await Glossary.getGlossaryData("todoapp.clear.list"),
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
