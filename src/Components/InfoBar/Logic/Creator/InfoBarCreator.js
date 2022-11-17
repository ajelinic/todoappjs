/**
 * @InfoBarCreator
 */

import { DomElementCreator } from "../../../../Utils/DomElementCreate/DomElementCreator.js";

export class InfoBarCreator {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  infoBarCreateHtml() {
    let infoBar = DomElementCreator.createHtmlElement(
      "div",
      "info-bar",
      "info-bar-container"
    );
    this.containerElement.appendChild(infoBar);
    infoBar.appendChild(this.createAPIInfoContainer());
    infoBar.appendChild(this.createTaskInfoContainer());
  }

  createAPIInfoContainer() {
    return DomElementCreator.createHtmlElement(
      "div",
      "api-info-container",
      "api-info-container"
    );
  }

  createTaskInfoContainer() {
    return DomElementCreator.createHtmlElement(
      "div",
      "task-info-container",
      "task-info-container"
    );
  }
}
