/**
 * @InfoBarConnector
 */

import { StorageConnector } from "../Storage/StorageConnector.js";
import { InfoBarController } from "./Communication/InfoBarController.js";
import { InfoBarFactory } from "./InfoBarFactory.js";

export class InfoBarConnector {
  static initInfoBar() {
    InfoBarController.indexAction();
  }

  static renderTaskInfo() {
    return InfoBarFactory.createTaskInfoContainer().renderTasksToInfoList();
  }

  static renderLastEnteredTaskInfo() {
    return InfoBarFactory.createTaskInfoContainer().renderLastAddedTask();
  }

  static getLastEnteredTask() {
    return StorageConnector.getLastEnteredTask();
  }

  static getTaskInfo() {
    return StorageConnector.getTasksFromStorage();
  }
}
