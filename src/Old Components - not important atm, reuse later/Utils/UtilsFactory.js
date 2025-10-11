/**
 * @UtilsFactory
 * @deprecated Will be removed/changed in future releases
 */

import { Notification } from "./Notification/Notification.js";
import { UtilsDataProvider } from "./UtilsDataProvider.js";

export class UtilsFactory {
  static createNotificationUtil() {
    return new Notification(UtilsDataProvider);
  }

  static createDateTime() {
    return new Date();
  }

  static createXMLHttpRequest() {
    return new XMLHttpRequest();
  }
}
