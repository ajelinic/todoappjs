/**
 * @UtilsConnector
 */

import { UtilsFactory } from "./UtilsFactory.js";

export class UtilsConnector {
  static createNotification() {
    return UtilsFactory.createNotificationUtil();
  }
}
