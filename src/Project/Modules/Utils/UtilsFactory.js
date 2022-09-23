/**
 * @UtilsFactory
 */

import { Notification } from "./Notification/Notification.js";
import { UtilsDependecyProvider } from "./UtilsDependencyProvider.js";

export class UtilsFactory {
  static createNotificationUtil() {
    return new Notification(this.getBaseElement());
  }

  static createDateTime() {
    return new Date();
  }

  static getBaseElement() {
    return UtilsDependecyProvider.setBaseElement();
  }
}
