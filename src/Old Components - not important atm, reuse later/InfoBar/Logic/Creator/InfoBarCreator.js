/**
 * @InfoBarCreator
 * @deprecated Will be removed/changed in future releases
 */

export class InfoBarCreator {
  constructor(containerElement, dateTimeHandler, domElementCreator) {
    this.containerElement = containerElement;
    this.dateTimeHandler = dateTimeHandler;
    this.domElementCreator = domElementCreator;
  }

  infoBarCreateHtml() {
    let infoBar = this.domElementCreator.createHtmlElement(
      "div",
      "info-bar",
      "info-bar info-bar-container"
    );
    this.containerElement.appendChild(infoBar);
    infoBar.appendChild(this.dateTimeHandler.createClock());
    infoBar.appendChild(this.createAPIInfoContainer());
    infoBar.appendChild(this.createTaskInfoContainer());
  }

  createAPIInfoContainer() {
    return this.domElementCreator.createHtmlElement(
      "div",
      "api-info-container",
      "info-bar__api-info-container"
    );
  }

  createTaskInfoContainer() {
    return this.domElementCreator.createHtmlElement(
      "div",
      "task-info-container",
      "info-bar__task-info-container"
    );
  }
}
