import { AbstractClientFactory } from "../../../base/Abstracts/AbstractClientFactory.js";
import { LanguageSwitcherClientConfig } from "./LanguageSwitcherClientConfig.js";
import { LanguageSwitcherClientDependencyProvider } from "./LanguageSwitcherClientDependencyProvider.js";

/**
 * @class LanguageSwitcherClientFactory
 * @description LanguageSwitcherClientFactory
 */
export class LanguageSwitcherClientFactory extends AbstractClientFactory {
  static CONFIG_CLASS = LanguageSwitcherClientConfig;
  static DEPENDENCY_PROVIDER_CLASS = LanguageSwitcherClientDependencyProvider;

  static createLanguageSwitcherFacade() {
    return this.getProvidedDependency(
      LanguageSwitcherClientDependencyProvider.LANGUAGE_SWITCHER_FACADE
    );
  }
}
