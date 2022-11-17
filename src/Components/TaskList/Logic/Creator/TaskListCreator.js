/**
 * @TaskListCreator
 */

import { DomElementCreator } from "../../../../Utils/DomElementCreate/DomElementCreator.js";
import { TaskListListener } from "../TaskListListener/TaskListListener.js";

export class TaskListCreator {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  createTaskListContainer() {
    const taskListContainer = DomElementCreator.createHtmlElement(
      "div",
      "task-list-container",
      "task-list-container"
    );
    this.containerElement.appendChild(taskListContainer);
    taskListContainer.appendChild(this.taskListCreateHtml());
  }

  taskListCreateHtml() {
    const taskList = DomElementCreator.createHtmlElement(
      "div",
      "task-list",
      "task-list-holder"
    );
    taskList.appendChild(this.createTaskListHolder());
    return taskList;
  }

  createTaskListHolder() {
    let taskUl = DomElementCreator.createHtmlElement(
      "ul",
      "taskList",
      "task-list task-list__content"
    );
    TaskListListener.listenTaskCheckDone(taskUl);
    return taskUl;
  }
}
