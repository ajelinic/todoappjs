/**
 * @TaskDataProvider
 */

export class TaskDataProvider {
  static queryAddTaskButton() {
    return document.querySelector("#add");
  }

  static queryDeleteTaskButton() {
    return document.querySelector("#clear");
  }

  static queryTaskCheckBox() {
    return document.querySelectorAll("input[name=done]");
  }

  static getHolderElement() {
    return document.querySelector("#taskList");
  }

  static getDueTimeButton() {
    return document.querySelector("#due-time");
  }

  static getDueTimeInput() {
    return document.querySelector("#due-time-input");
  }

  static getInputField() {
    return document.querySelector("input[name = 'addTaskField'");
  }
}
