/**
 * @Date
 * @deprecated Will be removed/changed in future releases
 */

import { DomElementCreator } from "../DomElementCreate/DomElementCreator.js";
import { UtilsFactory } from "../UtilsFactory.js";

/**
 * @class DateTimeHandler
 * @description DateTimeHandler
 */
export class DateTimeHandler {
  static createTimeTaskAdded() {
    let date = UtilsFactory.createDateTime();
    let dateTimeAdded = UtilsFactory.createDateTime(
      date.getHours(),
      date.getMinutes(),
      date.getDate(),
      date.getMonth() + 1
    );
    return dateTimeAdded.toLocaleString("hr-HR");
  }

  static getTimeInMillis(time) {
    let timeStringReplaced = time.replace(/[a-zA-Z]+/g, " ");
    return new Date(timeStringReplaced).getTime();
  }

  static getCurrentTime() {
    return UtilsFactory.createDateTime().getTime();
  }

  static convertMillisToDate(timestamp) {
    let date = new Date(timestamp);
    return new Date(date).toLocaleString("hr-HR");
  }

  static createClock() {
    let clockDiv = DomElementCreator.createHtmlElement(
      "div",
      "clock",
      "clock clock--position"
    );
    setInterval(function () {
      clockDiv.innerHTML =
        UtilsFactory.createDateTime().toLocaleTimeString("hr-HR");
    }, 1000);
    return clockDiv;
  }
}
