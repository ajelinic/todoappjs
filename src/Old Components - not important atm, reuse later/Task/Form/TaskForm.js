/**
 * @TaskForm
 * @deprecated Will be removed/changed in future releases
 */

/**
 * @class TaskForm
 * @description TaskForm
 */
export class TaskForm {
  constructor(glossary, domElementCreator) {
    this.glossary = glossary;
    this.domElementCreator = domElementCreator;
  }

  async buildForm() {
    const formElementsArray = [
      this.appendTaskInputField(),
      await this.appendDueTimeButton(),
      this.appendDueTimeInput(),
      await this.appendAddTaskButton(),
      await this.appendClearTaskButton(),
    ];

    let form = this.domElementCreator.createHtmlElement(
      "form",
      "taskForm",
      "form"
    );

    for (let i = 0; i < formElementsArray.length; i++) {
      form.appendChild(formElementsArray[i]);
    }

    return await form;
  }

  async appendAddTaskButton() {
    return this.domElementCreator.createButtonElement(
      "add",
      await this.glossary.getGlossaryData("todoapp.input.add"),
      "button button--border button--color button--font"
    );
  }

  async appendDueTimeButton() {
    return this.domElementCreator.createButtonElement(
      "due-time",
      await this.glossary.getGlossaryData("todoapp.input.due"),
      "button button--border button--color button--font"
    );
  }

  async appendClearTaskButton() {
    return this.domElementCreator.createButtonElement(
      "clear",
      await this.glossary.getGlossaryData("todoapp.clear.list"),
      "button button--border button--color button--font"
    );
  }

  appendTaskInputField() {
    return this.domElementCreator.createInputElement(
      "text",
      "addTaskField",
      "addTaskField",
      "",
      "input input__add-task"
    );
  }

  appendDueTimeInput() {
    return this.domElementCreator.createInputElement(
      "datetime-local",
      "due-time-input",
      "due-time-input",
      "",
      "input is--hidden"
    );
  }
}
