import { AbstractBusinessFactory } from "../../../base/Abstracts/AbstractBusinessFactory.js";
import { LanguageSwitcherBusinessConfig } from "./LanguageSwitcherBusinessConfig.js";
import { LanguageSwitcherBusinessDependencyProvider } from "./LanguageSwitcherBusinessDependencyProvider.js";
import { LanguageSwitcherFacade } from "./LanguageSwitcherFacade.js";

/**
 * @class LanguageSwitcherBusinessFactory
 * @description LanguageSwitcherBusinessFactory
 */
export class LanguageSwitcherBusinessFactory extends AbstractBusinessFactory {
  static CONFIG_CLASS = LanguageSwitcherBusinessConfig;
  static DEPENDENCY_PROVIDER_CLASS = LanguageSwitcherBusinessDependencyProvider;

  static facade = null;

  static createLanguageSwitcherFacade() {
    if (!this.getConfig().useFacadeSingleton()) {
      return new LanguageSwitcherFacade(this);
    }

    if (!this.facade) {
      this.facade = new LanguageSwitcherFacade(this);
    }

    return this.facade;
  }

  static createLanguageSwitcherRepository() {
    return this.getProvidedDependency(
      LanguageSwitcherBusinessDependencyProvider.LANGUAGE_SWITCHER_REPOSITORY
    );
  }

  static createLanguageSwitcherStorageGateway() {
    return this.getProvidedDependency(
      LanguageSwitcherBusinessDependencyProvider.LANGUAGE_SWITCHER_STORAGE_GATEWAY
    );
  }

  static createPersistenceConfig() {
    return this.getProvidedDependency(
      LanguageSwitcherBusinessDependencyProvider.PERSISTENCE_CONFIG
    );
  }
}
