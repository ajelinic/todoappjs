/**
 * @TaskCreator
 * @deprecated Will be removed/changed in future releases
 */

export class TaskCreator {
  constructor(
    dateHandler,
    domElementCreator,
    notification,
    taskConnector,
    taskConfig,
    taskHandler,
    taskDataProvider,
    taskAddValidator
  ) {
    this.dateHandler = dateHandler;
    this.domElementCreator = domElementCreator;
    this.notification = notification;
    this.taskConnector = taskConnector;
    this.taskConfig = taskConfig;
    this.taskHandler = taskHandler;
    this.taskDataProvider = taskDataProvider;
    this.taskAddValidator = taskAddValidator;
  }

  addTask() {
    let taskRes = this.getInputFieldValue();
    taskRes.then((task) => {
      if (task) {
        let listElement = this.createListElement();
        this.taskDataProvider.holderElement.appendChild(listElement);
        Object.values(task).forEach((value) => {
          if (
            !Number.isInteger(value) &&
            typeof value !== this.taskConfig.stringType()
          ) {
            listElement.appendChild(value);
          }
        });
        this.taskConnector.saveTask(task);
        this.taskConnector.renderTaskInfoToInfoTaskBar();
        this.taskDataProvider.inputField.value = "";
        this.taskDataProvider.dueTimeInput.value = "";
      }
    });
  }

  addTaskFromStorage() {
    let task;
    let getTasks = this.taskConnector.getTasksFromStorage();
    getTasks.then((result) => {
      for (let i = 0; i < result.length; i++) {
        task = this.setTaskToList(
          result[i].id,
          result[i].taskValue,
          result[i].dueTime,
          result[i].timeAdded,
          result[i].checked
        );
        let listElement = this.createListElement();
        this.taskDataProvider.holderElement.appendChild(listElement);
        Object.values(task).forEach((value) => {
          if (
            !Number.isInteger(value) &&
            typeof value !== this.taskConfig.stringType()
          ) {
            listElement.appendChild(value);
            this.taskHandler.handleTask();
          }
        });
      }
    });
  }

  async getInputFieldValue() {
    let request = this.taskAddValidator.validate(
      this.taskDataProvider.inputField.value,
      this.taskDataProvider.dueTimeInput.value
    );

    for (let entry of request) {
      if (entry) {
        if (entry.type == this.taskConfig.errorMessage()) {
          this.getMessage(entry);
          break;
        } else if (entry.type == this.taskConfig.successMessage()) {
          this.getMessage(entry);
          let id = await this.taskConnector.getLastTaskId();
          return this.setTaskToList(
            id,
            this.taskDataProvider.inputField.value,
            this.dateHandler.getTimeInMillis(
              this.taskDataProvider.dueTimeInput.value
            )
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
      taskID: this.domElementCreator.createHtmlElement(
        "span",
        "taskID",
        "taskID is--hidden",
        id
      ),
      taskValue: this.domElementCreator.createHtmlElement(
        "span",
        "task",
        "task--title",
        taskInputValue
      ),
      timeAdded: this.domElementCreator.createHtmlElement(
        "span",
        "timeAdded",
        "task--time-added",
        addedAt ? addedAt : this.dateHandler.createTimeTaskAdded()
      ),
      checkbox: this.domElementCreator.createInputElement(
        "checkbox",
        "checkbox",
        "done",
        "done",
        "",
        checked
      ),
      dueTime: dueTimeValue ? dueTimeValue : this.taskConfig.noDueTime(),
    };

    return taskObject;
  }

  createListElement() {
    return this.domElementCreator.createHtmlElement("li", "taskItem", "task");
  }

  getMessage(message) {
    this.notification.createTaskNotification(message);
    return message.type;
  }
}
