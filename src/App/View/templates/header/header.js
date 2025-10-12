import { Component } from "../../../../base/View/Component.js";
import { defineComponent } from "../../../../base/View/Helpers/defineComponent.js";

defineComponent(
  "app-header",
  class extends Component {
    static mountSelector = "#app";
    static mountPosition = "append";
    static disableShadow = true;

    render() {
      this.updateView(`
        <style>
        app-header {
          display: block;
          font-family: sans-serif;
          padding: 1rem;
          background:rgb(165, 65, 65);
          border-radius: 8px;
        }
      </style>
        <h2>Header test</h2>
        <div class='header-container'></div>
      `);
    }
  }
);
