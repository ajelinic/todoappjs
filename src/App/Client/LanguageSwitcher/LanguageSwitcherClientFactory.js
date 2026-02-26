import { AbstractClientFactory } from "../../../base/Abstracts/AbstractClientFactory.js";
import { LanguageSwitcherBusinessFactory } from "../../Business/LanguageSwitcher/LanguageSwitcherBusinessFactory.js";

/**
 * @class LanguageSwitcherClientFactory
 * @description LanguageSwitcherClientFactory
 */
export class LanguageSwitcherClientFactory extends AbstractClientFactory {
  static createLanguageSwitcherFacade() {
    return LanguageSwitcherBusinessFactory.createLanguageSwitcherFacade();
  }
}
