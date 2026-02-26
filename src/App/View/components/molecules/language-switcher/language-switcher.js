import { Component } from "../../../../../base/View/Component.js";
import { defineComponent } from "../../../../../base/View/Helpers/defineComponent.js";

/**
 * @class LanguageSwitcherMolecule
 * @description LanguageSwitcherMolecule
 */
export class LanguageSwitcherMolecule extends Component {
  constructor() {
    super();
    this.boundChangeHandler = this.handleChange.bind(this);
  }

  mapEvents() {
    this.addEventListener("change", this.boundChangeHandler);
  }

  destroy() {
    this.removeEventListener("change", this.boundChangeHandler);
  }

  render() {
    this.updateView(this.buildTemplate());
  }

  buildTemplate() {
    const label = this._data?.label ?? "language.switcher.label";
    const currentLocale = this._data?.currentLocale ?? "en-US";
    const locales = Array.isArray(this._data?.locales) ? this._data.locales : [];

    return `
      <section class="language-switcher">
        <label class="language-switcher__label" for="language-switcher-select">${this.escapeHtml(
          label
        )}</label>
        <select
          id="language-switcher-select"
          class="language-switcher__select"
          data-action="change-locale"
        >
          ${locales
            .map((locale) => {
              const code = locale?.value ?? "";
              const localeLabel = locale?.label ?? code;
              const selected = code === currentLocale ? "selected" : "";

              return `<option value="${this.escapeHtml(code)}" ${selected}>${this.escapeHtml(
                localeLabel
              )}</option>`;
            })
            .join("")}
        </select>
      </section>
    `;
  }

  handleChange(event) {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) {
      return;
    }

    if (target.dataset.action !== "change-locale") {
      return;
    }

    this.dispatchEvent(
      new CustomEvent("language:change", {
        bubbles: true,
        detail: {
          locale: target.value,
        },
      })
    );
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

defineComponent("language-switcher-molecule", LanguageSwitcherMolecule);
