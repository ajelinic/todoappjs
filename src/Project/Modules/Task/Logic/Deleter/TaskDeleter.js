/**
 * @TaskDeleter
 */

import { TaskConnector } from "../../../../Share/Connectors/TaskConnector.js";
import { TaskFactory } from "../../TaskFactory.js";

export class TaskDeleter {
  constructor(holderElement, clearButton) {
    this.holderElement = holderElement;
    this.clearButton = clearButton;
  }

  deleteTask() {
    this.clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.checkIfSelectedTasks(this.getTaskCollection());
    });
  }

  getTaskCollection() {
    return this.holderElement.children;
  }

  checkIfSelectedTasks(taskCollection) {
    let checkedTasks = true;
    let request = TaskFactory.createTaskDeleteValidator();
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
      return request.validate(checkedTasks);
    } else {
      request.emptyValue(taskCollection.length);
    }
  }

  removeDoneTasksFromList(taskCollection) {
    for (let i = taskCollection.length; i--; ) {
      let taskCheckboxes = taskCollection[i].children.done;
      if (taskCheckboxes.checked == true) {
        TaskConnector.deleteFromStorage([i]);
        taskCheckboxes.parentElement.remove();
      }
    }
  }
}
