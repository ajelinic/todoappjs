/**
 * TaskConfig
 */

import { Getter } from "../../Utils/Getter/Getter.js";
import { messages } from "../../Utils/Messages/TaskMessages.js";

export class TaskConfig {
  static getMessage(call) {
    return Getter.get(messages, call);
  }

  static isInputFieldEmpty() {
    return "isInputFieldEmpty";
  }

  static numberInputed() {
    return "numberInputed";
  }

  static emptyTask() {
    return "emptyTask";
  }

  static taskAdded() {
    return "taskAdded";
  }

  static numberType() {
    return "number";
  }

  static stringType() {
    return "string";
  }

  static dueTime() {
    return "dueTime";
  }

  static noDueTime() {
    return "noDueTime";
  }

  static isPastTime() {
    return "isPastTime";
  }

  static successMessage() {
    return "successMessage";
  }

  static errorMessage() {
    return "errorMessage";
  }

  static numberRegex() {
    return /^\d+$/;
  }

  static getCrossClass() {
    return "cross";
  }

  static getHiddenClass() {
    return "is--hidden";
  }
}
