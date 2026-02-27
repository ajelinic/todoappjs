import { AbstractForm } from "../../../../base/Abstracts/AbstractForm.js";

/**
 * @class TaskPageForm
 * @description Normalizes task page form state.
 */
export class TaskPageForm extends AbstractForm {
  createDefaultState() {
    return {
      taskValue: "",
      dueTimeInput: "",
      showDueInput: false,
    };
  }

  resolveState(actionResult = {}, fallbackForm = null) {
    const uiState = actionResult?.ui;

    if (uiState && typeof uiState === "object") {
      return this.submit(uiState).getData();
    }

    if (fallbackForm && typeof fallbackForm === "object") {
      return this.submit(fallbackForm).getData();
    }

    return this.createDefaultState();
  }

  normalize(form = {}) {
    return {
      taskValue: typeof form.taskValue === "string" ? form.taskValue : "",
      dueTimeInput: typeof form.dueTimeInput === "string" ? form.dueTimeInput : "",
      showDueInput: Boolean(form.showDueInput),
    };
  }
}

export default TaskPageForm;
