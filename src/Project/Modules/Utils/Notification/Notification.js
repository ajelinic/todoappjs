/**
 * @Notification
 */

import { NotificationCreateHandler } from "./NotificationCreateHandler.js";
import { NotificationPublishHandler } from "./NotificationPublishHandler.js";

export class Notification {
  constructor(element) {
    this.element = element;
  }
  createTaskNotification(message) {
    return this.showNotification(
      NotificationCreateHandler.handleNotificationCreation(message)
    );
  }

  showNotification(message) {
    return NotificationPublishHandler.addNotificationToHeader(
      this.element,
      message
    );
  }
}
