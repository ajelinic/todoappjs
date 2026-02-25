import { Component } from "/src/base/View/Component.js";
import { defineComponent } from "/src/base/View/Helpers/defineComponent.js";
import "../../molecules/footer-meta/footer-meta.js";
import "../../atoms/footer-note/footer-note.js";

/**
 * @class FooterOrganism
 * @description FooterOrganism
 */
export class FooterOrganism extends Component {
  static templatePath = "./footer.html";
  static moduleUrl = import.meta.url;

  async render() {
    await this.renderTemplate();
  }
}

defineComponent("footer-organism", FooterOrganism);
