import { Component } from "../../../../../base/View/Component.js";
import { defineComponent } from "../../../../../base/View/Helpers/defineComponent.js";

/**
 * @class BrandAtom
 * @description BrandAtom
 */
export class BrandAtom extends Component {
  render() {
    this.updateView(`<strong class="brand-atom">TodoAppJS</strong>`);
  }
}

defineComponent("brand-atom", BrandAtom);
