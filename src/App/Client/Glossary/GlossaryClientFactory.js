import { AbstractClientFactory } from "../../../base/Abstracts/AbstractClientFactory.js";
import { GlossaryClientConfig } from "./GlossaryClientConfig.js";
import { GlossaryClientDependencyProvider } from "./GlossaryClientDependencyProvider.js";

/**
 * @class GlossaryClientFactory
 * @description GlossaryClientFactory
 */
export class GlossaryClientFactory extends AbstractClientFactory {
  static CONFIG_CLASS = GlossaryClientConfig;
  static DEPENDENCY_PROVIDER_CLASS = GlossaryClientDependencyProvider;

  static createGlossaryFacade() {
    return this.getProvidedDependency(GlossaryClientDependencyProvider.GLOSSARY_FACADE);
  }
}
