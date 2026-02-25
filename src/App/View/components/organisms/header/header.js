import { Component } from "/src/base/View/Component.js";
import { defineComponent } from "/src/base/View/Helpers/defineComponent.js";
import "../../atoms/brand/brand.js";
import "../../molecules/header-meta/header-meta.js";

/**
 * @class HeaderOrganism
 * @description HeaderOrganism
 */
export class HeaderOrganism extends Component {
  static templatePath = "./header.html";
  static moduleUrl = import.meta.url;

  async render() {
    await this.renderTemplate();
  }
}

defineComponent("header-organism", HeaderOrganism);
