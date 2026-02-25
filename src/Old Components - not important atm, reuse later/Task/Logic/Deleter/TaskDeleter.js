/**
 * @TaskDeleter
 * @deprecated Will be removed/changed in future releases
 */

/**
 * @class TaskDeleter
 * @description TaskDeleter
 */
export class TaskDeleter {
  constructor(taskConnector, taskDataProvider, taskDeleteValidator) {
    this.taskConnector = taskConnector;
    this.taskDataProvider = taskDataProvider;
    this.taskDeleteValidator = taskDeleteValidator;
  }

  deleteTask() {
    this.taskDataProvider.clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.checkIfSelectedTasks(this.taskDataProvider.holderElement.children);
    });
  }

  checkIfSelectedTasks(taskCollection) {
    let checkedTasks = true;
    if (taskCollection.length > 0) {
      for (let i = 0; i < taskCollection.length; i++) {
        let taskCheckboxes = taskCollection[i].children.done;
        if (taskCheckboxes.checked == true) {
          this.removeDoneTasksFromList(taskCollection);
          checkedTasks = taskCheckboxes.checked;
          break;
        } else {
          checkedTasks = taskCheckboxes.checked;
        }
      }
      return this.taskDeleteValidator.validate(checkedTasks);
    } else {
      this.taskDeleteValidator.emptyValue(taskCollection.length);
    }
  }

  removeDoneTasksFromList(taskCollection) {
    for (let i = taskCollection.length; i--; ) {
      let taskCheckboxes = taskCollection[i].children.done;
      if (taskCheckboxes.checked == true) {
        this.taskConnector.deleteFromStorage(
          taskCheckboxes.parentElement.querySelector("#taskID").innerText
        );
        taskCheckboxes.parentElement.remove();
      }
    }
  }
}
