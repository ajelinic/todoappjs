import { Component } from "../../../../../../base/View/Component.js";
import { defineComponent } from "../../../../../../base/View/Helpers/defineComponent.js";

/**
 * @class MockPageView
 * @description MockPageView
 */
export class MockPageView extends Component {
  constructor() {
    super();
    this.clockInterval = null;
    this.boundClickHandler = this.handleClick.bind(this);
    this.boundChangeHandler = this.handleChange.bind(this);
    this.boundKeydownHandler = this.handleKeydown.bind(this);
  }

  mapEvents() {
    this.addEventListener("click", this.boundClickHandler);
    this.addEventListener("change", this.boundChangeHandler);
    this.addEventListener("keydown", this.boundKeydownHandler);
  }

  destroy() {
    this.removeEventListener("click", this.boundClickHandler);
    this.removeEventListener("change", this.boundChangeHandler);
    this.removeEventListener("keydown", this.boundKeydownHandler);
    clearInterval(this.clockInterval);
    this.clockInterval = null;
  }

  render() {
    this.updateView(this.buildTemplate());
    this.startClock();
  }

  buildTemplate() {
    const tasks = Array.isArray(this._data?.tasks) ? this._data.tasks : [];
    const infoItems = Array.isArray(this._data?.infoItems) ? this._data.infoItems : [];
    const labels = this._data?.labels ?? {};
    const form = this._data?.form ?? {};
    const notification = this._data?.notification ?? null;

    const isDueInputVisible = Boolean(form.showDueInput);
    const dueInputClass = isDueInputVisible ? "todo-form__due-input" : "todo-form__due-input is--hidden";
    const dueButtonClass = isDueInputVisible
      ? "button button--border button--todo is--hidden"
      : "button button--border button--todo";

    return `
      <section class="todo-page">
        <section class="todo-app">
          <div class="todo-layout">
            <section class="todo-list-panel">
              <h1 class="todo-list-panel__title">${this.escapeHtml(
                this._data?.title || "To-Do App"
              )}</h1>
              <form class="todo-form" id="todo-form">
                <input
                  class="input input__add-task"
                  id="addTaskField"
                  name="addTaskField"
                  type="text"
                  value="${this.escapeHtml(form.taskValue || "")}"
                  placeholder="What needs to be done?"
                  autocomplete="off"
                />
                <button
                  class="${dueButtonClass}"
                  type="button"
                  data-action="toggle-due"
                >${this.escapeHtml(labels.due || "+Due")}</button>
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
                >${this.escapeHtml(labels.add || "Add to list")}</button>
                <button
                  class="button button--border button--todo"
                  type="button"
                  data-action="clear-completed"
                >${this.escapeHtml(labels.clear || "Clear list")}</button>
              </form>

              <ul class="todo-task-list" id="task-list">
                ${tasks.map((task) => this.renderTask(task)).join("")}
              </ul>
            </section>

            <aside class="todo-info-panel">
              <div class="todo-info-panel__clock" data-element="clock">--:--:--</div>
              <ul class="todo-info-panel__task-info">
                ${infoItems.map((item) => this.renderInfo(item)).join("")}
              </ul>
            </aside>
          </div>
        </section>

        ${notification ? this.renderNotification(notification) : ""}
      </section>
    `;
  }

  renderTask(task) {
    const isChecked = Boolean(task.checked);
    const hasDueTime = Number.isFinite(task.dueTime);
    const dueText = hasDueTime ? new Date(task.dueTime).toLocaleString("hr-HR") : "No due time";

    return `
      <li class="todo-task ${isChecked ? "cross" : ""}">
        <label class="todo-task__main">
          <input
            type="checkbox"
            name="done"
            class="todo-task__checkbox"
            data-action="toggle-task"
            data-task-id="${task.id}"
            ${isChecked ? "checked" : ""}
          />
          <span class="todo-task__value">${this.escapeHtml(task.taskValue)}</span>
        </label>
        <div class="todo-task__meta">
          <span class="todo-task__meta-item">#${task.id}</span>
          <span class="todo-task__meta-item">${this.escapeHtml(task.timeAdded)}</span>
          <span class="todo-task__meta-item">${this.escapeHtml(dueText)}</span>
        </div>
      </li>
    `;
  }

  renderInfo(item) {
    return `<li class="todo-info-panel__task-info-item">${this.escapeHtml(
      item.text || ""
    )}</li>`;
  }

  renderNotification(notification) {
    return `
      <div class="notification notification-show">
        <span class="message ${this.escapeHtml(notification.type)}">${this.escapeHtml(
      notification.value
    )}</span>
      </div>
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

  startClock() {
    clearInterval(this.clockInterval);
    this.updateClock();
    this.clockInterval = window.setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  updateClock() {
    const clockElement = this.querySelector("[data-element='clock']");
    if (!clockElement) {
      return;
    }

    clockElement.textContent = new Date().toLocaleTimeString("hr-HR");
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

defineComponent("mock-page", MockPageView);
