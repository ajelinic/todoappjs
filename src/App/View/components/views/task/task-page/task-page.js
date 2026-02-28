import { Component } from "../../../../../../base/View/Component.js";
import { defineComponent } from "../../../../../../base/View/Helpers/defineComponent.js";
import "../../../molecules/task-form/task-form.js";
import "../../../molecules/task-list/task-list.js";

/**
 * @class TaskPageView
 * @description TaskPageView
 */
export class TaskPageView extends Component {
  render() {
    this.updateView(this.buildTemplate());
    this.hydrateChildren();
  }

  buildTemplate() {
    const notification = this._data?.notification ?? null;

    return `
      <section class="todo-page">
        <section class="todo-app container">
          <section class="todo-list-panel">
            <h1 class="todo-list-panel__title">${this.escapeHtml(
              this._data?.title || "todoapp.title"
            )}</h1>

            <task-form-molecule data-element="task-form"></task-form-molecule>
            <task-list-molecule data-element="task-list"></task-list-molecule>
          </section>
        </section>

        ${notification ? this.renderNotification(notification) : ""}
      </section>
    `;
  }

  hydrateChildren() {
    const taskForm = this.querySelector("[data-element='task-form']");
    if (taskForm) {
      taskForm.data = {
        labels: this._data?.labels ?? {},
        form: this._data?.form ?? {},
      };
    }

    const taskList = this.querySelector("[data-element='task-list']");
    if (taskList) {
      taskList.data = {
        tasks: Array.isArray(this._data?.tasks) ? this._data.tasks : [],
        labels: this._data?.labels ?? {},
        locale: this._data?.locale ?? "en-US",
      };
    }
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

  escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
}

defineComponent("task-page", TaskPageView);
