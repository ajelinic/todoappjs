/**
 * @TaskInfoCreator
 */

import { DomElementCreator } from "../../../../Utils/DomElementCreate/DomElementCreator.js";
import { InfoBarConnector } from "../../InfoBarConnector.js";

export class TaskInfoCreator {
  constructor(taskInfoContainer) {
    this.taskInfoContainer = taskInfoContainer;
  }

  createTaskInfo() {
    let taskInfoData = DomElementCreator.createHtmlElement(
      "div",
      "task-info-data",
      "task-info-data"
    );
    taskInfoData = this.gatherInfoData();
    this.taskInfoContainer.appendChild(taskInfoData);
  }

  gatherInfoData() {
    let task;
    let taskArr = InfoBarConnector.getTaskInfo();
    for (let i = 0; i < taskArr.length; i++) {
      const taskFromStorage = taskArr[i];
      task = this.setTaskToList(
        taskFromStorage.taskValue,
        taskFromStorage.dueTime,
        taskFromStorage.timeAdded
      );
      let listElement = this.createListElement();
      this.holderElement.appendChild(listElement);
      Object.values(task).forEach((value) => {
        if (
          typeof value !== TaskConfig.numberType() &&
          typeof value !== TaskConfig.stringType()
        ) {
          listElement.appendChild(value);
          TaskFactory.createTaskHandler().handleTask();
        }
      });
    }
  }
}
