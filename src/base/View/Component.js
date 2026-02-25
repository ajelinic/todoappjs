/**
 * @class Component
 * @description Base class for all UI components.
 */

import { TemplateHTMLElement } from "./TemplateHTMLElement.js";

/**
 * @class Component
 * @description Component
 */
export class Component extends TemplateHTMLElement {
  constructor() {
    super();
    if (new.target === Component) {
      throw new Error(
        "Component is abstract and cannot be instantiated directly"
      );
    }

    this._data = {};
    this._isMounted = false;
  }

  connectedCallback() {
    this._isMounted = true;
    this.init();
    this.render();
    this.mapEvents();
  }

  disconnectedCallback() {
    this._isMounted = false;
    this.destroy();
  }

  init() {}

  mapEvents() {}

  destroy() {}

  set data(value) {
    this._data = value;
    this.render();
  }

  get data() {
    return this._data;
  }

  async render() {
    throw new Error(
      `${this.constructor.name}: render() must be implemented in subclass`
    );
  }

  static async autoMount() {
    const sel = this.mountSelector;
    if (!sel) return;

    if (document.readyState === "loading") {
      await new Promise((r) =>
        document.addEventListener("DOMContentLoaded", r, { once: true })
      );
    }

    const mountTarget = document.querySelector(sel);
    if (!mountTarget) {
      console.warn(`[${this.name}] mountSelector not found: ${sel}`);
      return;
    }

    const tag = this.tagNameFromDefine || this.tagName;
    if (!tag) {
      console.warn(`[${this.name}] cannot auto-mount: no tag name`);
      return;
    }

    if (!mountTarget.querySelector(tag)) {
      const el = document.createElement(tag);
      const pos = this.mountPosition === "prepend" ? "prepend" : "append";
      mountTarget[pos](el);
      el.data = this.initialData ?? {};
    }
  }

  updateView(html) {
    return (this.innerHTML = html.trim());
  }
}
