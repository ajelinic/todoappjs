/**
 * @InfoBarDataProvider
 * @deprecated Will be removed/changed in future releases
 */

export class InfoBarDataProvider {
  static getBaseElement() {
    return document.querySelector(".content-container");
  }

  static getInfoContainerElement() {
    return document.querySelector("#task-info-container");
  }
}
