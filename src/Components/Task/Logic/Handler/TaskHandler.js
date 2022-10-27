/**
 * @TaskHandler
 */

import { TaskConnector } from "../../TaskConnector.js";
import { TaskConfig } from "../../TaskConfig.js";

export class TaskHandler {
  constructor(holderElement, checkboxCollection) {
    this.holderElement = holderElement;
    this.checkboxCollection = checkboxCollection;
  }

  handleTask() {
    for (let i = 0; i < this.checkboxCollection.length; i++) {
      if (this.checkboxCollection[i].checked == true) {
        TaskConnector.updateTaskStatus([i], this.checkboxCollection[i].checked);
        this.checkboxCollection[i].parentElement.classList.add(
          TaskConfig.getCrossClass()
        );
      } else if (this.checkboxCollection[i].checked == false) {
        TaskConnector.updateTaskStatus([i], this.checkboxCollection[i].checked);
        this.checkboxCollection[i].parentElement.classList.remove(
          TaskConfig.getCrossClass()
        );
      }
    }
  }

  static handleTaskDueTime(dueButton, timeDueInput) {
    if (timeDueInput.classList.contains(TaskConfig.getHiddenClass())) {
      dueButton.classList.add(TaskConfig.getHiddenClass());
      timeDueInput.classList.remove(TaskConfig.getHiddenClass());
    } else if (dueButton.classList.contains(TaskConfig.getHiddenClass())) {
      dueButton.classList.remove(TaskConfig.getHiddenClass());
      timeDueInput.classList.add(TaskConfig.getHiddenClass());
    }
  }

  checkTaskDueTime() {
    for (let i = 0; i < this.checkboxCollection.length; i++) {
      let dueTime = TaskConnector.getDueTimeFromStorage([i]);
      let currentDateInMillis = new Date().getTime();

      if (currentDateInMillis > dueTime) {
        this.checkboxCollection[i].parentElement.style.color = "red";
      }
    }
  }
}
