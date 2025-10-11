/**
 * @Notification
 * @deprecated Will be removed/changed in future releases
 */

import { NotificationCreateHandler } from "./NotificationCreateHandler.js";
import { NotificationPublishHandler } from "./NotificationPublishHandler.js";

export class Notification {
  constructor(utilsDataProvider) {
    this.utilsDataProvider = utilsDataProvider;
  }

  createTaskNotification(message) {
    return this.showNotification(
      NotificationCreateHandler.handleNotificationCreation(message)
    );
  }

  showNotification(message) {
    return NotificationPublishHandler.addNotificationToHeader(
      this.utilsDataProvider.baseElement,
      message
    );
  }
}
