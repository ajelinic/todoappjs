/**
 * @NotificationCreateHandler
 * @deprecated Will be removed/changed in future releases
 */

import { DomElementCreator } from "../DomElementCreate/DomElementCreator.js";

/**
 * @class NotificationCreateHandler
 * @description NotificationCreateHandler
 */
export class NotificationCreateHandler {
  static handleNotificationCreation(message) {
    return this.createNotificationHtml(message);
  }

  static createNotificationHtml(message) {
    return DomElementCreator.createHtmlElement(
      "span",
      message.type,
      "message " + message.type,
      message.value
    );
  }
}
