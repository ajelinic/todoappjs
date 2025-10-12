import { Component } from "../../../../base/View/Component.js";

export class HelloWorld extends Component {
  render() {
    const name = this._data?.name || "Demo";

    this.updateView(`
      <style>
        :host {
          display: block;
          font-family: sans-serif;
          padding: 1rem;
          background: #f4f4f4;
          border-radius: 8px;
          margin-top: 100px;
        }
      </style>
      <h1>Hello, ${name}!</h1>
    `);
  }
}

customElements.define("hello-world", HelloWorld);
