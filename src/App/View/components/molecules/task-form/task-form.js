import { Component } from "../../../../../base/View/Component.js";
import { defineComponent } from "../../../../../base/View/Helpers/defineComponent.js";

/**
 * @class TaskFormMolecule
 * @description TaskFormMolecule
 */
export class TaskFormMolecule extends Component {
  constructor() {
    super();
    this.boundClickHandler = this.handleClick.bind(this);
    this.boundKeydownHandler = this.handleKeydown.bind(this);
  }

  mapEvents() {
    this.addEventListener("click", this.boundClickHandler);
    this.addEventListener("keydown", this.boundKeydownHandler);
  }

  destroy() {
    this.removeEventListener("click", this.boundClickHandler);
    this.removeEventListener("keydown", this.boundKeydownHandler);
  }

  render() {
    this.updateView(this.buildTemplate());
  }

  buildTemplate() {
    const labels = this._data?.labels ?? {};
    const form = this._data?.form ?? {};
    const isDueInputVisible = Boolean(form.showDueInput);
    const dueInputClass = isDueInputVisible
      ? "todo-form__due-input"
      : "todo-form__due-input is--hidden";
    const dueButtonClass = isDueInputVisible
      ? "button button--border button--todo is--hidden"
      : "button button--border button--todo";

    return `
      <form class="todo-form" id="todo-form">
        <input
          class="input input__add-task"
          id="addTaskField"
          name="addTaskField"
          type="text"
          value="${this.escapeHtml(form.taskValue || "")}"
          placeholder="${this.escapeHtml(
            labels.placeholder || "todoapp.input.placeholder"
          )}"
          autocomplete="off"
        />
        <button
          class="${dueButtonClass}"
          type="button"
          data-action="toggle-due"
        >${this.escapeHtml(labels.due || "todoapp.input.due")}</button>
        <input
          class="${dueInputClass}"
          id="due-time-input"
          name="due-time-input"
          type="datetime-local"
          value="${this.escapeHtml(form.dueTimeInput || "")}"
        />
        <button
          class="button button--border button--todo"
          type="button"
          data-action="add-task"
        >${this.escapeHtml(labels.add || "todoapp.input.add")}</button>
        <button
          class="button button--border button--todo"
          type="button"
          data-action="clear-completed"
        >${this.escapeHtml(labels.clear || "todoapp.clear.list")}</button>
      </form>
    `;
  }

  handleClick(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const action = target.dataset.action;
    if (!action) {
      return;
    }

    event.preventDefault();

    if (action === "toggle-due") {
      this.toggleDueInputVisibility();
      return;
    }

    if (action === "add-task") {
      this.dispatchEvent(
        new CustomEvent("todo:add", {
          bubbles: true,
          detail: {
            taskValue: this.getTaskInputElement()?.value ?? "",
            dueTimeInput: this.getDueInputElement()?.value ?? "",
          },
        })
      );
      return;
    }

    if (action === "clear-completed") {
      this.dispatchEvent(
        new CustomEvent("todo:clear-completed", {
          bubbles: true,
        })
      );
    }
  }

  handleKeydown(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.id === "addTaskField" && event.key === "Enter") {
      event.preventDefault();
    }
  }

  toggleDueInputVisibility() {
    const dueInput = this.getDueInputElement();
    const dueButton = this.querySelector("[data-action='toggle-due']");
    if (!dueInput || !dueButton) {
      return;
    }

    dueInput.classList.toggle("is--hidden");
    dueButton.classList.toggle("is--hidden");
  }

  getTaskInputElement() {
    return this.querySelector("#addTaskField");
  }

  getDueInputElement() {
    return this.querySelector("#due-time-input");
  }

  escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
}

defineComponent("task-form-molecule", TaskFormMolecule);
