/**
 * @TaskCreator
 */

import { DateHandler } from "../../../../Service/Date/DateHandler.js";
import { DomElementCreator } from "../../../../Service/DomElementCreate/DomElementCreator.js";
import { TaskConfig } from "../../TaskConfig.js";
import { TaskFactory } from "../../TaskFactory.js";

export class TaskCreator {
  constructor(holderElement, addButton, inputField) {
    this.holderElement = holderElement;
    this.addButton = addButton;
    this.inputField = inputField;
    this.counter = 0;
  }

  addTask() {
    this.addButton.addEventListener("click", (e) => {
      e.preventDefault();
      let task = this.getInputFieldValue();
      if (task) {
        let listElement = DomElementCreator.createHtmlElement(
          "li",
          "taskItem",
          "task task-list"
        );
        this.holderElement.appendChild(listElement);
        Object.values(task).forEach((value) => {
          listElement.appendChild(value);
        });
        this.inputField.value = "";
      }
    });
  }

  getInputFieldValue() {
    const error = TaskConfig.getErrorTypeMessage();
    const success = TaskConfig.getSuccessTypeMessage();

    let request = TaskFactory.createTaskAddValidator();
    let response = request.validate(this.inputField.value);

    if (response == error) {
      return;
    } else if (response == success) {
      return this.setTaskToList(this.inputField.value);
    }
  }

  setTaskToList(value) {
    let task = {
      taskValue: DomElementCreator.createHtmlElement(
        "span",
        "task",
        "task",
        value
      ),
      timeAdded: DomElementCreator.createHtmlElement(
        "span",
        "time-added",
        "time-added",
        DateHandler.createTimeTaskAdded()
      ),
      checkbox: DomElementCreator.createInputElement(
        "input",
        "checkbox",
        this.counter++,
        "done",
        "done",
        ""
      ),
    };

    return task;
  }
}
