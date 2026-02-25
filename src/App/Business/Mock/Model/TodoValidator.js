import { TodoMessageService } from "../Service/TodoMessageService.js";

/**
 * @class TodoValidator
 * @description TodoValidator
 */
export class TodoValidator {
  constructor(dateTimeService) {
    this.dateTimeService = dateTimeService;
    this.onlyNumberRegex = /^\d+$/;
  }

  validateAddTask(taskValue, dueTimeInput) {
    const normalizedValue = (taskValue ?? "").trim();
    if (normalizedValue.length === 0) {
      return {
        valid: false,
        notification: TodoMessageService.emptyTask(),
      };
    }

    if (this.onlyNumberRegex.test(normalizedValue)) {
      return {
        valid: false,
        notification: TodoMessageService.numberTask(),
      };
    }

    const dueTimestamp = this.dateTimeService.parseDateTimeLocalInput(
      dueTimeInput
    );

    if (dueTimeInput && dueTimestamp === null) {
      return {
        valid: false,
        notification: TodoMessageService.pastDueTime(),
      };
    }

    if (
      dueTimestamp !== null &&
      this.dateTimeService.getCurrentMillis() > dueTimestamp
    ) {
      return {
        valid: false,
        notification: TodoMessageService.pastDueTime(),
      };
    }

    return {
      valid: true,
      value: normalizedValue,
      dueTimestamp,
    };
  }
}
