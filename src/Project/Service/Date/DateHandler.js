/**
 * @Date
 */

import { UtilsFactory } from "../UtilsFactory.js";

export class DateHandler {
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

  static clock() {
    let time = UtilsFactory.createDateTime();
    return time.toLocaleTimeString();
  }

  static getDueTimeInMillis(dueTime) {
    let dueTimeReplaced = dueTime.replace(/[a-zA-Z]+/g, " ");
    return new Date(dueTimeReplaced).getTime();
  }
}
