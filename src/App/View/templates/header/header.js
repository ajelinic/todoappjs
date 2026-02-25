import { Component } from "../../../../base/View/Component.js";
import { defineComponent } from "../../../../base/View/Helpers/defineComponent.js";

defineComponent(
  "app-header",
/**
 * @class extends
 * @description extends
 */
  class extends Component {
    static mountSelector = "#app";
    static mountPosition = "append";
    static templatePath = "./header.html";
    static moduleUrl = import.meta.url;

    async render() {
      console.log("[app-header] Rendering header component");
      await this.renderTemplate(); // from TemplateHTMLElement
    }
  }
);
