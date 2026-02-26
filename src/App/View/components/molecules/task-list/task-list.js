import { Component } from "../../../../../base/View/Component.js";
import { defineComponent } from "../../../../../base/View/Helpers/defineComponent.js";

/**
 * @class TaskListMolecule
 * @description TaskListMolecule
 */
export class TaskListMolecule extends Component {
  constructor() {
    super();
    this.boundClickHandler = this.handleClick.bind(this);
    this.boundChangeHandler = this.handleChange.bind(this);
  }

  mapEvents() {
    this.addEventListener("click", this.boundClickHandler);
    this.addEventListener("change", this.boundChangeHandler);
  }

  destroy() {
    this.removeEventListener("click", this.boundClickHandler);
    this.removeEventListener("change", this.boundChangeHandler);
  }

  render() {
    this.updateView(this.buildTemplate());
  }

  buildTemplate() {
    const tasks = Array.isArray(this._data?.tasks) ? this._data.tasks : [];

    return `
      <ul class="todo-task-list" id="task-list">
        ${tasks.map((task) => this.renderTask(task)).join("")}
      </ul>
    `;
  }

  renderTask(task) {
    const isChecked = Boolean(task.checked);
    const hasDueTime = Number.isFinite(task.dueTime);
    const dueText = hasDueTime
      ? new Date(task.dueTime).toLocaleString(this.getLocale())
      : this._data?.labels?.noDue ?? "No due time";
    const deleteLabel = this._data?.labels?.delete ?? "Delete";

    return `
      <li class="todo-task">
        <label class="todo-task__main">
          <input
            type="checkbox"
            name="done"
            class="todo-task__checkbox"
            data-action="toggle-task"
            data-task-id="${task.id}"
            ${isChecked ? "checked" : ""}
          />
          <span class="todo-task__value ${isChecked ? "cross" : ""}">${this.escapeHtml(
            task.taskValue
          )}</span>
        </label>
        <div class="todo-task__footer">
          <div class="todo-task__meta">
            <span class="todo-task__meta-item">#${task.id}</span>
            <span class="todo-task__meta-item">${this.escapeHtml(task.timeAdded)}</span>
            <span class="todo-task__meta-item">${this.escapeHtml(dueText)}</span>
          </div>
          ${
            isChecked
              ? `<button
            class="button button--border todo-task__delete"
            type="button"
            data-action="delete-task"
            data-task-id="${task.id}"
          >${this.escapeHtml(deleteLabel)}</button>`
              : ""
          }
        </div>
      </li>
    `;
  }

  handleClick(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.dataset.action !== "delete-task") {
      return;
    }

    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("todo:delete", {
        bubbles: true,
        detail: {
          id: target.dataset.taskId,
        },
      })
    );
  }

  handleChange(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.dataset.action !== "toggle-task") {
      return;
    }

    this.dispatchEvent(
      new CustomEvent("todo:toggle", {
        bubbles: true,
        detail: {
          id: target.dataset.taskId,
          checked: Boolean(target.checked),
        },
      })
    );
  }

  getLocale() {
    if (typeof this._data?.locale === "string" && this._data.locale.trim().length > 0) {
      return this._data.locale.trim();
    }

    return "en-US";
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

defineComponent("task-list-molecule", TaskListMolecule);
