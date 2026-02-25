/**
 * @TaskFormCreator
 * @deprecated Will be removed/changed in future releases
 */

/**
 * @class TaskFormCreator
 * @description TaskFormCreator
 */
export class TaskFormCreator {
  constructor(
    domElementCreator,
    taskListDataProvider,
    taskListListener,
    taskListConnector
  ) {
    this.domElementCreator = domElementCreator;
    this.taskListDataProvider = taskListDataProvider;
    this.taskListListener = taskListListener;
    this.taskListConnector = taskListConnector;
  }

  async taskListFormCreateHtml() {
    let div = this.domElementCreator.createHtmlElement(
      "div",
      "form-container",
      "form-container"
    );
    this.taskListDataProvider.baseElement.appendChild(div);
    div.appendChild(await this.taskListConnector.renderTaskForm());
    this.taskListConnector.renderTask();
    this.taskListConnector.deleteTask();
    this.taskListListener.preventKeyPressOnTaskCreate();
    this.taskListConnector.hideDueButtonAndShowDateTimeInput();
  }
}
