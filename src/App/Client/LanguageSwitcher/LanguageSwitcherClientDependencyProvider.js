import { AbstractDependencyProvider } from "../../../base/Abstracts/AbstractDependencyProvider.js";
import { LanguageSwitcherBusinessFactory } from "../../Business/LanguageSwitcher/LanguageSwitcherBusinessFactory.js";

/**
 * @class LanguageSwitcherClientDependencyProvider
 * @description Language switcher client dependencies.
 */
export class LanguageSwitcherClientDependencyProvider extends AbstractDependencyProvider {
  static container = new Map();
  static LANGUAGE_SWITCHER_FACADE = "LANGUAGE_SWITCHER_FACADE";

  static provideDependencies(container) {
    container.set(this.LANGUAGE_SWITCHER_FACADE, () =>
      LanguageSwitcherBusinessFactory.createLanguageSwitcherFacade()
    );

    return container;
  }
}

export default LanguageSwitcherClientDependencyProvider;
