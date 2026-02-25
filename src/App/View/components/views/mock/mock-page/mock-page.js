import { Component } from "/src/base/View/Component.js";
import { defineComponent } from "/src/base/View/Helpers/defineComponent.js";
import "/src/App/View/components/atoms/greeting/greeting.js";

/**
 * @class MockPageView
 * @description MockPageView
 */
export class MockPageView extends Component {
  static templatePath = "./mock-page.html";
  static moduleUrl = import.meta.url;

  async render() {
    await this.renderTemplate();

    const greetingAtom = this.querySelector("greeting-atom");
    if (greetingAtom) {
      greetingAtom.data = { name: this._data?.name || "Demo" };
    }
  }
}

defineComponent("mock-page", MockPageView);
