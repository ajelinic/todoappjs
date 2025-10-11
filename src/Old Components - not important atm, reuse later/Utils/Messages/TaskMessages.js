/**
 * @deprecated Will be removed/changed in future releases
 */

export let messages = {
  emptyTask: function () {
    return { type: "errorMessage", value: "Can't add empty task!" };
  },
  taskAdded: function () {
    return { type: "successMessage", value: "Task successfully added!" };
  },
  numberInputed: function () {
    return { type: "errorMessage", value: "Task can't be only numbers!" };
  },
  taskClearError: function () {
    return {
      type: "errorMessage",
      value: "Please select tasks that are done to delete them from the list!",
    };
  },
  taskClearSuccess: function () {
    return { type: "successMessage", value: "Cleared done tasks! Well done!" };
  },
  emptyListWarning: function () {
    return {
      type: "warningMessage",
      value: "No tasks to clear. Please add some tasks!",
    };
  },
  isPastTime: function () {
    return {
      type: "errorMessage",
      value: "Tasks can't be set in past, please change due time!",
    };
  },
  isInputFieldEmpty: function () {
    return {
      type: "warningMessage",
      value: "Can't add task due time without entering task!",
    };
  },
};
