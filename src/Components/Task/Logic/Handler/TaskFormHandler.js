/**
 * @TaskFormHandler
 */

export class TaskFormHandler {
  constructor(
    taskDataProvider,
    taskHandler,
    taskDueTimeListener,
    taskListener
  ) {
    this.taskDataProvider = taskDataProvider;
    this.taskHandler = taskHandler;
    this.taskDueTimeListener = taskDueTimeListener;
    this.taskListener = taskListener;
  }

  addTask() {
    this.taskListener.listenIfAddToListIsClicked(
      this.taskDataProvider.addTaskButton,
      this.taskDataProvider.dueTimeInput,
      this.taskDataProvider.inputField
    );
  }

  hideDueButtonAndShowDateTimeInput() {
    this.taskDueTimeListener.listenIfDueButtonIsClicked(
      this.taskDataProvider.dueTimeButton,
      this.taskDataProvider.dueTimeInput,
      this.taskDataProvider.inputField
    );
  }
}
