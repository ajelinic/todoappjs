/**
 * @TaskListDataProvider
 */

export class TaskListDataProvider {
  static getBaseElement() {
    return document.getElementsByTagName("body");
  }

  static getMainContainer() {
    return document.querySelector("#main-container");
  }
}
