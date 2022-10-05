/**
 * @TaskFormHandler
 */

import { TaskHandler } from "./TaskHandler.js";
import { TaskListener } from "../TaskListener/TaskListener.js";

export class TaskFormHandler {
  constructor(dueButton, timeDueInput, addTaskButton, inputValue) {
    this.dueButton = dueButton;
    this.addTaskButton = addTaskButton;
    this.timeDueInput = timeDueInput;
    this.inputValue = inputValue;
  }

  addTask() {
    TaskListener.listenIfAddToListIsClicked(
      this.addTaskButton,
      this.timeDueInput,
      this.inputValue
    );
  }

  hideDueButtonAndShowDateTimeInput() {
    TaskListener.listenIfDueButtonIsClicked(
      this.dueButton,
      this.timeDueInput,
      this.inputValue
    );
  }

  showDueButtonAndShowDateTimeInput() {
    TaskHandler.handleTaskDueTime(this.dueButton, this.timeDueInput);
  }
}
