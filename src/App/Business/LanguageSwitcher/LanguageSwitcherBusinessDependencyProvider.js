import { AbstractDependencyProvider } from "../../../base/Abstracts/AbstractDependencyProvider.js";
import { LanguageSwitcherPersistenceFactory } from "../../Persistence/LanguageSwitcher/LanguageSwitcherPersistenceFactory.js";

/**
 * @class LanguageSwitcherBusinessDependencyProvider
 * @description Language switcher business dependencies.
 */
export class LanguageSwitcherBusinessDependencyProvider extends AbstractDependencyProvider {
  static container = new Map();

  static LANGUAGE_SWITCHER_REPOSITORY = "LANGUAGE_SWITCHER_REPOSITORY";
  static LANGUAGE_SWITCHER_STORAGE_GATEWAY = "LANGUAGE_SWITCHER_STORAGE_GATEWAY";
  static PERSISTENCE_CONFIG = "PERSISTENCE_CONFIG";

  static provideDependencies(container) {
    container.set(this.LANGUAGE_SWITCHER_REPOSITORY, () =>
      LanguageSwitcherPersistenceFactory.createLanguageSwitcherRepository()
    );
    container.set(this.LANGUAGE_SWITCHER_STORAGE_GATEWAY, () =>
      LanguageSwitcherPersistenceFactory.createLanguageSwitcherStorageGateway()
    );
    container.set(this.PERSISTENCE_CONFIG, () =>
      LanguageSwitcherPersistenceFactory.getPersistenceConfig()
    );

    return container;
  }
}

export default LanguageSwitcherBusinessDependencyProvider;
