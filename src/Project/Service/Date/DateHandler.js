/**
 * @Date
 */

import { UtilsFactory } from "../UtilsFactory.js";

export class DateHandler {
  static createTimeTaskAdded() {
    let dateAndTimeTaskAdded = UtilsFactory.createDateTime();
    return (
      dateAndTimeTaskAdded.getHours().toLocaleString() +
      ":" +
      dateAndTimeTaskAdded.getMinutes().toLocaleString() +
      ", " +
      dateAndTimeTaskAdded.getDate().toLocaleString() +
      "." +
      (dateAndTimeTaskAdded.getMonth() + 1)
    );
  }

  static clock() {
    let time = UtilsFactory.createDateTime();
    return time.toLocaleTimeString();
  }
}
