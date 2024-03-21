/**
 * @TaskDataProvider
 */

export class TaskDataProvider {
  static get addTaskButton() {
    return document.querySelector("#add");
  }

  static get clearButton() {
    return document.querySelector("#clear");
  }

  static get taskCheckBoxes() {
    return document.querySelectorAll("input[name=done]");
  }

  static get holderElement() {
    return document.querySelector("#task-list");
  }

  static get dueTimeButton() {
    return document.querySelector("#due-time");
  }

  static get dueTimeInput() {
    return document.querySelector("#due-time-input");
  }

  static get inputField() {
    return document.querySelector("input[name = 'addTaskField'");
  }
}
