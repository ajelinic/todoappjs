import { Component } from "/src/base/View/Component.js";
import { defineComponent } from "/src/base/View/Helpers/defineComponent.js";

/**
 * @class GreetingAtom
 * @description GreetingAtom
 */
export class GreetingAtom extends Component {
  render() {
    const name = this._data?.name || "Demo";
    this.updateView(`
      <section class="greeting-atom">
        <h1>Hello, ${name}!</h1>
      </section>
    `);
  }
}

defineComponent("greeting-atom", GreetingAtom);
