import { AbstractBusinessFactory } from "../../../base/Abstracts/AbstractBusinessFactory.js";
import { GlossaryBusinessConfig } from "./GlossaryBusinessConfig.js";
import { GlossaryBusinessDependencyProvider } from "./GlossaryBusinessDependencyProvider.js";
import { GlossaryFacade } from "./GlossaryFacade.js";

/**
 * @class GlossaryBusinessFactory
 * @description GlossaryBusinessFactory
 */
export class GlossaryBusinessFactory extends AbstractBusinessFactory {
  static CONFIG_CLASS = GlossaryBusinessConfig;
  static DEPENDENCY_PROVIDER_CLASS = GlossaryBusinessDependencyProvider;

  static facade = null;

  static createGlossaryFacade() {
    if (!this.getConfig().useFacadeSingleton()) {
      return new GlossaryFacade(this);
    }

    if (!this.facade) {
      this.facade = new GlossaryFacade(this);
    }

    return this.facade;
  }

  static createGlossaryRepository() {
    return this.getProvidedDependency(GlossaryBusinessDependencyProvider.GLOSSARY_REPOSITORY);
  }

  static createGlossaryStorageGateway() {
    return this.getProvidedDependency(
      GlossaryBusinessDependencyProvider.GLOSSARY_STORAGE_GATEWAY
    );
  }

  static createCsvParser() {
    return this.getProvidedDependency(GlossaryBusinessDependencyProvider.CSV_PARSER);
  }

  static createPersistenceConfig() {
    return this.getProvidedDependency(GlossaryBusinessDependencyProvider.PERSISTENCE_CONFIG);
  }
}
