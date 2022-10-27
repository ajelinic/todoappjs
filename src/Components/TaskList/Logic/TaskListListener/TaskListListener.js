/**
 * @TaskListListener
 */

import { TaskListConnector } from "../../TaskListConnector.js";

export class TaskListListener {
  static listenTaskCheckDone(taskList) {
    taskList.addEventListener("change", () => {
      TaskListConnector.handleTask();
    });
  }

  static preventKeyPressOnTaskCreate() {
    let input = TaskListConnector.getInputField();
    input.addEventListener("keydown", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        return;
      }
    });
  }

  static listenTaskAddToList() {
    document.addEventListener("DOMContentLoaded", () => {
      TaskListConnector.renderTask();
    });
  }

  static listenTaskRemoveFromList() {
    document.addEventListener("DOMContentLoaded", () => {
      TaskListConnector.deleteTask();
    });
  }
}
