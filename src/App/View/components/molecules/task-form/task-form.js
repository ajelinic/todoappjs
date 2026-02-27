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
    const dueInputContainerClass = isDueInputVisible
      ? "col-12 col-sm-8 col-lg-3"
      : "col-12 col-sm-8 col-lg-3 is--hidden";
    const dueButtonContainerClass = isDueInputVisible
      ? "col-6 col-sm-4 col-lg-2 is--hidden"
      : "col-6 col-sm-4 col-lg-2";

    return `
      <form class="todo-form row g-2" id="todo-form">
        <div class="col-12 col-lg-5">
          <input
            class="todo-form__input todo-form__input--task"
            id="addTaskField"
            name="addTaskField"
            type="text"
            value="${this.escapeHtml(form.taskValue || "")}"
            placeholder="${this.escapeHtml(
              labels.placeholder || "todoapp.input.placeholder"
            )}"
            autocomplete="off"
          />
        </div>
        <div class="${dueButtonContainerClass}" data-element="due-toggle-container">
          <button
            class="todo-form__action-button todo-form__action-button--due"
            type="button"
            data-action="toggle-due"
          >${this.escapeHtml(labels.due || "todoapp.input.due")}</button>
        </div>
        <div class="${dueInputContainerClass}" data-element="due-input-container">
          <input
            class="todo-form__input todo-form__input--due"
            id="due-time-input"
            name="due-time-input"
            type="datetime-local"
            value="${this.escapeHtml(form.dueTimeInput || "")}"
          />
        </div>
        <div class="col-6 col-sm-4 col-lg-2">
          <button
            class="todo-form__action-button todo-form__action-button--add"
            type="button"
            data-action="add-task"
          >${this.escapeHtml(labels.add || "todoapp.input.add")}</button>
        </div>
        <div class="col-12 col-sm-8 col-lg-2">
          <button
            class="todo-form__action-button todo-form__action-button--clear"
            type="button"
            data-action="clear-completed"
          >${this.escapeHtml(labels.clear || "todoapp.clear.list")}</button>
        </div>
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
    const dueInputContainer = this.querySelector("[data-element='due-input-container']");
    const dueToggleContainer = this.querySelector("[data-element='due-toggle-container']");
    if (!dueInputContainer || !dueToggleContainer) {
      return;
    }

    dueInputContainer.classList.toggle("is--hidden");
    dueToggleContainer.classList.toggle("is--hidden");
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
