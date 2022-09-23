/**
 * TaskConfig
 */

export class TaskConfig {
  static setAddButtonInnerText() {
    return "+Task";
  }

  static setClearButtonInnerText() {
    return "x";
  }

  static setErrorMessageOnTaskAdd() {
    return { type: "errorMessage", value: "Can't add empty task!" };
  }

  static setOnlyNumbersErrorMessageOnTaskAdd() {
    return { type: "errorMessage", value: "Task can't be only numbers!" };
  }

  static setSuccessMessageOnTaskAdd() {
    return { type: "successMessage", value: "Task successfully added!" };
  }

  static setErrorMessageOnTaskDelete() {
    return {
      type: "errorMessage",
      value: "Please select tasks that are done to delete them from the list!",
    };
  }

  static getSuccessMessageOnTaskDelete() {
    return { type: "successMessage", value: "Cleared done tasks! Well done!" };
  }

  static getWarningMessageOnEmptyTaskList() {
    return {
      type: "warningMessage",
      value: "No tasks to clear. Please add some tasks!",
    };
  }

  static getSuccessTypeMessage() {
    return "successMessage";
  }

  static getErrorTypeMessage() {
    return "errorMessage";
  }
}
