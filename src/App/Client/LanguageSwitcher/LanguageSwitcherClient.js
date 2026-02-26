import { AbstractClient } from "../../../base/Abstracts/AbstractClient.js";
import { LanguageSwitcherClientFactory } from "./LanguageSwitcherClientFactory.js";

/**
 * @class LanguageSwitcherClient
 * @description LanguageSwitcherClient
 */
export class LanguageSwitcherClient extends AbstractClient {
  getFactory() {
    return LanguageSwitcherClientFactory;
  }

  async bootstrap() {
    return this.getFactory().createLanguageSwitcherFacade().bootstrap();
  }

  getSupportedLocales() {
    return this.getFactory().createLanguageSwitcherFacade().getSupportedLocales();
  }

  async getCurrentLocale() {
    return this.getFactory().createLanguageSwitcherFacade().getCurrentLocale();
  }

  async setCurrentLocale(locale) {
    return this.getFactory().createLanguageSwitcherFacade().setCurrentLocale(locale);
  }
}
