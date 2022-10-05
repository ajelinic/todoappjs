/**
 * @TaskListHolder
 */

import { DomElementCreator } from "../../../../Service/DomElementCreate/DomElementCreator.js";
import { TaskListListener } from "../TaskListListener/TaskListListener.js";

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
    TaskListListener.listenTaskAddToList();
    TaskListListener.listenTaskRemoveFromList();
    TaskListListener.listenTaskCheckDone(taskUl);
    return taskUl;
  }
}
