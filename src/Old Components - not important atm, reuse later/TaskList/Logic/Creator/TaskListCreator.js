/**
 * @TaskListCreator
 * @deprecated Will be removed/changed in future releases
 */

/**
 * @class TaskListCreator
 * @description TaskListCreator
 */
export class TaskListCreator {
  constructor(domElementCreator, taskListDataProvider, taskListListener) {
    this.domElementCreator = domElementCreator;
    this.taskListDataProvider = taskListDataProvider;
    this.taskListListener = taskListListener;
  }

  createTaskListContainer() {
    const taskListContainer = this.domElementCreator.createHtmlElement(
      "div",
      "task-list-container",
      "task-list-container"
    );
    this.createContainer().appendChild(taskListContainer);
    taskListContainer.appendChild(this.taskListCreateHtml());
  }

  taskListCreateHtml() {
    const taskList = this.domElementCreator.createHtmlElement(
      "div",
      "task-list-holder",
      "task-list-holder"
    );
    taskList.appendChild(this.createTaskListHolder());
    return taskList;
  }

  createTaskListHolder() {
    let taskUl = this.domElementCreator.createHtmlElement(
      "ul",
      "task-list",
      "task-list task-list__content"
    );
    this.taskListListener.listenTaskCheckDone(taskUl);
    return taskUl;
  }

  createContainer() {
    let mainContainer = this.domElementCreator.createHtmlElement(
      "div",
      "content-container",
      "content-container"
    );
    return this.taskListDataProvider.baseElement.appendChild(mainContainer);
  }
}
