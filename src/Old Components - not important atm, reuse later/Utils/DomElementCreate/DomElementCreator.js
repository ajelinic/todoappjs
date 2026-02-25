/**
 * @DomElementCreator
 * @deprecated Will be removed/changed in future releases
 */

/**
 * @class DomElementCreator
 * @description DomElementCreator
 */
export class DomElementCreator {
  static createHtmlElement(element, id, cssClass, text = null) {
    const el = document.createElement(element);
    el.id = id;
    el.innerText = text;
    el.classList = cssClass;
    return el;
  }

  static createButtonElement(id, caption, cssClass) {
    const buttonElement = "button";
    const button = document.createElement(buttonElement);
    button.id = id;
    button.classList = cssClass;
    button.innerText = caption;
    return button;
  }

  static createInputElement(type, id, name, value, cssClass, checked = null) {
    const inputElement = "input";
    const input = document.createElement(inputElement);
    input.type = type;
    input.id = id;
    input.name = name;
    input.value = value;
    input.classList = cssClass;
    if (checked != null) {
      input.checked = checked;
    }
    return input;
  }
}
