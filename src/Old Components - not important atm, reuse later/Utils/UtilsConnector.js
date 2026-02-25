/**
 * @UtilsConnector
 * @deprecated Will be removed/changed in future releases
 */

import { UtilsFactory } from "./UtilsFactory.js";

/**
 * @class UtilsConnector
 * @description UtilsConnector
 */
export class UtilsConnector {
  static createNotification() {
    return UtilsFactory.createNotificationUtil();
  }
}
