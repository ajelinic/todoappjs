/**
 * @TaskListener
 * @deprecated Will be removed/changed in future releases
 */

export class TaskSubmitListener {
  constructor(
    taskDataProvider,
    notification,
    taskConfig,
    taskHandler,
    taskCreator
  ) {
    this.taskDataProvider = taskDataProvider;
    this.notification = notification;
    this.taskConfig = taskConfig;
    this.taskHandler = taskHandler;
    this.taskCreator = taskCreator;
  }

  listenIfAddToListIsClicked(addButton, dueTimeInput, taskInput) {
    addButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        taskInput.value !== "" &&
        !dueTimeInput.classList.contains(this.taskConfig.hiddenClass) &&
        !taskInput.value.match(this.taskConfig.numberRegex())
      ) {
        this.taskHandler.handleTaskDueTime(
          this.taskDataProvider.dueTimeButton,
          this.taskDataProvider.dueTimeInput
        );
      }
      this.taskCreator.addTask();
    });
  }
}
