/**
 * @TaskListHolder
 */

import { TaskToTaskListConnector } from "../../../../../Share/TaskList/TaskToTaskListConnector/TaskToTaskListConnector.js";
import { DomElementCreator } from "../../../../../Service/DomElementCreate/DomElementCreator.js";

export class TaskListHolderCreator {
  constructor(baseElement) {
    this.baseElement = baseElement;
  }

  taskListHolderCreateMain() {
    const main = DomElementCreator.createHtmlElement(
      "main",
      "main",
      "task-list-holder"
    );
    this.baseElement[0].appendChild(main);
    main.appendChild(this.createTaskListHolder());
  }

  createTaskListHolder() {
    let taskUl = DomElementCreator.createHtmlElement(
      "ul",
      "taskList",
      "task-list task-list__content"
    );
    document.addEventListener("DOMContentLoaded", () => {
      this.addTaskToList();
      this.removeTaskFromList();
    });
    taskUl.addEventListener("change", () => {
      this.handleTask();
    });
    return taskUl;
  }

  addTaskToList() {
    return TaskToTaskListConnector.renderTask();
  }

  removeTaskFromList() {
    return TaskToTaskListConnector.deleteTask();
  }

  handleTask() {
    return TaskToTaskListConnector.handleTask();
  }
}
