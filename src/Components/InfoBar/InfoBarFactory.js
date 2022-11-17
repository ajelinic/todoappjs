/**
 * @InfoBarFactory
 */

import { InfoBarDataProvider } from "./InfoBarDataProvider.js";
import { InfoBarCreator } from "./Logic/Creator/InfoBarCreator.js";

export class InfoBarFactory {
  static createInfoBarCreator() {
    return new InfoBarCreator(this.addBaseElement());
  }

  static addBaseElement() {
    return InfoBarDataProvider.getBaseElement();
  }
}
