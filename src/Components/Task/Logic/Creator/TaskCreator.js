/**
 * @TaskCreator
 */

import { DateHandler } from "../../../../Utils/Date/DateHandler.js";
import { DomElementCreator } from "../../../../Utils/DomElementCreate/DomElementCreator.js";
import { UtilsFactory } from "../../../../Utils/UtilsFactory.js";
import { TaskConnector } from "../../TaskConnector.js";
import { TaskConfig } from "../../TaskConfig.js";
import { TaskFactory } from "../../TaskFactory.js";

export class TaskCreator {
  constructor(holderElement, inputField, dueTimeInput) {
    this.holderElement = holderElement;
    this.inputField = inputField;
    this.dueTimeInput = dueTimeInput;
  }

  addTask() {
    let taskRes = this.getInputFieldValue();
    taskRes.then((task) => {
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
    });
  }

  addTaskFromStorage() {
    let task;
    let getTasks = TaskConnector.getTasksFromStorage();
    getTasks.then((result) => {
      for (let i = 0; i < result.length; i++) {
        const taskFromStorage = result[i];
        task = this.setTaskToList(
          taskFromStorage.id,
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
    });
  }

  async getInputFieldValue() {
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
          let id = await TaskConnector.getLastTaskId();
          return this.setTaskToList(
            id,
            this.inputField.value,
            DateHandler.getDueTimeInMillis(this.dueTimeInput.value)
          );
        }
      }
    }
  }

  setTaskToList(
    id,
    taskInputValue,
    dueTimeValue,
    addedAt = null,
    checked = false
  ) {
    let taskObject = {
      taskID: DomElementCreator.createHtmlElement(
        "span",
        "taskID",
        "taskID is--hidden",
        id
      ),
      taskValue: DomElementCreator.createHtmlElement(
        "span",
        "task",
        "task--title",
        taskInputValue
      ),
      timeAdded: DomElementCreator.createHtmlElement(
        "span",
        "timeAdded",
        "timeAdded",
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
