/**
 * @DomElementCreator
 */

export class DomElementCreator {
  static createHtmlElement(element, id, cssClass, text = null) {
    const el = document.createElement(element);
    el.id = id;
    el.innerText = text;
    el.classList = cssClass;
    return el;
  }

  static createButtonElement(element, id, caption, cssClass) {
    const button = document.createElement(element);
    button.id = id;
    button.classList = cssClass;
    button.innerText = caption;
    return button;
  }

  static createInputElement(element, type, id, name, value, cssClass) {
    const input = document.createElement(element);
    input.type = type;
    input.id = id;
    input.name = name;
    input.value = value;
    input.classList = cssClass;
    return input;
  }
}
