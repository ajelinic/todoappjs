/**
 * @TaskCreator
 */

import { DateHandler } from "../../../../Service/Date/DateHandler.js";
import { DomElementCreator } from "../../../../Service/DomElementCreate/DomElementCreator.js";
import { UtilsFactory } from "../../../../Service/UtilsFactory.js";
import { TaskConnector } from "../../../../Share/Connectors/TaskConnector.js";
import { TaskConfig } from "../../TaskConfig.js";
import { TaskFactory } from "../../TaskFactory.js";

export class TaskCreator {
  constructor(holderElement, inputField, dueTimeInput) {
    this.holderElement = holderElement;
    this.inputField = inputField;
    this.dueTimeInput = dueTimeInput;
  }

  addTask() {
    let task = this.getInputFieldValue();
    if (task) {
      let listElement = this.createListElement();
      this.holderElement.appendChild(listElement);
      Object.values(task).forEach((value) => {
        if (
          typeof value !== TaskConfig.numberType() &&
          typeof value !== TaskConfig.stringType()
        ) {
          listElement.appendChild(value);
        }
      });
      TaskConnector.saveTask(task);
      this.inputField.value = "";
      this.dueTimeInput.value = "";
    }
  }

  addTaskFromStorage(taskArr) {
    let task;
    for (let i = 0; i < taskArr.length; i++) {
      const taskFromStorage = taskArr[i];
      task = this.setTaskToList(
        taskFromStorage.taskValue,
        taskFromStorage.dueTime,
        taskFromStorage.timeAdded,
        taskFromStorage.checked
      );
      let listElement = this.createListElement();
      this.holderElement.appendChild(listElement);
      Object.values(task).forEach((value) => {
        if (
          typeof value !== TaskConfig.numberType() &&
          typeof value !== TaskConfig.stringType()
        ) {
          listElement.appendChild(value);
          TaskFactory.createTaskHandler().handleTask();
        }
      });
    }
  }

  getInputFieldValue() {
    let request = TaskFactory.createTaskAddValidator();
    let response = request.validate(
      this.inputField.value,
      this.dueTimeInput.value
    );

    for (let entry of response) {
      if (entry) {
        if (entry.type == TaskConfig.errorMessage()) {
          this.getMessage(entry);
          break;
        } else if (entry.type == TaskConfig.successMessage()) {
          this.getMessage(entry);
          return this.setTaskToList(
            this.inputField.value,
            DateHandler.getDueTimeInMillis(this.dueTimeInput.value)
          );
        }
      }
    }
  }

  setTaskToList(taskInputValue, dueTimeValue, addedAt = null, checked = false) {
    let taskObject = {
      taskValue: DomElementCreator.createHtmlElement(
        "span",
        "task",
        "task",
        taskInputValue
      ),
      timeAdded: DomElementCreator.createHtmlElement(
        "span",
        "time-added",
        "time-added",
        addedAt ? addedAt : DateHandler.createTimeTaskAdded()
      ),
      checkbox: DomElementCreator.createInputElement(
        "checkbox",
        "checkbox",
        "done",
        "done",
        "",
        checked
      ),
      dueTime: dueTimeValue ? dueTimeValue : TaskConfig.noDueTime(),
    };

    return taskObject;
  }

  createListElement() {
    return DomElementCreator.createHtmlElement(
      "li",
      "taskItem",
      "task task-list"
    );
  }

  getMessage(message) {
    let createMessage = UtilsFactory.createNotificationUtil();
    createMessage.createTaskNotification(message);
    return message.type;
  }
}
