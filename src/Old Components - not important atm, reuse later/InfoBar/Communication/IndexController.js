/**
 * @IndexController
 * @deprecated Will be removed/changed in future releases
 */

import { InfoBarController } from "./InfoBarController";

export class IndexController {
  static indexAction() {
    this.init();
  }

  static init(data = []) {
    data.push(InfoBarController.indexAction());
    for (let i = 0; i < data.length; i++) {
      data[i];
    }
  }
}
