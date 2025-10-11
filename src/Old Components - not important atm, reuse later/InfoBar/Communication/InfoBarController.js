/**
 * @InfoBarController
 */

import { InfoBarFactory } from "../InfoBarFactory.js";

export class InfoBarController {
  static indexAction() {
    this.createView();
  }

  static createView() {
    InfoBarFactory.createInfoBarCreator().infoBarCreateHtml();
  }
}
