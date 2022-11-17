/**
 * @InfoBarConnector
 */

import { StorageConnector } from "../Storage/StorageConnector.js";
import { InfoBarController } from "./Communication/InfoBarController.js";

export class InfoBarConnector {
  static initInfoBar() {
    InfoBarController.indexAction();
  }

  static getTaskInfo() {
    StorageConnector.getTasksFromStorage();
  }
}
