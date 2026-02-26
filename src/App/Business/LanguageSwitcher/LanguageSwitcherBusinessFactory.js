import { AbstractBusinessFactory } from "../../../base/Abstracts/AbstractBusinessFactory.js";
import { LanguageSwitcherPersistenceFactory } from "../../Persistence/LanguageSwitcher/LanguageSwitcherPersistenceFactory.js";
import { LanguageSwitcherFacade } from "./LanguageSwitcherFacade.js";

/**
 * @class LanguageSwitcherBusinessFactory
 * @description LanguageSwitcherBusinessFactory
 */
export class LanguageSwitcherBusinessFactory extends AbstractBusinessFactory {
  static facade = null;

  static createLanguageSwitcherFacade() {
    if (!this.facade) {
      this.facade = new LanguageSwitcherFacade(this);
    }

    return this.facade;
  }

  static createLanguageSwitcherRepository() {
    return LanguageSwitcherPersistenceFactory.createLanguageSwitcherRepository();
  }

  static createLanguageSwitcherStorageGateway() {
    return LanguageSwitcherPersistenceFactory.createLanguageSwitcherStorageGateway();
  }

  static createPersistenceConfig() {
    return LanguageSwitcherPersistenceFactory.getPersistenceConfig();
  }
}
