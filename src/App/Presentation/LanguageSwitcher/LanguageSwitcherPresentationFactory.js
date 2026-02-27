import { AbstractPresentationFactory } from "../../../base/Abstracts/AbstractPresentationFactory.js";
import { LanguageSwitcherPresentationConfig } from "./LanguageSwitcherPresentationConfig.js";
import { LanguageSwitcherEventHandler } from "./Handler/LanguageSwitcherEventHandler.js";
import { LanguageSwitcherViewDataResolver } from "./Resolver/LanguageSwitcherViewDataResolver.js";
import { LanguageSwitcherViewDataService } from "./Service/LanguageSwitcherViewDataService.js";
import { LanguageSwitcherPresentationDependencyProvider } from "./LanguageSwitcherPresentationDependencyProvider.js";

/**
 * @class LanguageSwitcherPresentationFactory
 * @description Factory for language switcher presentation classes and dependencies.
 */
export class LanguageSwitcherPresentationFactory extends AbstractPresentationFactory {
  static CONFIG_CLASS = LanguageSwitcherPresentationConfig;
  static DEPENDENCY_PROVIDER_CLASS = LanguageSwitcherPresentationDependencyProvider;

  static createLanguageSwitcherClient() {
    return this.getProvidedDependency(
      LanguageSwitcherPresentationDependencyProvider.LANGUAGE_SWITCHER_CLIENT
    );
  }

  static createGlossaryClient() {
    return this.getProvidedDependency(
      LanguageSwitcherPresentationDependencyProvider.GLOSSARY_CLIENT
    );
  }

  static createLanguageSwitcherEventHandler() {
    if (!this.languageSwitcherEventHandler) {
      this.languageSwitcherEventHandler = new LanguageSwitcherEventHandler(
        this.createLanguageSwitcherClient()
      );
    }

    return this.languageSwitcherEventHandler;
  }

  static createLanguageSwitcherViewDataService() {
    if (!this.languageSwitcherViewDataService) {
      this.languageSwitcherViewDataService = new LanguageSwitcherViewDataService(
        this.createGlossaryClient()
      );
    }

    return this.languageSwitcherViewDataService;
  }

  static createLanguageSwitcherViewDataResolver() {
    if (!this.languageSwitcherViewDataResolver) {
      this.languageSwitcherViewDataResolver = new LanguageSwitcherViewDataResolver(
        this.createLanguageSwitcherClient(),
        this.createLanguageSwitcherViewDataService()
      );
    }

    return this.languageSwitcherViewDataResolver;
  }
}

export default LanguageSwitcherPresentationFactory;
