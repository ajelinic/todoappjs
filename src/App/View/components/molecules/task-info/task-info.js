import { Component } from "../../../../../base/View/Component.js";
import { defineComponent } from "../../../../../base/View/Helpers/defineComponent.js";

/**
 * @class TaskInfoMolecule
 * @description TaskInfoMolecule
 */
export class TaskInfoMolecule extends Component {
  constructor() {
    super();
    this.clockInterval = null;
  }

  destroy() {
    clearInterval(this.clockInterval);
    this.clockInterval = null;
  }

  render() {
    this.updateView(this.buildTemplate());
    this.startClock();
  }

  buildTemplate() {
    const infoItems = Array.isArray(this._data?.infoItems) ? this._data.infoItems : [];

    return `
      <aside class="todo-info-panel">
        <div class="todo-info-panel__clock" data-element="clock">--:--:--</div>
        <ul class="todo-info-panel__task-info">
          ${infoItems.map((item) => this.renderInfo(item)).join("")}
        </ul>
      </aside>
    `;
  }

  renderInfo(item) {
    return `<li class="todo-info-panel__task-info-item">${this.escapeHtml(
      item.text || ""
    )}</li>`;
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

    clockElement.textContent = new Date().toLocaleTimeString(this.getLocale());
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

defineComponent("task-info-molecule", TaskInfoMolecule);
