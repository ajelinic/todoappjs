/**
 * @TaskListListener
 * @deprecated Will be removed/changed in future releases
 */

import { TaskListConnector } from "../../TaskListConnector.js";

/**
 * @class TaskListListener
 * @description TaskListListener
 */
export class TaskListListener {
  static listenTaskCheckDone(taskList) {
    taskList.addEventListener("change", () => {
      TaskListConnector.handleTask();
    });
  }

  static preventKeyPressOnTaskCreate() {
    let input = TaskListConnector.getInputField();
    input.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        return;
      }
    });
  }
}
