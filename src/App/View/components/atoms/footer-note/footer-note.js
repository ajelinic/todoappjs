import { Component } from "/src/base/View/Component.js";
import { defineComponent } from "/src/base/View/Helpers/defineComponent.js";

/**
 * @class FooterNoteAtom
 * @description FooterNoteAtom
 */
export class FooterNoteAtom extends Component {
  render() {
    this.updateView(
      `<small class="footer-note-atom">Built with a component-first clean architecture.</small>`
    );
  }
}

defineComponent("footer-note-atom", FooterNoteAtom);
