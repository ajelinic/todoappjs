/**
 * @NotificationPublishHandler
 */

import { DomElementCreator } from "../DomElementCreate/DomElementCreator.js";
import { UtilsConfig } from "../UtilsConfig.js";

export class NotificationPublishHandler {
  static addNotificationToHeader(element, message) {
    const notificationDiv = DomElementCreator.createHtmlElement(
      "div",
      "notification",
      "notification"
    );

    for (let i = element.childElementCount; i--; ) {
      if (
        element.children[i].id == UtilsConfig.getNotificationId() &&
        element.children[i].classList.contains(
          UtilsConfig.getNotificationShowClass()
        )
      ) {
        element.children[i].remove();
      }
    }

    element.appendChild(notificationDiv);
    notificationDiv.classList.add(UtilsConfig.getNotificationShowClass());
    notificationDiv.appendChild(message);

    if (
      notificationDiv != "" &&
      notificationDiv.classList.contains(UtilsConfig.getNotificationShowClass())
    ) {
      setTimeout(() => {
        notificationDiv.remove();
      }, 3000);
    }
  }
}
