/**
 * @InfoBarController
 * @deprecated Will be removed/changed in future releases
 */

import { InfoBarFactory } from "../InfoBarFactory.js";

/**
 * @class InfoBarController
 * @description InfoBarController
 */
export class InfoBarController {
  static indexAction() {
    this.createView();
  }

  static createView() {
    InfoBarFactory.createInfoBarCreator().infoBarCreateHtml();
  }
}
