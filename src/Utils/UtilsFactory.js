/**
 * @UtilsFactory
 */

import { Notification } from "./Notification/Notification.js";
import { UtilsDataProvider } from "./UtilsDataProvider.js";

export class UtilsFactory {
  static createNotificationUtil() {
    return new Notification(this.getBaseElement());
  }

  static createDateTime() {
    return new Date();
  }

  static createXMLHttpRequest() {
    return new XMLHttpRequest();
  }

  static getBaseElement() {
    return UtilsDataProvider.setBaseElement();
  }
}
