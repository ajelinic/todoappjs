import { Component } from "../../../../../base/View/Component.js";
import { defineComponent } from "../../../../../base/View/Helpers/defineComponent.js";
import "../../molecules/task-info/task-info.js";

/**
 * @class TaskInfoBoardView
 * @description Renders task info board panel/drawer and hydrates task-info widgets.
 */
export class TaskInfoBoardView extends Component {
  constructor() {
    super();
    this.isDrawerOpen = false;
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
    const isDesktopView = this.isDesktopView();
    const drawerOpenClass = this.isDrawerOpen ? "todo-info-drawer--open" : "";
    const drawerExpanded = this.isDrawerOpen ? "true" : "false";
    const drawerHidden = this.isDrawerOpen ? "false" : "true";
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
    const desktopInfoPanel = isDesktopView
      ? `<section class="d-none d-lg-block">
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
      <section class="todo-info-board">
        ${mobileToolbar}
        ${desktopInfoPanel}
        ${mobileInfoDrawer}
      </section>
    `;
  }

  hydrateChildren() {
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
    this.isDrawerOpen = Boolean(isOpen);
    this.syncDrawerState();
  }

  syncDrawerState() {
    if (this.isDrawerOpen && this.isDesktopView()) {
      this.isDrawerOpen = false;
    }

    const drawer = this.querySelector("#todo-info-drawer");
    if (drawer) {
      drawer.classList.toggle("todo-info-drawer--open", this.isDrawerOpen);
      drawer.setAttribute("aria-hidden", this.isDrawerOpen ? "false" : "true");
    }

    const drawerToggle = this.querySelector("[data-action='open-info-drawer']");
    if (drawerToggle) {
      drawerToggle.setAttribute("aria-expanded", this.isDrawerOpen ? "true" : "false");
    }

    this.syncBodyScrollLock(this.isDrawerOpen);
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
}

defineComponent("task-info-board-view", TaskInfoBoardView);
