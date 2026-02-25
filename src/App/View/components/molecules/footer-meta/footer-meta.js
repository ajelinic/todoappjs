import { Component } from "/src/base/View/Component.js";
import { defineComponent } from "/src/base/View/Helpers/defineComponent.js";

/**
 * @class FooterMetaMolecule
 * @description FooterMetaMolecule
 */
export class FooterMetaMolecule extends Component {
  render() {
    const year = new Date().getFullYear();
    this.updateView(`<div class="footer-meta-molecule">TodoAppJS ${year}</div>`);
  }
}

defineComponent("footer-meta-molecule", FooterMetaMolecule);
