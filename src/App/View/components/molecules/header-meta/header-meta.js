import { Component } from "../../../../../base/View/Component.js";
import { defineComponent } from "../../../../../base/View/Helpers/defineComponent.js";

/**
 * @class HeaderMetaMolecule
 * @description HeaderMetaMolecule
 */
export class HeaderMetaMolecule extends Component {
  render() {
    this.updateView(`<div class="header-meta-molecule">Main Layout</div>`);
  }
}

defineComponent("header-meta-molecule", HeaderMetaMolecule);
