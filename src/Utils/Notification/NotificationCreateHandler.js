/**
 * @NotificationCreateHandler
 */

import { DomElementCreator } from "../DomElementCreate/DomElementCreator.js";

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
