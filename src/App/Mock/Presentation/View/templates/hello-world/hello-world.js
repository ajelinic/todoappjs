export class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._data = {};
  }

  set data(value) {
    this._data = value;
    this.render();
  }

  get data() {
    return this._data;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;
    const name = this._data?.name || "Demo";

    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: sans-serif;
            padding: 1rem;
            background: #f4f4f4;
            border-radius: 8px;
          }
        </style>
        <h1>Hello, ${name}!</h1>
      `;
  }
}

customElements.define("hello-world", HelloWorld);
