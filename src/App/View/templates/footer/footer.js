import { Component } from "../../../../base/View/Component.js";
import { defineComponent } from "../../../../base/View/Helpers/defineComponent.js";

defineComponent(
  "app-footer",
/**
 * @class extends
 * @description extends
 */
  class extends Component {
    static mountSelector = "#app";
    static mountPosition = "append";

    async render() {
      this.updateView("<div>This is a test</div>");
    }
  }
);
