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
  constructor() {
    super();
    this.isInfoDrawerOpen = false;
    this.boundClickHandler = this.handleClick.bind(this);
  }

  mapEvents() {
    this.addEventListener("click", this.boundClickHandler);
  }

  destroy() {
    this.removeEventListener("click", this.boundClickHandler);
    this.syncBodyScrollLock(false);
  }

  render() {
    this.updateView(this.buildTemplate());
    this.hydrateChildren();
    this.syncDrawerState();
  }

  buildTemplate() {
    const notification = this._data?.notification ?? null;
    const isDesktopView = this.isDesktopView();
    const drawerOpenClass = this.isInfoDrawerOpen ? "todo-info-drawer--open" : "";
    const drawerExpanded = this.isInfoDrawerOpen ? "true" : "false";
    const drawerHidden = this.isInfoDrawerOpen ? "false" : "true";
    const mobileToolbar = isDesktopView
      ? ""
      : `<div class="todo-page__mobile-toolbar">
            <button
              class="todo-page__drawer-toggle"
              type="button"
              data-action="open-info-drawer"
              aria-controls="todo-info-drawer"
              aria-expanded="${drawerExpanded}"
            >
              <span class="todo-page__hamburger" aria-hidden="true"></span>
              <span class="todo-page__drawer-label">Info</span>
            </button>
          </div>`;
    const desktopInfoColumn = isDesktopView
      ? `<section class="col-12 col-lg-4">
           <task-info-molecule data-element="task-info"></task-info-molecule>
         </section>`
      : "";
    const mobileInfoDrawer = isDesktopView
      ? ""
      : `<aside
           class="todo-info-drawer ${drawerOpenClass}"
           id="todo-info-drawer"
           aria-hidden="${drawerHidden}"
         >
           <button
             class="todo-info-drawer__backdrop"
             type="button"
             data-action="close-info-drawer"
             aria-label="Close info panel"
           ></button>
           <section class="todo-info-drawer__panel" role="dialog" aria-modal="true">
             <header class="todo-info-drawer__header">
               <strong class="todo-info-drawer__title">Info</strong>
               <button
                 class="todo-info-drawer__close-button"
                 type="button"
                 data-action="close-info-drawer"
                 aria-label="Close info panel"
               >X</button>
             </header>
             <task-info-molecule data-element="task-info"></task-info-molecule>
           </section>
         </aside>`;

    return `
      <section class="todo-page">
        <section class="todo-app container">
          ${mobileToolbar}

          <div class="todo-layout row g-3">
            <section class="col-12 col-lg-8">
              <section class="todo-list-panel">
                <h1 class="todo-list-panel__title">${this.escapeHtml(
                  this._data?.title || "todoapp.title"
                )}</h1>

                <task-form-molecule data-element="task-form"></task-form-molecule>
                <task-list-molecule data-element="task-list"></task-list-molecule>
              </section>
            </section>

            ${desktopInfoColumn}
          </div>
        </section>

        ${mobileInfoDrawer}

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

    this.querySelectorAll("[data-element='task-info']").forEach((taskInfo) => {
      taskInfo.data = {
        infoItems: Array.isArray(this._data?.infoItems) ? this._data.infoItems : [],
        locale: this._data?.locale ?? "en-US",
      };
    });
  }

  handleClick(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const actionTarget = target.closest("[data-action]");
    if (!(actionTarget instanceof HTMLElement)) {
      return;
    }

    const action = actionTarget.dataset.action;
    if (action === "open-info-drawer") {
      event.preventDefault();
      this.setDrawerOpen(true);
      return;
    }

    if (action === "close-info-drawer") {
      event.preventDefault();
      this.setDrawerOpen(false);
    }
  }

  setDrawerOpen(isOpen) {
    this.isInfoDrawerOpen = Boolean(isOpen);
    this.syncDrawerState();
  }

  syncDrawerState() {
    if (
      this.isInfoDrawerOpen &&
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 992px)").matches
    ) {
      this.isInfoDrawerOpen = false;
    }

    const drawer = this.querySelector("#todo-info-drawer");
    if (drawer) {
      drawer.classList.toggle("todo-info-drawer--open", this.isInfoDrawerOpen);
      drawer.setAttribute("aria-hidden", this.isInfoDrawerOpen ? "false" : "true");
    }

    const drawerToggle = this.querySelector("[data-action='open-info-drawer']");
    if (drawerToggle) {
      drawerToggle.setAttribute("aria-expanded", this.isInfoDrawerOpen ? "true" : "false");
    }

    this.syncBodyScrollLock(this.isInfoDrawerOpen);
  }

  isDesktopView() {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return true;
    }

    return window.matchMedia("(min-width: 992px)").matches;
  }

  syncBodyScrollLock(isLocked) {
    if (!document?.body) {
      return;
    }

    document.body.classList.toggle("todo-page--drawer-open", Boolean(isLocked));
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
