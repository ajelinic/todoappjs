/**
 * @UtilsConnector
 * @deprecated Will be removed/changed in future releases
 */

import { UtilsFactory } from "./UtilsFactory.js";

export class UtilsConnector {
  static createNotification() {
    return UtilsFactory.createNotificationUtil();
  }
}
