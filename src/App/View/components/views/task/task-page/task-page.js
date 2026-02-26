import { Component } from "../../../../../../base/View/Component.js";
import { defineComponent } from "../../../../../../base/View/Helpers/defineComponent.js";
import "../../../molecules/task-form/task-form.js";
import "../../../molecules/task-list/task-list.js";
import "../../../molecules/task-info/task-info.js";

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
        <section class="todo-app">
          <div class="todo-layout">
            <section class="todo-list-panel">
              <h1 class="todo-list-panel__title">${this.escapeHtml(
                this._data?.title || "To-Do App"
              )}</h1>

              <task-form-molecule data-element="task-form"></task-form-molecule>
              <task-list-molecule data-element="task-list"></task-list-molecule>
            </section>

            <task-info-molecule data-element="task-info"></task-info-molecule>
          </div>
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

    const taskInfo = this.querySelector("[data-element='task-info']");
    if (taskInfo) {
      taskInfo.data = {
        infoItems: Array.isArray(this._data?.infoItems) ? this._data.infoItems : [],
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
